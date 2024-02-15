import mongoose from "mongoose";
import slugify from "slugify";

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
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

subCategoryModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const SubCategorySchema = mongoose.model(
  "SubCategorySchema",
  subCategoryModelSchema
);

export default SubCategorySchema;
