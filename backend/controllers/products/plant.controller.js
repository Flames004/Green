import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import Plant from '../../models/plant.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';




const getAllPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query= {};

    const { search, available, featured, category } = req.query;

    if(search){
       query.$or = [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" }},
            { description: { $regex: search, $options: "i"}}
       ]
    }

    if(available){
        query.available = available === "true";
    }

    if(category){
        query.category = category;
    }

    if(featured){
        query.isFeatured = featured === "true";
    }

    const pipeline = [
        { $match: query},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Plant.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All plants fetched successfully",
            true,
            result
        )
    )
    
});




export {
    getAllPlants,
}