const { Product } = require('../models/Product');

class ProductController {

  static async createProduct(req, res) {
    try {
      const product = await Product.create(req.body)
      return res.status(201).json(product)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll()
      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }
      return res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params
      const [updated] = await Product.update(req.body, { where: { ProductId: id } })

      if (!updated) {
        return res.status(404).json({ message: 'Product not found' })
      }

      const updatedProduct = await Product.findByPk(id)
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params
      const deleted = await Product.destroy({ where: { ProductId: id } })

      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = ProductController;