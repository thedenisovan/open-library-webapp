import './apiCall.js';
import './mainDom.js';
import 'normalize.css';
import '../../style/cssUtils/reset.scss';
import '../../style/style.scss';
import '../../style/cssUtils/cube.css';
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