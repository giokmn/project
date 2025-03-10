const { Location } = require('../models'); // Import the Location model

class LocationController {

  // Create a new location entry in the database
  static async createLocation(req, res) {
    try {
      const location = await Location.create(req.body); // Create a new location using request body data
      return res.status(201).json(location); // Return the created location with HTTP 201 (Created)
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Return error message if creation fails
    }
  }

  // Retrieve all locations from the database
  static async getAllLocations(req, res) {
    try {
      const locations = await Location.findAll(); // Fetch all location records
      return res.status(200).json(locations); // Return locations with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Retrieve a single location by its ID
  static async getLocationById(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const location = await Location.findByPk(id); // Find location by primary key (ID)
      if (!location) {
        return res.status(404).json({ message: 'Location not found' }); // Return 404 if location doesn't exist
      }
      return res.status(200).json(location); // Return found location with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if retrieval fails
    }
  }

  // Update a location by its ID
  static async updateLocation(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const [updated] = await Location.update(req.body, { where: { LocationId: id } }); // Update location data
      if (!updated) {
        return res.status(404).json({ message: 'Location not found' }); // Return 404 if no rows were updated
      }
      const updatedLocation = await Location.findByPk(id); // Fetch the updated location
      return res.status(200).json(updatedLocation); // Return updated location with HTTP 200 (OK)
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if update fails
    }
  }

  // Delete a location by its ID
  static async deleteLocation(req, res) {
    try {
      const { id } = req.params; // Extract ID from request parameters
      const deleted = await Location.destroy({ where: { LocationId: id } }); // Delete location by ID
      if (!deleted) {
        return res.status(404).json({ message: 'Location not found' }); // Return 404 if no rows were deleted
      }
      return res.status(204).send(); // Return HTTP 204 (No Content) on successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Return error message if deletion fails
    }
  }
}

module.exports = LocationController; // Export the LocationController class