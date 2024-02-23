import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.js"; // update import statement
import { productRoutes } from "./routes/productRoutes.js";
import { subCategoryRoutes } from "./routes/subCategoryRoutes.js";
// import { categoryRoutes } from "./routes/categoryRouter.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import ratingRoutes from "./routes/RatingRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
import reviewRoutes from "./routes/ReviewRoutes.js";
import ingrediantRoutes from "./routes/IngrediantsRoutes.js";
import testimoniolRoutes from "./routes/testimonilRoutes.js";
// express app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();
app.use(express.static("Public"));
// app.use("/images", express.static("images"));

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/category", categoryRoutes);
app.use("/rate", ratingRoutes);
app.use("/reviews", reviewRoutes);
app.use("/testimoniol", testimoniolRoutes);
app.use("/ingrediants", ingrediantRoutes);
app.use("/Public/images", express.static('images'))