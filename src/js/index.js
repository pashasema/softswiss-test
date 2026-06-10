import { initTheme } from './theme.js';
import { initMenu } from './menu.js';
import { initParallax } from './parallax.js';
import { initSlider } from './slider.js';
import { initScrollTop } from './scroll-top.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initParallax();
  initSlider();
  initScrollTop();
});
