const { PrismaClient } = require('@prisma/client');
const prod = new PrismaClient ()

const getProductBytitle = async (req,res) =>{
    const {title} =req.params

    try {
        const product = await prod.product.findMany({where : {title}})
        
        if (!product) {
            return res.status(404).json({error : "product is not found !"})
        }
        res.json(product)
    } catch (err) {
        console.log(err);

        res.status(500).json({error : "failed to retrieve product !"})
    }
}
module.exports = getProductBytitle