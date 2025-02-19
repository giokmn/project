const { Customer } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CustomerController {
  
  static async createCustomer(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, Phone } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !UserName || !Password || !Phone) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Create customer and hash password in model hook
      const customer = await Customer.create({
        ...req.body,
        Password: Password,  // Password will be hashed in the model
      });

      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async loginCustomer(req, res) {
    try {
      const { UserName, Password } = req.body;

      const customer = await Customer.findOne({ where: { UserName } });

      if (!customer || !(await bcrypt.compare(Password, customer.Password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { CustomerId: customer.CustomerId, Role: 'Customer' }, // Customer role (hardcoded)
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async logoutCustomer(req, res) {
    try {
      // Typically, JWT tokens are handled client-side and are removed by the client. 
      // Example: Just return a response telling the client to delete the token
      return res.status(200).json({ message: "Logout successful, please remove your JWT token from client storage." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllCustomers(req, res) {
    try {
      const customers = await Customer.findAll();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Customer.update(req.body, { where: { CustomerId: id } });
      if (updated) {
        const updatedCustomer = await Customer.findByPk(id);
        return res.status(200).json(updatedCustomer);
      }
      return res.status(404).json({ message: 'Customer not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Customer.destroy({ where: { CustomerId: id } });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: 'Customer not found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CustomerController;