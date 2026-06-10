export function initScrollTop() {
  const btnUpScroll = document.getElementById('btn-up-scroll');

  if (!btnUpScroll) return;

  btnUpScroll.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
