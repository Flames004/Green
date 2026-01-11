import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addToCart = asyncHandler( async (req,res) => {

    const userId = req.user?._id;
    const { quantity , productId }  = req.body;

    if(!userId){
        throw new ApiError(401, "Unauthorized");
    }

    if(!quantity || !productId){
        throw new ApiError(400, "Quantity and ProductId are required");
    }

    const qty = parseInt(quantity);
    if(isNaN(qty) || qty <= 0){
        throw new ApiError(400, "Quantity must be a positive number");
    }

    if(!mongoose.isValidObjectId(productId)){
        throw new ApiError(400, "Invalid ProductId");
    }

    const product = await Product.findOne({
        _id: productId,
        available :true
    });
    if(!product){
        throw new ApiError(404, "Product not found or unavialable");
    }

    if(qty > product.stock){
        throw new ApiError(404, "Requested quantity not available in stock");
    }

    let cart = await Cart.findOne({ user: userId  });
    if(!cart){
        cart = new Cart({ 
            user:userId, 
            items: [] 
        });
    }

    const existingItems = cart.items.find((i) =>  i.productId.toString() === productId);

    if(existingItems){

        const newQty = existingItems.quantity + qty;
        if(newQty > product.stock){
            throw new ApiError(409, "quantity exceeds available stock")
        }

        existingItems.quantity = newQty;
    }else{
        cart.items.push({
            productId,
            quantity: qty
        })
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Item added to cart",
            true,
            cart
        )
    )

});

const quantityUpdate = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;
    const { quantity, productId } = req.body;

    if(!userId){
        throw new ApiError(401, "Unauthorized Access");
    }

    if(!quantity || !productId) {
        throw new ApiError(400, "Quantity and ProductIs  are required")
    }

    const qty = parseInt(quantity);
    if(isNaN(qty) || qty < 1){
        throw new ApiError(400, "Quantity must be atleast 1")
    }


    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(400, "Invalid productId")
    }

    const cart = await Cart.findOne({user: userId});
    if(!cart){
        throw new ApiError(404, "Cart Not Found");
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
    throw new ApiError(404, "Product not found in cart");
    }

    const product = await Product.findById(productId);
    if (!product || !product.available) {
    throw new ApiError(404, "Product not available");
    }

    if(qty > product.stock){
        throw new ApiError(409, "quanity excedding the stock")
    }

    item.quantity = qty;
    await cart.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "cart updated successfully",
            true,
            cart
        )
    )

});

const removeItem = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;
    const {productId} = req.body;

    if(!userId){
        throw new ApiError(409, "Unauthorized Access");
    }

    if(!productId){
        throw new ApiError(400, "ProductId also required");
    }
    
});

export {
    addToCart,
    quantityUpdate
}