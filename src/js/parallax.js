import { BP_LG } from './breakpoints.js';

export function initParallax() {
  const parallaxLeft = document.getElementById('parallax-left');
  const parallaxRight = document.getElementById('parallax-right');
  const hero = document.querySelector('.hero');
  const parallaxMedia = window.matchMedia(`(min-width: ${BP_LG}px)`);
  const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!hero || (!parallaxLeft && !parallaxRight)) return;

  let ticking = false;

  const resetParallax = () => {
    if (parallaxLeft) parallaxLeft.style.transform = '';
    if (parallaxRight) parallaxRight.style.transform = '';
  };

  const updateParallax = () => {
    ticking = false;

    if (!parallaxMedia.matches || reducedMotionMedia.matches) {
      resetParallax();
      return;
    }

    if (hero.getBoundingClientRect().bottom <= 0) {
      resetParallax();
      return;
    }

    const offset = Math.min(window.scrollY, hero.offsetHeight) * 0.3;

    if (parallaxLeft) {
      parallaxLeft.style.transform = `translateY(${offset}px)`;
    }
    if (parallaxRight) {
      parallaxRight.style.transform = `translateY(${-offset}px)`;
    }
  };

  parallaxMedia.addEventListener('change', updateParallax);
  reducedMotionMedia.addEventListener('change', updateParallax);

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  updateParallax();
}
