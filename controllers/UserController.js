const {User}= require('../models/User')

class UserController{

  static async createUser(req,res){
    try
    {
      const user=await User.create(req.body)
      return res.status(201).json(user)
    }catch(error){
      return res.status(500).json({error: error.message})
    }
  }
  
  static async getAllUsers(req,res){
    try
    {
      const users=await User.findAll()
      return res.status(200).json(users)
    }catch(error){
      return res.status(500).json({error: error.message})
    }
  }

  static async getUserById(req,res){
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params
      const [updated] = await User.update(req.body, { where: { UserId: id } })
      if (updated) {
        const updatedUser = await User.findByPk(id)
        return res.status(200).json(updatedUser)
      }
      return res.status(404).json({ message: 'User not found' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params
      const deleted = await User.destroy({ where: { UserId: id } })
      if (deleted) {
        return res.status(204).send()
      }
      return res.status(404).json({ message: 'User not found' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports=UserController;