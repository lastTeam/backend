const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
