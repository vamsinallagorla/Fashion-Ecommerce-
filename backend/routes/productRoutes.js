const express=require("express");
const router=express.Router();

const{
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} =require("../controllers/productController");

router.post("/",addProduct);
router.get("/",getAllProducts);
router.get("/",getProductyById);
router.put("/",updateProduct);
router.delete("/",deleteProduct);
module.exports=router;