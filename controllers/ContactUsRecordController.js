const { ContactUsRecord } = require('../models/ContactUsRecord')

class ContactUsRecordController {

  static async createContactUsRecord(req, res) {
    try {
      const contactUsRecord = await ContactUsRecord.create(req.body)
      return res.status(201).json(contactUsRecord)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllContactUsRecords(req, res) {
    try {
      const contactUsRecords = await ContactUsRecord.findAll()
      return res.status(200).json(contactUsRecords)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getContactUsRecordById(req, res) {
    try {
      const { id } = req.params
      const contactUsRecord = await ContactUsRecord.findByPk(id)
      if (!contactUsRecord) {
        return res.status(404).json({ message: 'Contact record not found' })
      }
      return res.status(200).json(contactUsRecord)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateContactUsRecord(req, res) {
    try {
      const { id } = req.params
      const [updated] = await ContactUsRecord.update(req.body, { where: { ContactUsRecordId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Contact record not found' })
      }

      const updatedContactUsRecord = await ContactUsRecord.findByPk(id)
      return res.status(200).json(updatedContactUsRecord)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteContactUsRecord(req, res) {
    try {
      const { id } = req.params
      const deleted = await ContactUsRecord.destroy({ where: { ContactUsRecordId: id } })

      if (!deleted) {
        return res.status(404).json({ message: 'Contact record not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = ContactUsRecordController