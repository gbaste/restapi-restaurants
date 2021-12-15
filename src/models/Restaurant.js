import { Schema, model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: String,
    reviews: {
      score: Number,
      comment: {
        type: String,
        trim: true,
      },
    },
    food_type: {
      type: String,
      required: true,
      trim: true,
    },
    address: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    open_hours: [
      {
        open_time: String,
        close_time: String,
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
restaurantSchema.plugin(mongoosePagination);
module.exports = model("Restaurant", restaurantSchema);
