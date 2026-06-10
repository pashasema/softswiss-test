const MENU_CLOSE_MS = 400;

export function initMenu() {
  const burgerToggle = document.getElementById('burger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');
  let closeTimer = null;

  const toggleMenu = (forceClose = false) => {
    if (!burgerToggle || !navMenu)  return;

    const isOpen = navMenu.classList.contains('open');
    const shouldClose = forceClose || isOpen;

    if (shouldClose) {
      if (!isOpen) return;

      navMenu.classList.add('is-closing');
      navMenu.classList.remove('open');
      burgerToggle.classList.remove('is-active');
      burgerToggle.setAttribute('aria-expanded', 'false');
      navOverlay?.classList.remove('is-visible');
      document.body.style.overflow = '';

      if (closeTimer) window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        navMenu.classList.remove('is-closing');
        closeTimer = null;
      }, MENU_CLOSE_MS);
    } else {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }

      navMenu.classList.remove('is-closing');
      navMenu.classList.add('open');
      burgerToggle.classList.add('is-active');
      burgerToggle.setAttribute('aria-expanded', 'true');
      navOverlay?.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  };

  burgerToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navOverlay?.addEventListener('click', () => toggleMenu(true));

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(true);
  });
}
