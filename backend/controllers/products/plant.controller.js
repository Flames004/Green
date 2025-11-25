import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import uploadImages from '../../services/uploads.service.js';
import Plant from '../../models/plant.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';


const addPlant = asyncHandler( async(req, res) =>{
    const {name, category, price, description, stock} = req.body;

    if(!name || !category || !price || !description || !stock ){
        throw new ApiError(400, "All fields are required")
    }


    if (!req.files || !req.files.images || req.files.images.length === 0) {
        throw new ApiError(400, "Images are required");
    }


    const uploadResults = await uploadImages(req.files.images);
    const imageUrls = uploadResults.map((image) => image.url);

    const thumbUrl = imageUrls[0];

    const plant = await Plant.create({
        name,
        category,
        price,
        description,
        stock,
        thumbnail: thumbUrl,
        images:imageUrls
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant Added successfully",
            true,
            plant
        )
    );

});

const getAllPlants = asyncHandler( async(req,res) =>{

    const plants = await Plant.find({})
});




export {
    addPlant
}