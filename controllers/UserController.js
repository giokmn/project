const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  // Register a new user
  static async createUser(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, DateBirth, Email, Phone, Role, HireDate } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !UserName || !Password || !DateBirth || !Email || !Phone || !Role || !HireDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      // Check if email or username already exists
      const existingUser = await User.findOne({ where: { Email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      const existingUsername = await User.findOne({ where: { UserName } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // Hashing password before saving
      const hashedPassword = await bcrypt.hash(Password, 10);

      const user = await User.create({
        FirstName,
        LastName,
        UserName,
        Password: hashedPassword,
        DateBirth,
        Email,
        Phone,
        Role,
        HireDate,
      });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // User login
  static async loginUser(req, res) {
    try {
      const { UserName, Password } = req.body;

      if (!UserName || !Password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await User.findOne({ where: { UserName } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare entered password with hashed password in DB
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { UserId: user.UserId, Role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // User logout
  static async logoutUser(req, res) {
    try {
      // Clear the JWT token from the cookie
      res.clearCookie('token'); // Assuming the token is stored in a cookie

      // Send a success response
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
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
      const { Password, ...updateData } = req.body;

      if (Password) {
        updateData.Password = await bcrypt.hash(Password, 10);
      }

      const [updated] = await User.update(updateData, { where: { UserId: id } });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        return res.status(200).json(updatedUser);
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({ where: { UserId: id } });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;