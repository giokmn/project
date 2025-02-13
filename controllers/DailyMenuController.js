const { DailyMenu } = require('../models')

class DailyMenuController {

  static async createDailyMenu(req, res) {
    try {
      const dailyMenu = await DailyMenu.create(req.body)
      return res.status(201).json(dailyMenu)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllDailyMenus(req, res) {
    try {
      const dailyMenus = await DailyMenu.findAll()
      return res.status(200).json(dailyMenus)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getDailyMenuById(req, res) {
    try {
      const { id } = req.params
      const dailyMenu = await DailyMenu.findByPk(id)
      if (!dailyMenu) {
        return res.status(404).json({ message: 'Daily menu not found' })
      }
      return res.status(200).json(dailyMenu)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateDailyMenu(req, res) {
    try {
      const { id } = req.params
      const [updated] = await DailyMenu.update(req.body, { where: { DailyMenuId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Daily menu not found' })
      }

      const updatedDailyMenu = await DailyMenu.findByPk(id)
      return res.status(200).json(updatedDailyMenu)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteDailyMenu(req, res) {
    try {
      const { id } = req.params
      const deleted = await DailyMenu.destroy({ where: { DailyMenuId: id } })
      if (!deleted) {
        return res.status(404).json({ message: 'Daily menu not found' })
      }
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = DailyMenuController