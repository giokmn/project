const {Customer}=require('../models/Customer')

class CustomerController{
  
  static async createCustomer(req,res){
    try
    {
      const customer=await Customer.create(req.body)
      return res.status(201).json(customer)
    }catch(error){
      return res.status(500).json({error: error.message})
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
