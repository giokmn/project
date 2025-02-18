const { OrderItem } = require('../models');

class OrderItemController {

  // Public: Get only basic details (for customers)
  static async getPublicOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll({
        attributes: ['OrderItemId', 'OrderId', 'ProductId'], // Select only specific columns
      });
      return res.status(200).json(orderItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Public: Get basic details for a single OrderItem (for customers)
  static async getPublicOrderItemById(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await OrderItem.findByPk(id, {
        attributes: ['OrderItemId', 'OrderId', 'ProductId'],
      });

      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private: Get full order item details (for authenticated users)
  static async getAllOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll();
      return res.status(200).json(orderItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getOrderItemById(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await OrderItem.findByPk(id);

      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async createOrderItem(req, res) {
    try {
      const orderItem = await OrderItem.create(req.body);
      return res.status(201).json(orderItem);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async updateOrderItem(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await OrderItem.update(req.body, { where: { OrderItemId: id } });

      if (!updated) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      const updatedOrderItem = await OrderItem.findByPk(id);
      return res.status(200).json(updatedOrderItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteOrderItem(req, res) {
    try {
      const { id } = req.params;
      const deleted = await OrderItem.destroy({ where: { OrderItemId: id } });

      if (!deleted) {
        return res.status(404).json({ message: 'Order item not found' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderItemController;