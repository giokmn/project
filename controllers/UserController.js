const {User}= require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{

  static async createUser(req, res) {
    try {
      const { FirstName, LastName, UserName, Password, DateBirth, Email, Phone, Role, HireDate } = req.body
  
  // Validate required fields
  if (!FirstName || !LastName || !UserName || !Password || !DateBirth || !Email || !Phone || !Role || !HireDate) {
    return res.status(400).json({ message: 'All required fields must be provided' })
  }
      // Hashing password before we save it
      const hashedPassword = await bcrypt.hash(Password, 10)

      const user = await User.create({
        ...req.body,
        Password: hashedPassword  // Save hash password
      })
  
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async loginUser(req, res) {
    try {
      const { UserName, Password } = req.body
      const user = await User.findOne({ where: { UserName } })

      if (!user || !(await bcrypt.compare(Password, user.Password))) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // Generating JWT token
      const token = jwt.sign(
        { UserId: user.UserId, Role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ error: error.message })
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