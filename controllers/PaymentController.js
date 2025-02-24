const { Payment } = require('../models'); // Importing the Payment model from the models directory

class PaymentController {
  
  // Create a new payment record
  static async createPayment(req, res) {
    try {
      const payment = await Payment.create(req.body); // Creating a new payment record with request data
      return res.status(201).json(payment); // Returning the created payment with HTTP status 201 (Created)
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Returning an error response if creation fails
    }
  }

  // Retrieve all payment records from the database
  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll(); // Fetching all payment records
      return res.status(200).json(payments); // Returning the list of payments with HTTP status 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Returning an error response if retrieval fails
    }
  }

  // Retrieve a single payment by its ID
  static async getPaymentById(req, res) {
    try {
      const { id } = req.params; // Extracting the ID parameter from the request
      const payment = await Payment.findByPk(id); // Finding the payment by primary key

      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' }); // Returning a 404 response if the payment does not exist
      }

      return res.status(200).json(payment); // Returning the found payment with HTTP status 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Returning an error response if retrieval fails
    }
  }

  // Update an existing payment record
  static async updatePayment(req, res) {
    try {
      const { id } = req.params; // Extracting the ID parameter from the request
      const [updated] = await Payment.update(req.body, { where: { PaymentId: id } }); // Updating the payment record

      if (!updated) {
        return res.status(404).json({ message: 'Payment not found' }); // Returning a 404 response if the payment does not exist
      }

      const updatedPayment = await Payment.findByPk(id); // Fetching the updated payment record
      return res.status(200).json(updatedPayment); // Returning the updated payment with HTTP status 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Returning an error response if update fails
    }
  }

  // Delete a payment record
  static async deletePayment(req, res) {
    try {
      const { id } = req.params; // Extracting the ID parameter from the request
      const deleted = await Payment.destroy({ where: { PaymentId: id } }); // Deleting the payment record

      if (!deleted) {
        return res.status(404).json({ message: 'Payment not found' }); // Returning a 404 response if the payment does not exist
      }

      return res.status(204).send(); // Returning HTTP status 204 (No Content) on successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Returning an error response if deletion fails
    }
  }
}

module.exports = PaymentController; // Exporting the PaymentController class for use in route