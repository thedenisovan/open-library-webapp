import { addLoadingSvg } from './indexUi';

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
export class SingleUser {
  constructor(username, password, isRemembered = false) {
    this.username = username;
    this.password = password;
    this.isRemembered = isRemembered;
  }
}

export class AllUsers {
  constructor(data) {
    this.users = new Map(data);
  }
  // if userDetailValidation function return true creates new user
  async makeNewUser(username, password) {
    signinEls.errorPlaceholder.textContent = '';
    if (
      !this.userDetailValidation(
        signinEls.username,
        signinEls.password,
        signinEls.errorPlaceholder,
        this.users
      )
    ) {
      return null;
    }
    this.users.set(username, password);
    addLoadingSvg(signinEls.rotationSvg);
    return;
  }

  // Iterates trough users obj and look if user with give user name exists or not
  checkForExistingUser(username) {
    if (this.users.has(username)) {
      return true;
    }
    return false;
  }

  /* Function which iterates trough users object retrieved from local storage,
  and if username and password mach grand successful entry else no entry. */
  signingIn(username, password) {
    for (let [user,pass] of this.users.entries()) {
      if(user === username && pass === password) {
        return true;
      }
    }
    return false;
  }

  // Looks if user details are appropriate length and that user with given nickname does not exist
  userDetailValidation(username, password, errorPlaceholder) {
    const uValid = username.checkValidity();
    const pValid = password.checkValidity();

    switch (true) {
      case !uValid && !pValid:
        errorPlaceholder.textContent =
          'Password minlength is 6 chars, username minlength is 4 chars.';
        return false;

      case !uValid && pValid:
        errorPlaceholder.textContent =
          'Username is too short, minlength is 4 chars.';
        return false;

      case uValid && !pValid:
        errorPlaceholder.textContent =
          'Password is too short, minlength is 6 chars.';
        return false;

      case this.checkForExistingUser(username.value):
        errorPlaceholder.textContent = `Username ${username.value} is not available.`;
        return false;

      default:
        return true;
    }
  }
}