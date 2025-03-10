const { User } = require('../models'); // Importing the User model from the models directory
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for authentication

class UserController {
  // Register a new user
  static async createUser(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, DateBirth, Email, Phone, Role, HireDate } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !UserName || !Password || !DateBirth || !Email || !Phone || !Role || !HireDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ where: { Email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Check if username already exists
      const existingUsername = await User.findOne({ where: { UserName } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // Create user - password hashing handled by Sequelize hooks
      const user = await User.create({
        FirstName,
        LastName,
        UserName,
        Password, // Raw password is passed; hook will hash it
        DateBirth,
        Email,
        Phone,
        Role,
        HireDate,
      });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error response
    }
  }

  // User login
  static async loginUser(req, res) {
    try {
      const { UserName, Password } = req.body;

      // Validate required fields
      if (!UserName || !Password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Find user by username
      const user = await User.findOne({ where: { UserName } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare entered password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { UserId: user.UserId, Role: user.Role }, // Payload containing user ID and role
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: "1h" } // Token expiration time
      );

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // User logout
  static async logoutUser(req, res) {
    try {
      // Logout in JWT-based authentication is handled on the client side by removing the token
      return res.status(200).json({ message: "User logged out successfully - please remove token on client side" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['Password'] } // Excluding password for security reasons
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Find user by primary key and exclude the password field
      const user = await User.findByPk(id, {
        attributes: { exclude: ['Password'] }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Update user information - password hashing handled by Sequelize hooks if applicable
      const [updated] = await User.update(updateData, { where: { UserId: id },individualHooks: true });

      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch updated user data excluding the password field
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['Password'] }
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Delete the user by ID
      const deleted = await User.destroy({ where: { UserId: id } });

      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(204).send(); // 204 No Content response for successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController; // Exporting the UserController class for use in routes