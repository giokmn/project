const { Grocery } = require('../models/Grocery');

class GroceryController {

  static async createGrocery(req, res) {
    try {
      const grocery = await Grocery.create(req.body)
      return res.status(201).json(grocery)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllGroceries(req, res) {
    try {
      const groceries = await Grocery.findAll()
      return res.status(200).json(groceries)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Dobavljanje proizvoda po ID-u
  static async getGroceryById(req, res) {
    try {
      const { id } = req.params
      const grocery = await Grocery.findByPk(id);
      if (!grocery) {
        return res.status(404).json({ message: 'Grocery not found' })
      }
      return res.status(200).json(grocery)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateGrocery(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Grocery.update(req.body, { where: { GroceryId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Grocery not found' })
      }

      const updatedGrocery = await Grocery.findByPk(id)
      return res.status(200).json(updatedGrocery)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteGrocery(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Grocery.destroy({ where: { GroceryId: id } })
      if (!deleted) {
        return res.status(404).json({ message: 'Grocery not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = GroceryController;