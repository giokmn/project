const { OrderItem } = require('../models'); // Importing the OrderItem model

class OrderItemController {
  
  // Public route: Get only basic details (for customers)
  static async getPublicOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll({
        attributes: ['OrderItemId', 'OrderId', 'ProductId'], // Restricting attributes for public access
      });
      return res.status(200).json(orderItems);
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }

  // Public route: Get basic details for a single OrderItem (for customers)
  static async getPublicOrderItemById(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await OrderItem.findByPk(id, {
        attributes: ['OrderItemId', 'OrderId', 'ProductId'],
      });
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' }); // Not found response
      }
      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private route: Get full order item details (for authenticated users)
  static async getAllOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll();
      return res.status(200).json(orderItems);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private route: Get full details for a specific OrderItem
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

  // Private route: Create a new OrderItem
  static async createOrderItem(req, res) {
    try {
      const orderItem = await OrderItem.create(req.body);
      return res.status(201).json(orderItem);
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Bad request if validation fails
    }
  }

  // Private route: Update an existing OrderItem
  static async updateOrderItem(req, res) {
    try {
      const { id } = req.params;
      // Updating order item details in the database
      const [updated] = await OrderItem.update(req.body, { where: { OrderItemId: id } });
      if (!updated) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      // Fetching updated order item details
      const updatedOrderItem = await OrderItem.findByPk(id);
      return res.status(200).json(updatedOrderItem);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private route: Delete an OrderItem
  static async deleteOrderItem(req, res) {
    try {
      const { id } = req.params;
      // Deleting order item from the database
      const deleted = await OrderItem.destroy({ where: { OrderItemId: id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      return res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderItemController; // Exporting the OrderItemController class for use in routes