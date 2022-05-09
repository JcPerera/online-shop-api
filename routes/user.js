import express from "express";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/tokenAuth.js";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserStats,
} from "../controllers/user.js";

const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;
