import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import uploadImages from '../../services/uploads.service.js';
import Plant from '../../models/plant.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';




const getAllPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
        { $match: {available: true}},
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