import { clearUserInput, signinEls } from "./signIn.js";
let isSignInScreen = true;

// DOM elements of sign index page ui changes.
export const domEls = {
  signinPageBtn: document.querySelector('[data-signin-page]'),
  singUpPageBtn: document.querySelector('[data-signup-page]'),
  hidden: document.querySelectorAll('.hidden'),
  visible: document.querySelectorAll('.visible'),
  foreground: document.querySelector('[data-foreground]')
}

function toggleClasslist(elements, cl1, cl2) {
  elements.forEach((el) => {
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
  })
}

// Calls functions to change ui if user toggles between login and registration field
function updateDisplay() {
  toggleClasslist(domEls.hidden, 'hidden', 'visible');
  toggleClasslist(domEls.visible, 'hidden', 'visible');
  domEls.foreground.classList.toggle('beige-bg');
  domEls.foreground.classList.toggle('blue-bg');
  clearUserInput();
}

domEls.singUpPageBtn.addEventListener('click', () => {
  isSignInScreen = false;
  updateDisplay();
});
domEls.signinPageBtn.addEventListener('click', () => {
  isSignInScreen = true;
  updateDisplay();
});