import { AllUsers } from './indexLogic.js';

// DOM Elements
export const signinEls = {
  username: document.querySelector('[data-username]'),
  password: document.querySelector('[data-password]'),
  signinBtn: document.querySelector('[data-signin]'),
  registrationBtn: document.querySelector('[data-register]'),
  mainField: document.querySelector('[data-main-field]'),
  errorPlaceholder: document.querySelector('[data-error]'),
  rotationSvg: document.querySelector('[data-rot]'),
};

const domEls = {
  signinPageBtn: document.querySelector('[data-signin-page]'),
  singUpPageBtn: document.querySelector('[data-signup-page]'),
  hidden: document.querySelectorAll('.hidden'),
  visible: document.querySelectorAll('.visible'),
  foreground: document.querySelector('[data-foreground]'),
  skipBtn: document.querySelector('[data-skip-registration]'),
};

// Load or initialize users
let usersClass = AllUsers.loadFromStorage('userData');
if (!usersClass.users.size) {
  usersClass.addUser('jamal', '000000');
  usersClass.addUser('marquis', '111111');
  usersClass.addUser('samantha', '222222');
  usersClass.saveToStorage('userData');
}

// Utility functions
function toggleGroupClasslist(elements, cl1, cl2) {
  elements.forEach((el) => el.classList.toggle(cl1));
  elements.forEach((el) => el.classList.toggle(cl2));
}

function clearUserInput() {
  signinEls.username.value = '';
  signinEls.password.value = '';
}

// Adds rotating svg after user had successfully registered to imitate loading
export async function addLoadingSvg(element) {
  element.classList.remove('hidden-svg');
  await new Promise((resolve) => setTimeout(resolve, 1200));
  element.classList.add('hidden-svg');
  location.reload();
}

function updateDisplay() {
  toggleGroupClasslist(domEls.hidden, 'hidden', 'visible');
  toggleGroupClasslist(domEls.visible, 'hidden', 'visible');
  domEls.foreground.classList.toggle('beige-bg');
  domEls.foreground.classList.toggle('blue-bg');
  clearUserInput();
  signinEls.errorPlaceholder.textContent = '';
}

// Click event handling
signinEls.mainField.addEventListener('click', async (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.closest('#signin-btn')) {
    if (usersClass.signIn(signinEls.username.value, signinEls.password.value)) {
      window.location = './main.html';
    } else {
      signinEls.errorPlaceholder.textContent = 'Invalid username or password.';
      clearUserInput();
    }
    console.log(document.querySelector('[data-curr-user]'));
  }

  if (target.closest('#registration-btn')) {
    const result = usersClass.addUser(
      signinEls.username.value,
      signinEls.password.value
    );
    if (result.success) {
      addLoadingSvg(signinEls.rotationSvg);
      usersClass.saveToStorage('userData');
    } else {
      signinEls.errorPlaceholder.textContent = result.errors.join(' ');
    }
  }

  if (target.closest('#user-name') || target.closest('#password')) {
    signinEls.errorPlaceholder.textContent = '';
  }
});

domEls.singUpPageBtn.addEventListener('click', () => updateDisplay());
domEls.signinPageBtn.addEventListener('click', () => updateDisplay());
domEls.skipBtn.addEventListener('click', () => {
  window.location = './main.html';
  localStorage.setItem('currActiveUsername', 'Guest');
});
