const { CashRegister } = require('../models'); // Import the CashRegister model

class CashRegisterController {
  
  // Create a new cash register record
  static async createCashRegister(req, res) {
    try {
      const cashRegister = await CashRegister.create(req.body);
      return res.status(201).json(cashRegister); // Return created record with status 201
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Return error if creation fails
    }
  }

  // Retrieve all cash register records
  static async getAllCashRegisters(req, res) {
    try {
      const cashRegisters = await CashRegister.findAll();
      return res.status(200).json(cashRegisters); // Return all records with status 200
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error if retrieval fails
    }
  }

  // Retrieve a single cash register record by ID
  static async getCashRegisterById(req, res) {
    try {
      const { id } = req.params;
      const cashRegister = await CashRegister.findByPk(id);
      if (!cashRegister) {
        return res.status(404).json({ message: 'Cash register not found' }); // Return 404 if not found
      }
      return res.status(200).json(cashRegister); // Return record if found
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error if retrieval fails
    }
  }

  // Update a cash register record by ID
  static async updateCashRegister(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await CashRegister.update(req.body, { where: { RegisterId: id } });
      if (!updated) {
        return res.status(404).json({ message: 'Cash register not found' }); // Return 404 if not found
      }
      const updatedCashRegister = await CashRegister.findByPk(id);
      return res.status(200).json(updatedCashRegister); // Return updated record
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error if update fails
    }
  }

  // Delete a cash register record by ID
  static async deleteCashRegister(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CashRegister.destroy({ where: { RegisterId: id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Cash register not found' }); // Return 404 if not found
      }
      return res.status(204).send(); // Return 204 (No Content) on successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error if deletion fails
    }
  }
}

module.exports = CashRegisterController; // Export the controller