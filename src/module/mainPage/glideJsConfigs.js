import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  breakpoints: {
    1024: {
      perView: 2
    },
    600: {
      perView: 1
    }
  },
  gap: 15,
  autoplay: 3000
});

  glide.mount();
});
document.addEventListener('DOMContentLoaded', () => {
  const glide = new Glide('.glide2', {
  type: 'carousel',
  startAt: 0,
  perView: 8,
  breakpoints: {
    1024: {
      perView: 7
    },
    600: {
      perView: 4
    }
  },
  gap: 15,
});

  glide.mount();
});