import express from "express";

import { getAllUsers, deleteUser,updateUser } from "../controllers/AdminController.js";
import { verifyAdmin,verifyToken } from "../utils/verifyUser.js";
const router=express.Router()

router.get("/users", verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);
router.put("/users/:id", verifyAdmin, updateUser);
export default router;
