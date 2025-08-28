let frontSlideIdx = 0;

const els = {
  navbar: document.querySelector('[data-nav]'),
  currUsername: document.querySelector('[data-curr-user]'),
  nextInfoSlide: document.querySelector('[data-next-info]'),
  previousInfoSlide: document.querySelector('[data-back-info]')
}

els.currUsername.textContent = localStorage.getItem('currActiveUsername');

// Helper DOM functions
function toggleSingleClass(el, cl) {
  el.classList.toggle(cl);
}

// Attach event listener on page
function bindHeaderEvents() {
  const body = document.querySelector('body');

  body.addEventListener('click', (event) => {
    const target = event.target;

    // Event of closing and opening side bar
    if (
        target.closest('[data-burger-btn]') || 
        target.closest('[data-close-nav]')  || 
        target.id === 'right-nav'
      ) {
      toggleSingleClass(els.navbar, 'visible');
    }
    // Events attached to buttons to move head slides back and forth
    if (target.closest('[data-back-info]')) {
      mobileCarousel(false);
    }
    if (target.closest('[data-next-info]')) {
      mobileCarousel();
    }
  });
}

// Makes slides move on mobile mobile device screens size
function mobileCarousel(moveForward = true) {
  if(moveForward) {
    frontSlideIdx === 3 ? frontSlideIdx = 0 : frontSlideIdx++;
  } else {
    frontSlideIdx === 0 ? frontSlideIdx = 3 : frontSlideIdx--;
  }
  let children = document.querySelectorAll('.info-child');
  children.forEach((child) => child.classList.add('hidden'));
  document.querySelector(`[data-info="${frontSlideIdx}"]`).classList.remove('hidden');
}

bindHeaderEvents();

// TODO: Add functionality witch will look on current screen size and scroll slides based on it