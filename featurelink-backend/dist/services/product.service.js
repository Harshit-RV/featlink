"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductByName = exports.getProductById = exports.getAllProducts = exports.createNewProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
/**
 * Create a new product
 * @param args - Product properties
 * @returns The created product document
 */
const createNewProduct = async (args) => {
    const newProduct = new Product_1.default(args);
    return newProduct.save();
};
exports.createNewProduct = createNewProduct;
/**
 * Get all products
 * @returns An array of all product documents
 */
const getAllProducts = async () => {
    return Product_1.default.find({});
};
exports.getAllProducts = getAllProducts;
/**
 * Get product by ID
 * @param id - Product ID
 * @returns The product document or null if not found
 */
const getProductById = async (id) => {
    return Product_1.default.findById(id);
};
exports.getProductById = getProductById;
/**
 * Get product by name
 * @param name - Product name
 * @returns The product document or null if not found
 */
const getProductByName = async (name) => {
    return Product_1.default.findOne({ name });
};
exports.getProductByName = getProductByName;
/**
 * Update a product's details
 * @param id - Product ID
 * @param updateData - Data to update
 * @returns The updated product document
 */
const updateProduct = async (id, updateData) => {
    return Product_1.default.findByIdAndUpdate(id, updateData, { new: true });
};
exports.updateProduct = updateProduct;
/**
 * Delete a product by ID
 * @param id - Product ID
 * @returns The deleted product document
 */
const deleteProduct = async (id) => {
    return Product_1.default.findByIdAndDelete(id);
};
exports.deleteProduct = deleteProduct;
