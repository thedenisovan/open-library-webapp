let currElIdx = 0;

const els = {
  navbar: document.querySelector('[data-nav]'),
  currUsername: document.querySelector('[data-curr-user]'),
  nextInfoSlide: document.querySelector('[data-next-info]')
}

els.currUsername.textContent = localStorage.getItem('currActiveUsername');

// Helper DOM functions
function toggleSingleClass(el, cl) {
  el.classList.toggle(cl);
}

// Attach event listener on header
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
  });
}

function domCarousel() {
  currElIdx === 3 ? currElIdx = 0 : currElIdx++;
  let children = document.querySelectorAll('.info-child');
  children.forEach((child) => child.classList.add('hidden'));
  document.querySelector(`[data-info="${currElIdx}"]`).classList.remove('hidden');
}

els.nextInfoSlide.addEventListener('click', domCarousel);

bindHeaderEvents();

// TODO: Add functionality witch will look on current screen size and scroll slides based on it