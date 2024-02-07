import express from "express";
import {
  createUser,
  showAllUsers,
  showOneUser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
  loggedInUser,
} from "../controllers/userControler.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";

const userRoutes = express.Router();

// Create a user
userRoutes.post("/create", upload.single("image"), createUser);
// Show all users
userRoutes.get("/view-all",showAllUsers);
// Show one user
userRoutes.get("/view-one/:id", showOneUser);
// Update a user
userRoutes.patch(
  "/update/:id",
  authenticateUser,
  upload.single("image"),
  updateUser
);

// Delete a user
userRoutes.delete(
  "/delete",
  authenticateUser,
  authorizeUser(["admin"]),
  deleteUser
);

// Login user
userRoutes.post("/login", loginUser, loggedInUser);
userRoutes.post("/logout", logout);

export { userRoutes };
