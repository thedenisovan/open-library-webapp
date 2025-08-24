import { updateDisplay, domEls } from './indexUi';

export const signinEls = {
  username: document.querySelector('[data-username]'),
  password: document.querySelector('[data-password]'),
  rememberMe: document.querySelector('[data-remember-me]'),
  signinBtn: document.querySelector('[data-signin]'),
  registrationBtn: document.querySelector('[data-register]'),
  mainField: document.querySelector('[data-main-field]'),
  errorPlaceholder: document.querySelector('[data-error]'),
  rotationSvg: document.querySelector('[data-rot]'),
};

// Class which will store user signin details.
class User {
  constructor(username, password, isRemembered = false) {
    this.username = username;
    this.password = password;
    this.isRemembered = isRemembered;
  }
}

// Adds user obj to local storage when function is called.
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Turns string from local storage back to obj state.
function parseStorageData(data) {
  return JSON.parse(data);
}

// Object which will store instances of signin details class.
let users;
// Users obj retrieved from local storage.
let retrievedUserStr = localStorage.getItem('users');

// If local storage is empty create new user obj
if (!retrievedUserStr) {
  users = new Object();
  // Initial users
  const user1 = new User('jamal', '000000');
  const user2 = new User('marquis', '111111');
  const user3 = new User('samantha', '222222');
  users[user1.username] = user1.password;
  users[user2.username] = user2.password;
  users[user3.username] = user3.password;
  setLocalStorage('users', users);
} else {
  users = parseStorageData(retrievedUserStr);
}

/* Function which iterates trough users object retrieved from local storage,
and if username and password mach grand successful entry else no entry. */
export function signingIn(username, password) {
  for (let [user, pass] of Object.entries(users)) {
    if (user === username && pass === password) {
      return true;
    }
  }
  return false;
}

// Iterates trough users obj and look if user with give user name exists or not
function checkForExistingUser(username) {
  for (let name of Object.keys(users)) {
    if (name === username) {
      return true;
    }
  }
  return false;
}

// if userDetailValidation function return true creates new user
export async function makeNewUser(username, password) {
  signinEls.errorPlaceholder.textContent = '';
  if (
    !userDetailValidation(
      signinEls.username,
      signinEls.password,
      signinEls.errorPlaceholder
    )
  ) {
    return null;
  }

  const newUser = new User(username, password);
  users[newUser.username] = newUser.password;
  signinEls.rotationSvg.classList.remove('hidden-svg');
  await setTimeout(() => {
    signinEls.rotationSvg.classList.add('hidden-svg');
    location.reload();
  }, 1200);
  return;
}

// Looks if user details are appropriate length and that user with given nickname does not exist
export function userDetailValidation(username, password, errorPlaceholder) {
  if (!username.checkValidity() && !password.checkValidity()) {
    console.log(username);
    errorPlaceholder.textContent =
      'Password minlength is 6 chars, username minlength is 4 chars.';
    return false;
  } else if (!username.checkValidity() && password.checkValidity()) {
    errorPlaceholder.textContent =
      'Username is too short, minlength is 4 chars.';
    return false;
  } else if (username.checkValidity() && !password.checkValidity()) {
    errorPlaceholder.textContent =
      'Password is too short, minlength is 6 chars.';
    return false;
  } else if (checkForExistingUser(username.value)) {
    errorPlaceholder.textContent = `Username ${username.value} is not available.`;
    return false;
  }
  return true;
}

export function clearUserInput() {
  signinEls.username.value = '';
  signinEls.password.value = '';
}

export function getUser() {
  return users;
}

// indexPageEventDelegation();
retrievedUserStr = localStorage.getItem('users');