const Cart = require("../models/Cart");
//Add to Cart
const addToCart = async (req, res) => {
    try {
        const { user, product, quantity } = req.body;

        const cart = new Cart({
            user,
            product,
            quantity
        });

        await cart.save();

        res.status(201).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};
//Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({
            user: req.params.userId
        }).populate("product");

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};
//Remove From Cart
const removeFromCart = async (req, res) => {
    try{
        const cartItem =await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"product removed from cart",});

    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
module.exports={
    addToCart,
    getCart,
    removeFromCart
};