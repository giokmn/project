const { Order } = require('../models')

class OrderController {

  static async createOrder(req, res) {
    try {
      const order = await Order.create(req.body)
      return res.status(201).json(order)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll()
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params
      const order = await Order.findByPk(id)
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }
      return res.status(200).json(order)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateOrder(req, res) {
    try {
      const { id } = req.params
      const [updated] = await Order.update(req.body, { where: { OrderId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Order not found' })
      }

      const updatedOrder = await Order.findByPk(id)
      return res.status(200).json(updatedOrder)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params
      const deleted = await Order.destroy({ where: { OrderId: id } })

      if (!deleted) {
        return res.status(404).json({ message: 'Order not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = OrderController