const { CashRegister } = require('../models/CashRegister')

class CashRegisterController {

  static async createCashRegister(req, res) {
    try {
      const cashRegister = await CashRegister.create(req.body)
      return res.status(201).json(cashRegister)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllCashRegisters(req, res) {
    try {
      const cashRegisters = await CashRegister.findAll()
      return res.status(200).json(cashRegisters)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getCashRegisterById(req, res) {
    try {
      const { id } = req.params
      const cashRegister = await CashRegister.findByPk(id)
      if (!cashRegister) {
        return res.status(404).json({ message: 'Cash register not found' })
      }
      return res.status(200).json(cashRegister)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateCashRegister(req, res) {
    try {
      const { id } = req.params
      const [updated] = await CashRegister.update(req.body, { where: { CashRegisterId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Cash register not found' })
      }

      const updatedCashRegister = await CashRegister.findByPk(id)
      return res.status(200).json(updatedCashRegister)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteCashRegister(req, res) {
    try {
      const { id } = req.params
      const deleted = await CashRegister.destroy({ where: { CashRegisterId: id } })

      if (!deleted) {
        return res.status(404).json({ message: 'Cash register not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = CashRegisterController