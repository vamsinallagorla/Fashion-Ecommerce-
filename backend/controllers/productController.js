const Product=require("../models/Product");

//Add Products
const addProduct=async(req,res)=>{
    try{
        const{
            name,
            price,
            category,
            description,
            image,
            stock
        }=req.body;

        const product=new Product({
            name,
            price,
            category,
            description,
            image,
            stock
        });
        await product.save();
        res.status(201).json({message:"Product Added Successfully",product});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//GetAll Products
const getAllProducts=async (req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
//get related products
const getRelatedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        });

        res.status(200).json(relatedProducts);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

//Get Product By Id
const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//Update Product
const updateProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new :true});
            
            if(!product){
                return res.status(404).json({message:"product not found"});
            }
            res.status(200).json({message:"product updated successfully",product});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//Delete Product
const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"product deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
module.exports={
    addProduct,
    getAllProducts,
    getRelatedProducts,
    getProductById,
    updateProduct,
    deleteProduct
};