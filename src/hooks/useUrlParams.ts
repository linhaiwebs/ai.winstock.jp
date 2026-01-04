import { useEffect, useState } from 'react';

export interface UrlParams {
  code: string;
  src: string;
  racText: string;
  gclid: string;
}

export function useUrlParams(): UrlParams {
  const getParamsFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || '2269';
    const src = urlParams.get('src') || '';
    const racText = urlParams.get('rac_text') || '';
    const gclid = urlParams.get('gclid') || '';
    const isValidCode = /^\d{4}$/.test(code);

    return {
      code: isValidCode ? code : '2269',
      src,
      racText,
      gclid,
    };
  };

  const [params, setParams] = useState<UrlParams>(getParamsFromUrl);

  useEffect(() => {
    const handleUrlChange = () => {
      setParams(getParamsFromUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return params;
}
