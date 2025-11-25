import { imagekit } from "../config.js/imageKit.js";

const uploadImages = async(files) =>{
    try {
        const uploads = files.map((file) => 
            imagekit.upload({
                file: file.buffer,
                fileName: `${Date.now()}-${Math.random()}-${file.originalname}`,
            })
        );

        return Promise.all(uploads);
    } catch (error) {
        console.log("Error in uploading images", error);
        
    }
};

export default uploadImages;