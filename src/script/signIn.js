export const signinEls = {
  username: document.querySelector('[data-username]'),
  password: document.querySelector('[data-password]'),
  rememberMe: document.querySelector('[data-remember-me]'),
  signinBtn: document.querySelector('[data-signin]'),
  registrationBtn: document.querySelector('[data-register]'),
  mainField: document.querySelector('[data-main-field]')
}

// Class which will store user signin details.
class User {
  constructor(username, password, isRemembered = false) {
    this.username = username;
    this.password = password;
    this.isRemembered = isRemembered;
  }
}

// Object which will store instances of signin details class.
export let users;
let retrievedUserStr = localStorage.getItem('users');

if(!retrievedUserStr) {
  users = new Object;
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

// Adds user obj to local storage when function is called.
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Turns string from local storage back to obj state.
function parseStorageData(data) {
  return JSON.parse(data);
}

// Function which iterates trough users object retrieved from local storage,
// and if username and password mach grand successful entry else no entry.
function signingIn(username, password) {
  for (let [user,pass] of Object.entries(users)) {
    if(user === username && pass === password) {
      return true;
    }
  }
  return false;
}

function checkForExistingUser(username) {
  for (let name of Object.keys(users)) {
    if (name === username) {
      return true;
    }
  }
  return false;
}

function makeNewUser(username, password) {
  if(checkForExistingUser(username)) {
    return `${username} is not available.`;
  } else if (
    !signinEls.username.checkValidity() ||
    !signinEls.password.checkValidity()
  ) {
    return  `Password minlength is 6 letters and usernames min length is 4 letters.`;
  }
  const newUser = new User(username, password);
  users[newUser.username] = newUser.password;
}

function indexPageEventDelegation() {
  signinEls.mainField.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    // Event listener for sign in button click
    if(target.closest('#signin-btn')) {
      if(signingIn(signinEls.username.value, signinEls.password.value)) {
        window.location = './template.html';
        // Event listener for registration button click
      } else {
        alert ('Unsuccessful signing in attempt.');
        clearUserInput();
      }
    } else if (target.closest('#registration-btn')) {
      makeNewUser(signinEls.username.value, signinEls.password.value);
      setLocalStorage('users', users);
    }
  });
}

export function clearUserInput() {
  signinEls.username.value = '';
  signinEls.password.value = '';
}

indexPageEventDelegation();
retrievedUserStr = localStorage.getItem('users');