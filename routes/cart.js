import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/tokenAuth.js";
import {
  create,
  update,
  deleteCart,
  getUserCart,
  getAllCarts,
} from "../controllers/cart.js";

const router = express.Router();

router.post("/", verifyToken, create);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);

export default router;
