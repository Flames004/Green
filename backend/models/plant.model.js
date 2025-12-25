import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const plantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    category:{
        type: String,
        required: true,
        index: true
    },
    title:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        url:{
            type: String,
            required: true,
        },
        imageId:{
            type: String,
            required: true,
        }
    },
     images: [
    {
      url: {
        type: String,
        required: true
      },
      imageId: {
        type: String,
        required: true
      }
    }
  ],
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    height:{
        type: Number,
    },
    size:{
        type: String,
        enum:["small", "medium", "large", "extra_Large"],
        default:"small"
    },
    available:{
        type: Boolean,
        default: true
    },
    water:{
        type: String,
        required: true,
        enum:["Light", "Medium", "Heavy"]
    },
    light:{
        type: String,
        required: true,
        enum: ["Low Light", "Bright Sun", "Full Sun"]
    },
    carelevel:{
        type:String,
        required: true,
        enum:["Easy", "Medium", "Difficult"]
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isFeatured:{
        type: Boolean,
        default: true
    }
},{timestamps: true});

plantSchema.plugin(aggregatePaginate);


const Plant = mongoose.model("Plant", plantSchema);
export default Plant;