// Handles user data and validation

export class SingleUser {
  constructor(username, password, isRemembered = false) {
    this.username = username;
    this.password = password;
    this.isRemembered = isRemembered;
  }
}

export class AllUsers {
  constructor(initialData = []) {
    this.users = new Map(initialData);
  }

  // Check if username exists
  checkForExistingUser(username) {
    return this.users.has(username);
  }

  // Validate username & password
  validateUserDetails(username, password) {
    const errors = [];
    if (username.length < 4) errors.push('Username must be at least 4 chars.');
    if (password.length < 6) errors.push('Password must be at least 6 chars.');
    if (this.checkForExistingUser(username)) errors.push('Username not available.');
    return errors;
  }

  // Add a new user if valid
  addUser(username, password) {
    const errors = this.validateUserDetails(username, password);
    if (errors.length) return { success: false, errors };
    this.users.set(username, password);
    return { success: true };
  }

  // Check login credentials
  signIn(username, password) {
    return this.users.get(username) === password;
  }

  // LocalStorage helpers
  saveToStorage(key) {
    localStorage.setItem(key, JSON.stringify([...this.users]));
  }

  static loadFromStorage(key) {
    const data = localStorage.getItem(key);
    if (!data) return new AllUsers();
    return new AllUsers(JSON.parse(data));
  }
}
