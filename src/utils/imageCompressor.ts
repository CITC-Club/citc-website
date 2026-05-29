/**
 * Compresses an image File to AVIF format in the browser.
 * Falls back to WebP or JPEG if AVIF encoding fails or is not supported.
 */
export async function compressImageToAvif(
  file: File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<{ blob: Blob; fileName: string }> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 75 } = options;

  // 1. Create an Image object from the file
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = (err) => reject(new Error("Failed to load image file"));
  });

  // 2. Calculate new dimensions keeping aspect ratio
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  // 3. Draw image to canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2d canvas context");
  }

  // Clear canvas and draw
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

  // 4. Try encoding to AVIF using @jsquash/avif (WebAssembly)
  try {
    const { default: encode } = await import("@jsquash/avif/encode");
    const imageData = ctx.getImageData(0, 0, width, height);
    const avifBuffer = await encode(imageData, { quality });
    const avifBlob = new Blob([avifBuffer], { type: "image/avif" });

    // Generate new filename with .avif extension
    const lastDotIndex = file.name.lastIndexOf(".");
    const baseName = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
    const newFileName = `${baseName.replace(/\s+/g, "-")}.avif`;

    return { blob: avifBlob, fileName: newFileName };
  } catch (error) {
    console.warn("Client-side AVIF compression failed. Falling back to WebP/JPEG:", error);

    // Fallback: WebP (widely supported) or JPEG
    return new Promise((resolve, reject) => {
      // Determine fallback type
      const isWebPSupported = canvas.toDataURL("image/webp").startsWith("data:image/webp");
      const fallbackType = isWebPSupported ? "image/webp" : "image/jpeg";
      const ext = isWebPSupported ? ".webp" : ".jpg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob returned null"));
            return;
          }
          const lastDotIndex = file.name.lastIndexOf(".");
          const baseName = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
          const newFileName = `${baseName.replace(/\s+/g, "-")}${ext}`;
          resolve({ blob, fileName: newFileName });
        },
        fallbackType,
        quality / 100
      );
    });
  }
}
