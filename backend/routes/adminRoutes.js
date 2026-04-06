import express from "express";
import { getDashboardStats, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);

export default router;