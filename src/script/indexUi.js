import {
  clearUserInput,
  signinEls,
  signingIn,
  setLocalStorage,
  makeNewUser,
  getUser,
  AllUsers
} from './signIn.js';
let isSignInScreen = true;
let users = getUser();

// DOM elements of sign index page ui changes.
export const domEls = {
  signinPageBtn: document.querySelector('[data-signin-page]'),
  singUpPageBtn: document.querySelector('[data-signup-page]'),
  hidden: document.querySelectorAll('.hidden'),
  visible: document.querySelectorAll('.visible'),
  foreground: document.querySelector('[data-foreground]'),
};

// Toggles between two states
function toggleClasslist(elements, cl1, cl2) {
  elements.forEach((el) => {
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
  });
}

// Calls functions to change ui if user toggles between login and registration field
export function updateDisplay() {
  toggleClasslist(domEls.hidden, 'hidden', 'visible');
  toggleClasslist(domEls.visible, 'hidden', 'visible');
  domEls.foreground.classList.toggle('beige-bg');
  domEls.foreground.classList.toggle('blue-bg');
  clearUserInput();
}

function indexPageEventDelegation() {
  signinEls.mainField.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    // Event listener for sign in button click
    if (target.closest('#signin-btn')) {
      if (signingIn(signinEls.username.value, signinEls.password.value)) {
        window.location = './template.html';
        // Event listener for registration button click
      } else {
        alert('Unsuccessful signing in attempt.');
        clearUserInput();
      }
    } else if (target.closest('#registration-btn')) {
      makeNewUser(signinEls.username.value, signinEls.password.value);
      setLocalStorage('userData', users);
    }
  });
}

domEls.singUpPageBtn.addEventListener('click', () => {
  signinEls.errorPlaceholder.textContent = '';
  isSignInScreen = false;
  updateDisplay();
});
domEls.signinPageBtn.addEventListener('click', () => {
  isSignInScreen = true;
  updateDisplay();
});

indexPageEventDelegation();
