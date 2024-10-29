const { PrismaClient } = require('@prisma/client');
const prod = new PrismaClient ()
const getProductById = async (req,res) =>{
    const {id} =req.params
    try {
        const product = await prod.findById(id)
        if (!product) {
            return res.status(404).json({error : "product is not found !"})
        }
        res.json(product)
    } catch (err) {
        res.status(500).json({error : "failed to retrieve product !"})
    }
}
module.exports = getProductById