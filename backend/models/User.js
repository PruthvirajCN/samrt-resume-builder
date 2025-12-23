// In-memory user storage (replace with MongoDB in production)
const users = [];

class User {
  constructor(email, passwordHash) {
    this.id = Date.now().toString();
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
  }

  static findByEmail(email) {
    // Normalize email: lowercase and trim whitespace
    const normalizedEmail = email.toLowerCase().trim();
    return users.find(u => u.email.toLowerCase().trim() === normalizedEmail);
  }

  static findById(id) {
    return users.find(u => u.id === id);
  }

  static create(email, passwordHash) {
    // Ensure email is normalized when creating
    const normalizedEmail = email.toLowerCase().trim();
    const user = new User(normalizedEmail, passwordHash);
    users.push(user);
    return user;
  }

  static getAll() {
    return users;
  }
}

module.exports = User;

