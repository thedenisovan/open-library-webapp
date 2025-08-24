import {
  signinEls,
  AllUsers
} from './signIn.js';

// DOM elements of sign index page ui changes.
const domEls = {
  signinPageBtn: document.querySelector('[data-signin-page]'),
  singUpPageBtn: document.querySelector('[data-signup-page]'),
  hidden: document.querySelectorAll('.hidden'),
  visible: document.querySelectorAll('.visible'),
  foreground: document.querySelector('[data-foreground]'),
};

let isSignInScreen = true;
let usersClass;
let users;
// Users obj retrieved from local storage.
let retrievedUserStr = localStorage.getItem('userData');

// If local storage is empty create new user obj
if (!retrievedUserStr) {
  usersClass = new AllUsers();
  users = usersClass.users;
  // Initial users
  users.set('jamal', '000000');
  users.set('marquis', '111111');
  users.set('samantha', '222222');
  
  setLocalStorage('userData', users);
} else {
  let stored = parseStorageData(retrievedUserStr);
  usersClass = new AllUsers(stored);
  users = usersClass.users;
}

// Adds user obj to local storage when function is called.
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify([...value]));
}

// Turns string from local storage back to obj state.
function parseStorageData(data) {
  return JSON.parse(data);
}

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
      if (usersClass.signingIn(signinEls.username.value, signinEls.password.value)) {
        window.location = './template.html';
        // Event listener for registration button click
      } else {
        alert('Unsuccessful signing in attempt.');
        clearUserInput();
      }
    } else if (target.closest('#registration-btn')) {
      usersClass.makeNewUser(signinEls.username.value, signinEls.password.value);
      setLocalStorage('userData', users);
    }
  });
}

export async function addLoadingSvg(element) {
  element.classList.remove('hidden-svg');
  await setTimeout(() => {
    element.classList.add('hidden-svg');
    location.reload();
  }, 1200);
}

function clearUserInput() {
  signinEls.username.value = '';
  signinEls.password.value = '';
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
