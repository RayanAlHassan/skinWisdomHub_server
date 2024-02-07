import express from "express";
import { google } from "../controllers/Auth.controller.js";
const router = express.Router();

// Route for Google authentication
router.post("/auth", google);

export default router;
