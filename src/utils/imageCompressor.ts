async function loadImage(
    file: File,
): Promise<{ image: HTMLImageElement; width: number; height: number }> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => reject(new Error('Failed to load image file'));
  });
  return {image, width: image.width, height: image.height};
}

function drawToCanvas(
    image: HTMLImageElement,
    width: number,
    height: number,
): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d canvas context');
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  return ctx;
}

async function encodeImage(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    quality: number,
    fileName: string,
): Promise<{ blob: Blob; fileName: string }> {
  try {
    const {default: encode} = await import('@jsquash/avif/encode');
    const imageData = ctx.getImageData(0, 0, width, height);
    const avifBuffer = await encode(imageData, {quality});
    const avifBlob = new Blob([avifBuffer], {type: 'image/avif'});
    return {blob: avifBlob, fileName: fileName.replace(/\.[^.]+$/, '.avif')};
  } catch (error) {
    console.warn(
        'Client-side AVIF compression failed. Falling back to WebP/JPEG:',
        error,
    );
    const canvas = ctx.canvas;
    const isWebPSupported = canvas
        .toDataURL('image/webp')
        .startsWith('data:image/webp');
    const fallbackType = isWebPSupported ? 'image/webp' : 'image/jpeg';
    const ext = isWebPSupported ? '.webp' : '.jpg';
    return new Promise((resolve, reject) => {
      canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob returned null'));
              return;
            }
            const newFileName = fileName.replace(/\.[^.]+$/, '') + ext;
            resolve({blob, fileName: newFileName});
          },
          fallbackType,
          quality / 100,
      );
    });
  }
}

function sanitizeFileName(file: File): string {
  const lastDotIndex = file.name.lastIndexOf('.');
  const baseName =
    lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
  return baseName.replace(/\s+/g, '-');
}

export async function compressImageToAvif(
    file: File,
    options: { maxWidth?: number; maxHeight?: number; quality?: number } = {},
): Promise<{ blob: Blob; fileName: string }> {
  const {maxWidth = 1200, maxHeight = 1200, quality = 75} = options;
  const {image, width: origW, height: origH} = await loadImage(file);

  let width = origW;
  let height = origH;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  const ctx = drawToCanvas(image, width, height);
  const baseName = sanitizeFileName(file);
  return encodeImage(ctx, width, height, quality, `${baseName}.avif`);
}

export async function generateThumbnail(
    file: File,
    options: { size?: number; quality?: number } = {},
): Promise<{ blob: Blob; fileName: string }> {
  const {size = 64, quality = 60} = options;
  const {image, width: origW, height: origH} = await loadImage(file);

  const thumbSize = Math.min(size, origW, origH);
  const sx = (origW - thumbSize) / 2;
  const sy = (origH - thumbSize) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d canvas context');
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(image, sx, sy, thumbSize, thumbSize, 0, 0, size, size);

  const baseName = sanitizeFileName(file);
  return encodeImage(ctx, size, size, quality, `${baseName}-thumb.avif`);
}
