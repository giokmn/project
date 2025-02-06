const {Customer}=require('../models/Customer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class CustomerController{
  
  static async createCustomer(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, Phone } = req.body;

      // Validate required fields
      if (!FirstName || !LastName || !UserName || !Password || !Phone) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Hashing password before we save it
      const hashedPassword = await bcrypt.hash(Password, 10);

      const customer = await Customer.create({
        ...req.body,
        Password: hashedPassword,  // Save hashed password
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
        { CustomerId: customer.CustomerId, Role: 'Customer' }, // Customer role(hard-codded)
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAllCustomers(req,res){
    try
    {
      const customers=await User.findAll()
      return res.status(200).json(customers)
    }catch(error){
      return res.status(500).json({error: error.message})
    }
  }

  static async getCustomerById(req,res){
    try {
      const { id } = req.params
      const customer = await Customer.findByPk(id)
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' })
      }
      return res.status(200).json(customer)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateCustomer(req, res) {
    try {
      const { id } = req.params
      const [updated] = await Customer.update(req.body, { where: { CustomerId: id } })
      if (updated) {
        const updatedCustomer = await Customer.findByPk(id)
        return res.status(200).json(updatedCustomer)
      }
      return res.status(404).json({ message: 'Customer not found' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteCustomer(req, res) {
    try {
      const { id } = req.params
      const deleted = await Customer.destroy({ where: { CustomerId: id } })
      if (deleted) {
        return res.status(204).send()
      }
      return res.status(404).json({ message: 'Customer not found' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports=CustomerController;
