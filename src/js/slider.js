import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { BP_LG, BP_TITLE_COMPACT } from './breakpoints.js';

function createSlider() {
  const swiperElement = document.getElementById('swiper-container');
  const progressTrack = document.getElementById('progress-bar-track');
  const progressStart = document.querySelector('.progress-start');
  const progressEnd = document.querySelector('.progress-end');

  if (!swiperElement) return null;

  if (swiperElement.swiper) {
    swiperElement.swiper.destroy(true, true);
  }

  const renderSegments = (totalSteps) => {
    if (!progressTrack) return;

    progressTrack.innerHTML = '';

    for (let i = 0; i < totalSteps; i++) {
      const segment = document.createElement('span');
      segment.className = 'progress-segment';
      progressTrack.appendChild(segment);
    }
  };

  const updateProgress = (swiper) => {
    const totalSteps = swiper.snapGrid?.length || 1;
    const currentIndex = swiper.activeIndex;

    if (progressStart) {
      progressStart.textContent = currentIndex + 1;
    }

    if (progressEnd) {
      progressEnd.textContent = totalSteps;
    }

    if (!progressTrack) return;

    if (progressTrack.childElementCount !== totalSteps) {
      renderSegments(totalSteps);
    }

    progressTrack.querySelectorAll('.progress-segment').forEach((segment, index) => {
      segment.classList.toggle('active', index <= currentIndex);
    });
  };

  return new Swiper('#swiper-container', {
    modules: [Navigation],
    cssMode: true,
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: false,
    loop: false,
    rewind: true,
    speed: 300,
    navigation: {
      nextEl: '.next-btn',
      prevEl: '.prev-btn',
    },
    breakpoints: {
      [BP_TITLE_COMPACT + 1]: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      [BP_LG]: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    on: {
      init(swiperInstance) {
        updateProgress(swiperInstance);
      },
      slideChange(swiperInstance) {
        updateProgress(swiperInstance);
      },
      resize(swiperInstance) {
        updateProgress(swiperInstance);
      },
      breakpoint(swiperInstance) {
        updateProgress(swiperInstance);
      },
    },
  });
}

// Fix attempt #1: lazy init — start Swiper only when the section is near the viewport.
export function initSlider() {
  const countrySection = document.querySelector('.country-section');

  if (!document.getElementById('swiper-container')) return;

  const mountSlider = () => createSlider();

  if (!countrySection) {
    return mountSlider();
  }

  if (countrySection.getBoundingClientRect().top < window.innerHeight + 100) {
    return mountSlider();
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      mountSlider();
    },
    { rootMargin: '100px 0px', threshold: 0 },
  );

  observer.observe(countrySection);
}
