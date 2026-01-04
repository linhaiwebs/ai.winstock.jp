import { useEffect, useRef } from 'react';

interface AdSenseBlockProps {
  shouldLoad: boolean;
  racText: string;
}

export default function AdSenseBlock({ shouldLoad, racText }: AdSenseBlockProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adLoadedRef = useRef(false);

  useEffect(() => {
    if (!shouldLoad || adLoadedRef.current) {
      return;
    }

    const adContainer = adContainerRef.current;
    if (!adContainer) return;

    console.log('AdSense conditions met. Organic content exists.');
    console.log('RAC Text:', racText);

    adLoadedRef.current = true;
  }, [shouldLoad, racText]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
      <div className="text-xs text-gray-500 mb-3 text-center">スポンサーリンク</div>
      <div
        ref={adContainerRef}
        id="afscontainer1"
        className="min-h-[200px] flex items-center justify-center"
      >
        <div className="text-center text-gray-400">
          <p className="text-sm mb-2">広告スペース</p>
          <p className="text-xs">
            AdSense AFS コードをここに配置してください
          </p>
          <p className="text-xs mt-2 font-mono bg-gray-100 px-3 py-1 rounded">
            RAC: {racText || '(未設定)'}
          </p>
        </div>
      </div>
    </div>
  );
}
