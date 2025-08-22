// DOM elements of sign in page.
const loginEls = {
  username: document.querySelector('[data-username]'),
  password: document.querySelector('[data-password]'),
  rememberMe: document.querySelector('[data-remember-me]'),
  signinPageBtn: document.querySelector('[data-signin-page]'),
  singUpPageBtn: document.querySelector('[data-signup-page]'),
  hidden: document.querySelectorAll('.hidden'),
  visible: document.querySelectorAll('.visible'),
  foreground: document.querySelector('[data-foreground]')
}

// Class instances of whom will store user personal details.
class PersonalDetails {
  constructor(username, password, isRemembered = false) {
    this.username = username;
    this.password = password;
    this.isRemembered = isRemembered;
  }
}
// Object which will store instances of personal details class.
const users = new Object;

// Initial users
const user1 = new PersonalDetails('jamal', '0000');
const user2 = new PersonalDetails('marquis', '1111');
const user3 = new PersonalDetails('samantha', '2222');
users[user1.username] = user1.password;
users[user2.username] = user2.password;
users[user3.username] = user3.password;

const storedUsers = localStorage.setItem('users', JSON.stringify(users));
const retrievedUserStr = localStorage.getItem('users');
const retrievedUsers = JSON.parse(retrievedUserStr);

// Function which iterates trough users object retrieved from local storage,
// and if username and password mach grand successful entry else no entry.
function signingIn(username, password) {
  for (let [user,pass] of Object.entries(users)) {
    if(user === username && pass === password) {
      window.location = './template.html';
      return;
    }
  }
  alert ('Unsuccessful signing in attempt.');
  clearUserInput();
  return;
}

function toggleClasslist(elements, cl1, cl2) {
  elements.forEach((el) => {
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
  })
}

function clearUserInput() {
  loginEls.username.value = '';
  loginEls.password.value = '';
}

loginEls.singUpPageBtn.addEventListener('click', () => {
  toggleClasslist(loginEls.hidden, 'hidden', 'visible');
  toggleClasslist(loginEls.visible, 'hidden', 'visible');
  loginEls.foreground.classList.add('beige-bg');
  loginEls.foreground.classList.remove('blue-bg');
  clearUserInput();
});
loginEls.signinPageBtn.addEventListener('click', () => {
  toggleClasslist(loginEls.hidden, 'hidden', 'visible');
  toggleClasslist(loginEls.visible, 'hidden', 'visible');
  loginEls.foreground.classList.remove('beige-bg');
  loginEls.foreground.classList.add('blue-bg');
  clearUserInput();
});

loginEls.signinBtn.addEventListener('click', () => {
  signingIn(loginEls.username.value, loginEls.password.value);
})