const { Order } = require('../models'); // Importing the Order model

class OrderController {

  // Private route: Create a new order
  static async createOrder(req, res) {
    try {
      const order = await Order.create(req.body); // Creating a new order with request body data
      return res.status(201).json(order); // Returning the created order with status 201 (Created)
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Bad request if validation fails
    }
  }

  // Private route: Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll(); // Fetching all orders from the database
      return res.status(200).json(orders); // Returning the list of orders
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }

  // Private route: Get a specific order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params; // Extracting order ID from request parameters
      const order = await Order.findByPk(id); // Finding order by primary key    
      if (!order) {
        return res.status(404).json({ message: 'Order not found' }); // Not found response
      }
      return res.status(200).json(order); // Returning the found order
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }

  // Private route: Update an existing order
  static async updateOrder(req, res) {
    try {
      const { id } = req.params; // Extracting order ID from request parameters
      // Updating order details in the database
      const [updated] = await Order.update(req.body, { where: { OrderId: id } });
      if (!updated) {
        return res.status(404).json({ message: 'Order not found' }); // Not found response if no rows were updated
      }
      // Fetching updated order details
      const updatedOrder = await Order.findByPk(id);
      return res.status(200).json(updatedOrder); // Returning the updated order
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }

  // Private route: Delete an order
  static async deleteOrder(req, res) {
    try {
      const { id } = req.params; // Extracting order ID from request parameters
      // Deleting order from the database
      const deleted = await Order.destroy({ where: { OrderId: id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Order not found' }); // Not found response if no rows were deleted
      }
      return res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }
}

module.exports = OrderController; // Exporting the OrderController class for use in routes