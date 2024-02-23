import mongoose from "mongoose";

const subCategoryModelSchema = new mongoose.Schema(
  {
  
    name: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
      required: true,
    },

  },
  { timestamps: true }
);



const SubCategorySchema = mongoose.model(
  "SubCategorySchema",
  subCategoryModelSchema
);

export default SubCategorySchema;
