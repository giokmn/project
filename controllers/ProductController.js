const { Product } = require('../models'); // Importing the Product model from the models directory

class ProductController {
  
  // Create a new product (Admin only)
  static async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Bad request if validation fails
    }
  }

  // Public route: Get only ID and Name of all products
  static async getPublicProducts(req, res) {
    try {
      const products = await Product.findAll({ attributes: ['ProductId', 'Name'] }); // Restricting attributes for public access
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Internal server error
    }
  }

  // Public route: Get only ID and Name of a single product
  static async getPublicProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, { attributes: ['ProductId', 'Name'] });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' }); // Not found response
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private route: Get full product details (Admin only)
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Private route: Get full product details by ID (Admin only)
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update product details (Admin only)
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      // Updating product details in the database
      const [updated] = await Product.update(req.body, { where: { ProductId: id } });
      if (!updated) {
        return res.status(404).json({ message: 'Product not found' });
      }
      // Fetching updated product details
      const updatedProduct = await Product.findByPk(id);
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete a product (Admin only)
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      // Deleting product from the database
      const deleted = await Product.destroy({ where: { ProductId: id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController; // Exporting the ProductController class for use in routes