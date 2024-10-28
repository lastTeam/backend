const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      sku,
      basePrice,
      discountPrice,
      colors,
      variants,
      images,
      categoryId,
    } = req.body;

    // Validate the received data
    if (!title || !description || !sku || !basePrice || !categoryId) {
      return res.status(400).json({
        error:
          "Title, description, SKU, base price, and category ID are required.",
      });
    }

    // Check if product with the same SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: sku },
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "SKU already exists. Please use a unique SKU." });
    }

    // Ensure basePrice and discountPrice are decimals
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        sku,
        basePrice: parseFloat(basePrice),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        colors: colors || null,
        variants: variants || null,
        images: images || null,
        category: { connect: { id: categoryId } },
      },
    });

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // Get the ID from the route params
    await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
