import { useState, useRef, useEffect } from 'react';

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

function attachMediaListener(query: MediaQueryList, callback: MediaQueryCallback) {
  try {
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (initialValue !== undefined) {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export default function useMediaQuery(query: string, initialValue?: boolean) {
  const [matches, setMatches] = useState(getInitialValue(query, initialValue));
  const queryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if ('matchMedia' in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, event => setMatches(event.matches));
    }

    return undefined;
  }, [query]);

  return matches;
}
