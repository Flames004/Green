import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import mongoose from 'mongoose';
import Review from '../models/review.models.js';
import {ApiResponse} from '../utils/ApiResponse.js'

const addReview = asyncHandler( async(req,res) =>{
    const  {rating, review} = req.body;
    const userId = req.user?._id;

    const {productId} = req.params;

    if(!rating || review > 1 || review < 5){
        throw new ApiError(400, "Review must between 1 and 5");
    }

    if(!productId || !mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(400, "ProductId required");
    }

    const existingReview = await Review.findOne({
        user: userId,
        product: productId
    });

    if(existingReview){
        throw new ApiError(409, "You already have review for this product");
    }


    const newReview = await Review.create({
        user: userId,
        product: productId,
        rating,
        review
    });

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "Review Added successfully",
            true,
            newReview
        )
    )

});

const getReviews = asyncHandler( async(req,res) =>{
    const {productId} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(401, "Invalid ProductId");
    }

    const reviews = await Review.find({product: productId})
    .populate("user", "name")
    .sort({createdAt: -1});
    

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "Review fetched succesfully",
            true,
            reviews
        )
    )
});

const removeReview = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;
    const {reviewId} = req.params;

    if(!reviewId){
        throw new ApiError(400, "Review Id required")
    }

    const deletedReview = await Review.findByIdAndDelete({
        user: userId,
        _id: reviewId
    });

    if (!deletedReview) {
    throw new ApiError(404, "Review not found or not authorized");
  }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "review deleted",
            true,
        )
    )
});

export {
    addReview,
    getReviews,
    removeReview
}