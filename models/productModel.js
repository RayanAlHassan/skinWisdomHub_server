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
      enum: ["Dry", "Oily", "Mix","All Skin"],
      required: true,
    },
    ingrediantsID:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingrediant",
      required: true,
      autopopulate: true,
    }]
  },
  { timestamps: true }
);
productModelSchema.plugin(mongooseAutoPopulate);
const ProductSchema = mongoose.model('ProductSchema', productModelSchema);

export default ProductSchema;
