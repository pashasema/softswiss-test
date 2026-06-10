import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { BP_LG, BP_TITLE_COMPACT } from './breakpoints.js';

export function initSlider() {
  const swiperElement = document.getElementById('swiper-container');
  const progressTrack = document.getElementById('progress-bar-track');
  const progressStart = document.querySelector('.progress-start');
  const progressEnd = document.querySelector('.progress-end');

  if (!swiperElement) return;

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

  const swiper = new Swiper('#swiper-container', {
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

  return swiper;
}
