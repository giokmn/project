const { Location } = require('../models');

class LocationController {

  static async createLocation(req, res) {
    try {
      const location = await Location.create(req.body)
      return res.status(201).json(location)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllLocations(req, res) {
    try {
      const locations = await Location.findAll()
      return res.status(200).json(locations)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getLocationById(req, res) {
    try {
      const { id } = req.params;
      const location = await Location.findByPk(id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' })
      }
      return res.status(200).json(location)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateLocation(req, res) {
    try {
      const { id } = req.params
      const [updated] = await Location.update(req.body, { where: { LocationId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Location not found' })
      }

      const updatedLocation = await Location.findByPk(id)
      return res.status(200).json(updatedLocation)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteLocation(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Location.destroy({ where: { LocationId: id } })
      if (!deleted) {
        return res.status(404).json({ message: 'Location not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = LocationController;