const { DailyMenu } = require('../models'); // Import the DailyMenu model

class DailyMenuController {

  // Create a new daily menu in the database
  static async createDailyMenu(req, res) {
    try {
      const dailyMenu = await DailyMenu.create(req.body); // Create a new daily menu using request body data
      return res.status(201).json(dailyMenu); // Return the created daily menu with HTTP 201 (Created)
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Return error message if creation fails
    }
  }

  // Retrieve all daily menus from the database
  static async getAllDailyMenus(req, res) {
    try {
      const dailyMenus = await DailyMenu.findAll(); // Fetch all daily menu records
      return res.status(200).json(dailyMenus); // Return daily menus with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Retrieve a single daily menu by its ID
  static async getDailyMenuById(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const dailyMenu = await DailyMenu.findByPk(id); // Find daily menu by primary key (ID)

      if (!dailyMenu) {
        return res.status(404).json({ message: 'Daily menu not found' }); // Return 404 if daily menu doesn't exist
      }

      return res.status(200).json(dailyMenu); // Return found daily menu with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Update a daily menu by its ID
  static async updateDailyMenu(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const [updated] = await DailyMenu.update(req.body, { where: { DailyMenuId: id } }); // Update daily menu data

      if (!updated) {
        return res.status(404).json({ message: 'Daily menu not found' }); // Return 404 if no rows were updated
      }

      const updatedDailyMenu = await DailyMenu.findByPk(id); // Fetch the updated daily menu
      return res.status(200).json(updatedDailyMenu); // Return updated daily menu with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if update fails
    }
  }

  // Delete a daily menu by its ID
  static async deleteDailyMenu(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const deleted = await DailyMenu.destroy({ where: { DailyMenuId: id } }); // Delete daily menu by ID

      if (!deleted) {
        return res.status(404).json({ message: 'Daily menu not found' }); // Return 404 if no rows were deleted
      }

      return res.status(204).send(); // Return HTTP 204 (No Content) on successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if deletion fails
    }
  }
}

module.exports = DailyMenuController; // Export the DailyMenuController class