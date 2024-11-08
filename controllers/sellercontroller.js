const { PrismaClient } = require('@prisma/client');
const product1 = new PrismaClient ()


const Add = async (req , res)=>{
try{
const {title,description,basePrice,images} = req.body
const sellerId = req.user.id 
const newProduct = await product1.create({
    title,
    description,
    basePrice,
    images,
    sellerId,
});
res.status(201).json({ message: 'Product added successfully', product: newProduct });
} catch (err){
    res.status(500).json({ error: 'Failed to add product', details: err.message });
}
}
module.exports= Add