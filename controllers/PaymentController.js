const {Payment}=require('../models')

class PaymentController {
  
  static async createPayment(req, res) {
    try {
      const payment = await Payment.create(req.body)
      return res.status(201).json(payment)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll()
      return res.status(200).json(payments)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getPaymentById(req, res) {
    try {
      const { id } = req.params
      const payment = await Payment.findByPk(id)
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' })
      }
      return res.status(200).json(payment)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updatePayment(req, res) {
    try {
      const { id } = req.params
      const [updated] = await Payment.update(req.body, { where: { PaymentId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Payment not found' })
      }

      const updatedPayment = await Payment.findByPk(id)
      return res.status(200).json(updatedPayment)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deletePayment(req, res) {
    try {
      const { id } = req.params
      const deleted = await Payment.destroy({ where: { PaymentId: id } })

      if (!deleted) {
        return res.status(404).json({ message: 'Payment not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;