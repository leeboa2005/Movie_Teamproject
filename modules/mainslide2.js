import { stopVideo, changeVideo } from './youtube.js';

const imageArr = [
  {
    image:
      'https://image.tmdb.org/t/p/original/kVUfN0ZMuoSAc1FturM7P7PYel6.jpg',
    videoId: 'UaVTIH8mujA', //대부
  },
  {
    image:
      'https://image.tmdb.org/t/p/original/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg',
    videoId: '0GtEGZv1_Os', //너의이름은
  },
  {
    image:
      'https://image.tmdb.org/t/p/original/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg',
    videoId: 'lwrG3HQXTFw', //센과치히로
  },
  {
    image:
      'https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg',
    videoId: 'jBdRhhSt3Bc', //기생충
  },
];

const carousel = document.querySelector('#carouselContainer');
const slideWrap = document.querySelector('#carouselSlides');
const slide = document.querySelectorAll('.slide');
const youtubePopup = document.querySelector('.youtubePopup');
const popupXbtn = document.querySelector('.fa-xmark');
const nextBtn = document.querySelector('.fa-chevron-right');
const prevBtn = document.querySelector('.fa-chevron-left');

let current = 0;

const firstEl = slideWrap.firstElementChild;
const lastEl = slideWrap.lastElementChild;
let cloneFirst = firstEl.cloneNode(true);
let cloneLast = lastEl.cloneNode(true);

slideWrap.appendChild(cloneFirst);
slideWrap.insertBefore(cloneLast, slideWrap.firstElementChild);

slideWrap.style.left = '-100%';

slide.forEach((slide, index) => {
  slide.style.backgroundImage = `url(${imageArr[index]['image']})`;
  slide.addEventListener('click', () => {
    youtubePopup.classList.remove('hidden');
    changeVideo(imageArr[index].videoId);
  });
});

popupXbtn.addEventListener('click', () => {
  youtubePopup.classList.add('hidden');
  stopVideo();
});

prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

function moveSlide(direction) {
  if (direction === 1) {
    if (current < slide.length - 1) {
      current++;
      slideWrap.style.transition = '500ms';
      slideWrap.style.left = `-${100 * (current + 1)}%`;
    } else {
      current++;
      slideWrap.style.transition = '500ms';
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      current = 0;

      setTimeout(() => {
        slideWrap.style.transition = '0ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      }, 550);
    }
  } else if (direction === -1) {
    if (current > 0) {
      current--;
      slideWrap.style.transition = '500ms';
      slideWrap.style.left = `-${100 * (current + 1)}%`;
    } else {
      slideWrap.style.transition = '500ms';
      slideWrap.style.left = '0%';
      current = slide.length - 1;

      setTimeout(() => {
        slideWrap.style.transition = '0ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      }, 550);
    }
  }
}

function setSlideWidth() {
  let slideWidth = carousel.getBoundingClientRect().width;
  document.querySelectorAll('.slide').forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
  });
}

window.addEventListener('resize', setSlideWidth);
window.addEventListener('load', setSlideWidth);

// setInterval(() => moveSlide(1), 10000);
