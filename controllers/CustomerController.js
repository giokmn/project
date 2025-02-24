const { Customer } = require('../models'); // Import the Customer model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for authentication

class CustomerController {
  static async createCustomer(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, Phone } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !UserName || !Password || !Phone) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Check if username already exists
      const existingUsername = await Customer.findOne({ where: { UserName } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // Create customer - hashing handled by model hook
      const customer = await Customer.create({
        FirstName,
        LastName,
        UserName,
        Password, // Raw password, hook will hash it
        Phone
      });

      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred while creating the customer' });
    }
  }

  static async loginCustomer(req, res) {
    try {
      const { UserName, Password } = req.body;

      // Validate required fields
      if (!UserName || !Password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const customer = await Customer.findOne({ where: { UserName } });
      if (!customer || !(await bcrypt.compare(Password, customer.Password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Ensure JWT secret is defined
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { CustomerId: customer.CustomerId, Role: 'Customer' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred during login' });
    }
  }

  static async logoutCustomer(req, res) {
    return res.status(200).json({ message: "Logout successful, please remove your JWT token from client storage" });
  }

  static async getAllCustomers(req, res) {
    try {
      const customers = await Customer.findAll({
        attributes: { exclude: ['Password'] } // Exclude password for security
      });
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred while fetching customers' });
    }
  }

  static async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id, {
        attributes: { exclude: ['Password'] } // Exclude password
      });
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred while fetching the customer' });
    }
  }

  static async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Update customer information - hooks (e.g., password hashing) are triggered if defined
      const [updated] = await Customer.update(updateData, { 
        where: { CustomerId: id },
        individualHooks: true // Enables hooks like beforeUpdate for password hashing
      });
      if (!updated) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Fetch updated customer data, excluding the password field
      const updatedCustomer = await Customer.findByPk(id, {
        attributes: { exclude: ['Password'] }
      });
  
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred while updating the customer' });
    }
  }

  static async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Customer.destroy({ where: { CustomerId: id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message || 'An error occurred while deleting the customer' });
    }
  }
}

module.exports = CustomerController;