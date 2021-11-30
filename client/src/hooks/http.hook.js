import { useState, useCallback } from 'react';

export const useHttp = () => {
  const request = useCallback(async ( url, method = 'GET', body = null, headers = {} ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { request };
}
