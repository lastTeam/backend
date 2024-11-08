const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: { name: true },
        },
        reviews: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: { name: true },
        },
        reviews: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
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
      ownerId,
    } = req.body;

    if (
      !title ||
      !description ||
      !sku ||
      !basePrice ||
      !categoryId ||
      !ownerId
    ) {
      return res.status(400).json({
        error:
          "Title, description, SKU, base price, category ID, and owner ID are required.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { sku: sku },
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "SKU already exists. Please use a unique SKU." });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        sku,
        basePrice: parseFloat(basePrice),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        colors: colors || {},
        variants: variants || {},
        images: images || {},
        category: { connect: { id: categoryId } },
        owner: { connect: { id: ownerId } },
      },
    });

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
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
      ownerId,
    } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the new SKU already exists (if SKU is being changed)
    if (sku !== existingProduct.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku: sku },
      });

      if (skuExists) {
        return res
          .status(400)
          .json({ error: "SKU already exists. Please use a unique SKU." });
      }
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        sku,
        basePrice: parseFloat(basePrice),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        colors: colors || {},
        variants: variants || {},
        images: images || {},
        categoryId: parseInt(categoryId),
      },
    });

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
