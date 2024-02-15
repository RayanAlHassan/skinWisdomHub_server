import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const productModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
      required: true,
      autopopulate: true,
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategorySchema",
      required: false,
      autopopulate: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    skinType: {
      type: String,
      enum: ["oil", "mix", "dry"],
      required: true,
    },
    ingrediants:[{ingrediantsID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ingrediantSchema",
      required: false,
      autopopulate: true,
    }}]
  },
  { timestamps: true }
);
productModelSchema.plugin(mongooseAutoPopulate);
const ProductSchema = mongoose.model('ProductSchema', productModelSchema);

export default ProductSchema;

