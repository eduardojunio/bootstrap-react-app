import { useEffect } from 'react';

interface ScrollHandlerParams {
  bottomThreshold?: number;
  onBottomReached: () => void;
}

export function useScrollHandler({ onBottomReached, bottomThreshold = 300 }: ScrollHandlerParams) {
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const reachedTheBottom = documentHeight - (scrollTop + windowHeight) < bottomThreshold;

      if (reachedTheBottom) {
        onBottomReached();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onBottomReached, bottomThreshold]);
}
