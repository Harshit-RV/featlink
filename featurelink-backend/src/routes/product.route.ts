import express from 'express';
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  updateProduct,
  deleteProduct,
} from '../services/product.service';

const router = express.Router();

// Route to create a new product
router.post('/create', async (req, res) => {
  try {
    const { name, founder } = req.body;
    const newProduct = await createNewProduct({ name, founder });
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json(err);
  }
});

// Route to get all products
router.get('/all', async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json(err);
  }
});

// Route to get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json(err);
  }
});

// Route to get a product by name
router.get('/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const product = await getProductByName(name);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by name:', err);
    res.status(500).json(err);
  }
});

// Route to update a product's details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await updateProduct(id, updateData);
    if (!updatedProduct) {
      return res.status(400).json({ message: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json(err);
  }
});

// Route to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return res.status(400).json({ message: 'Product not found' });
    }
    return res.status(200).json(deletedProduct);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json(err);
  }
});

export default router;