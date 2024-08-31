import Product, { ProductDoc } from "../models/Product";

/**
 * Create a new product
 * @param args - Product properties
 * @returns The created product document
 */
export const createNewProduct = async (args: Partial<ProductDoc>): Promise<ProductDoc> => {
  const newProduct = new Product(args);
  return newProduct.save();
};

/**
 * Get all products
 * @returns An array of all product documents
 */
export const getAllProducts = async (): Promise<ProductDoc[]> => {
  return Product.find({});
};

/**
 * Get product by ID
 * @param id - Product ID
 * @returns The product document or null if not found
 */
export const getProductById = async (id: string): Promise<ProductDoc | null> => {
  return Product.findById(id);
};

/**
 * Get product by name
 * @param name - Product name
 * @returns The product document or null if not found
 */
export const getProductByName = async (name: string): Promise<ProductDoc | null> => {
  return Product.findOne({ name });
};

/**
 * Update a product's details
 * @param id - Product ID
 * @param updateData - Data to update
 * @returns The updated product document
 */
export const updateProduct = async (id: string, updateData: Partial<ProductDoc>): Promise<ProductDoc | null> => {
  return Product.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a product by ID
 * @param id - Product ID
 * @returns The deleted product document
 */
export const deleteProduct = async (id: string): Promise<ProductDoc | null> => {
  return Product.findByIdAndDelete(id);
};