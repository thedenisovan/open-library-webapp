const els = {
  navbar: document.querySelector('[data-nav]')
}

// Helper DOM functions
function toggleSingleClass(el, cl) {
  el.classList.toggle(cl);
}

// Attach event listener on header
function bindHeaderEvents() {
  const body = document.querySelector('body');

  body.addEventListener('click', (event) => {
    const target = event.target;

    if (
        target.closest('[data-burger-btn]') || 
        target.closest('[data-close-nav]')  || 
        target.id === 'right-nav'
      ) {
      toggleSingleClass(els.navbar, 'visible');
    }
  });
}

// Attach event listener to nav
function bindNavEvents() {
  const navbar = document.querySelector('[data-nav]');

  navbar.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('[data-close-nav]')) {
      toggleSingleClass(els.navbar, 'visible');
    }
  });
}

// bindNavEvents();
bindHeaderEvents();