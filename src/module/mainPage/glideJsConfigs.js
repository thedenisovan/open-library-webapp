import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const options1 = {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    breakpoints: {
      1024: { perView: 2 },
      600: { perView: 1 },
    },
    gap: 45,
    autoplay: 3000,
  };

  const options2 = {
    type: 'slider',
    startAt: 0,
    perView: 8,
    breakpoints: {
      1024: { perView: 6 },
      600: { perView: 4 },
    },
    gap: 15,
    bound: true
  };

  const glide1 = new Glide('.glide', options1);
  const glide2 = new Glide('.glide2', options2);
  const glide3 = new Glide('.glide3', options2);

  glide1.mount();
  glide2.mount();
  glide3.mount();

  // glide1.update();
  // glide2.update();
});
