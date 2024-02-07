import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {userRoutes} from './routes/userRoutes.js';  // update import statement
// import { productRouter } from "./routes/productRoutes.js";
// import { subCategoryRouter } from "./routes/subCategoryRoutes.js";
// import { categoryRouter } from "./routes/categoryRoutes.js";
// import { orderRouter } from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();

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
app.use(express.static("images"));

app.use("/user",userRoutes);
// app.use("/product", productRouter);
// app.use("/subCategory", subCategoryRouter);
// app.use("/category", categoryRouter);
// app.use("/order", orderRouter);

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
