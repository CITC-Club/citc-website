'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

/** Instant blob preview when the user picks a file; revokes on clear/unmount. */
export function useLocalImagePreview() {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const revoke = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setLocalPreview(null);
  }, []);

  const setFromFile = useCallback(
      (file: File) => {
        revoke();
        const url = URL.createObjectURL(file);
        urlRef.current = url;
        setLocalPreview(url);
        return url;
      },
      [revoke],
  );

  useEffect(() => () => revoke(), [revoke]);

  return {localPreview, setFromFile, revoke};
}
