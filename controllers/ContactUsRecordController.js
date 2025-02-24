const { ContactUsRecord } = require('../models'); // Import the ContactUsRecord model

class ContactUsRecordController {
  
  // Create a new ContactUs record (Admin only)
  static async createContactUsRecord(req, res) {
    try {
      const contactUsRecord = await ContactUsRecord.create(req.body);
      res.status(201).json(contactUsRecord);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // PUBLIC: Get all ContactUs records (only Id, Message, and Response)
  static async getPublicContactUsRecords(req, res) {
    try {
      const contactUsRecords = await ContactUsRecord.findAll({
        attributes: ['Id', 'Message', 'Response'],
      });
      res.status(200).json(contactUsRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUBLIC: Get a single ContactUs record (only Id, Message, and Response)
  static async getPublicContactUsRecordById(req, res) {
    try {
      const contactUsRecord = await ContactUsRecord.findByPk(req.params.id, {
        attributes: ['Id', 'Message', 'Response'],
      });
      if (!contactUsRecord) return res.status(404).json({ message: 'Contact record not found' });
      res.status(200).json(contactUsRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PRIVATE: Get all ContactUs records (FULL DATA)
  static async getAllContactUsRecords(req, res) {
    try {
      const contactUsRecords = await ContactUsRecord.findAll();
      res.status(200).json(contactUsRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PRIVATE: Get a single ContactUs record (FULL DATA)
  static async getContactUsRecordById(req, res) {
    try {
      const contactUsRecord = await ContactUsRecord.findByPk(req.params.id);
      if (!contactUsRecord) return res.status(404).json({ message: 'Contact record not found' });
      res.status(200).json(contactUsRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a ContactUs record (Admin only)
  static async updateContactUsRecord(req, res) {
    try {
      const [updated] = await ContactUsRecord.update(req.body, { where: { Id: req.params.id } });
      if (!updated) return res.status(404).json({ message: 'Contact record not found' });
      const updatedContactUsRecord = await ContactUsRecord.findByPk(req.params.id);
      res.status(200).json(updatedContactUsRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a ContactUs record (Admin only)
  static async deleteContactUsRecord(req, res) {
    try {
      const deleted = await ContactUsRecord.destroy({ where: { Id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: 'Contact record not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContactUsRecordController;