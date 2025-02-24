const { Grocery } = require('../models'); // Import the Grocery model

class GroceryController {

  // Create a new grocery item in the database
  static async createGrocery(req, res) {
    try {
      const grocery = await Grocery.create(req.body); // Create a new grocery item using request body data
      return res.status(201).json(grocery); // Return the created grocery item with HTTP 201 (Created)
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Return error message if creation fails
    }
  }

  // Retrieve all grocery items from the database
  static async getAllGroceries(req, res) {
    try {
      const groceries = await Grocery.findAll(); // Fetch all grocery records
      return res.status(200).json(groceries); // Return groceries with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Retrieve a single grocery item by its ID
  static async getGroceryById(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const grocery = await Grocery.findByPk(id); // Find grocery item by primary key (ID)

      if (!grocery) {
        return res.status(404).json({ message: 'Grocery not found' }); // Return 404 if grocery doesn't exist
      }

      return res.status(200).json(grocery); // Return found grocery item with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Update a grocery item by its ID
  static async updateGrocery(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const [updated] = await Grocery.update(req.body, { where: { GroceryId: id } }); // Update grocery data

      if (!updated) {
        return res.status(404).json({ message: 'Grocery not found' }); // Return 404 if no rows were updated
      }

      const updatedGrocery = await Grocery.findByPk(id); // Fetch the updated grocery item
      return res.status(200).json(updatedGrocery); // Return updated grocery with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if update fails
    }
  }

  // Delete a grocery item by its ID
  static async deleteGrocery(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const deleted = await Grocery.destroy({ where: { GroceryId: id } }); // Delete grocery item by ID

      if (!deleted) {
        return res.status(404).json({ message: 'Grocery not found' }); // Return 404 if no rows were deleted
      }

      return res.status(204).send(); // Return HTTP 204 (No Content) on successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if deletion fails
    }
  }
}

module.exports = GroceryController; // Export the GroceryController class