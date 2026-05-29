import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../models/productModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const getImageUrl = (req) => {
  if (!req.file) {
    return null;
  }

  return `/uploads/${req.file.filename}`;
};

export const createProduct = async (req, res, next) => {
  const { title, description, price, category, stock } = req.body;

  try {
    if (!title || !description || !price || !category) {
      return handleResponse(
        res,
        400,
        "Title, description, price, and category are required"
      );
    }

    if (Number(price) <= 0) {
      return handleResponse(res, 400, "Price must be greater than 0");
    }

    if (stock !== undefined && Number(stock) < 0) {
      return handleResponse(res, 400, "Stock cannot be negative");
    }

    const image_url = getImageUrl(req);

    const product = await createProductService(
      title,
      description,
      image_url,
      price,
      category,
      stock || 0
    );

    return handleResponse(res, 201, "Product created successfully", product);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();

    return handleResponse(res, 200, "Products fetched successfully", products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(id);

    if (!product) {
      return handleResponse(res, 404, "Product not found");
    }

    return handleResponse(res, 200, "Product fetched successfully", product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, category, stock, old_image_url } = req.body;

  try {
    if (!title || !description || !price || !category) {
      return handleResponse(
        res,
        400,
        "Title, description, price, and category are required"
      );
    }

    if (Number(price) <= 0) {
      return handleResponse(res, 400, "Price must be greater than 0");
    }

    if (stock !== undefined && Number(stock) < 0) {
      return handleResponse(res, 400, "Stock cannot be negative");
    }

    const newImageUrl = getImageUrl(req);
    const image_url = newImageUrl || old_image_url || null;

    const updatedProduct = await updateProductService(
      id,
      title,
      description,
      image_url,
      price,
      category,
      stock || 0
    );

    if (!updatedProduct) {
      return handleResponse(res, 404, "Product not found");
    }

    return handleResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deleteProductService(id);

    if (!deletedProduct) {
      return handleResponse(res, 404, "Product not found");
    }

    return handleResponse(res, 200, "Product deleted successfully", deletedProduct);
  } catch (err) {
    next(err);
  }
};