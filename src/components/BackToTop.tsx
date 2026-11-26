import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 500;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`group fixed right-5 bottom-5 z-[950] inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-icat-white/20 bg-icat-primary text-icat-white shadow-[0_10px_28px_rgba(16,43,92,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-icat-navy hover:shadow-[0_14px_32px_rgba(16,43,92,0.36)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-icat-accent motion-reduce:transition-none sm:right-7 sm:bottom-7 sm:h-12 sm:w-12 ${
        isVisible
          ? 'visible pointer-events-auto translate-y-0 scale-100 opacity-100 hover:-translate-y-0.5 active:scale-95'
          : 'invisible pointer-events-none translate-y-4 scale-90 opacity-0'
      }`}
    >
      <ArrowUp
        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  );
}
