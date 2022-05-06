const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/tokenAuth");
const {
  create,
  update,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cart");



router.post("/", verifyToken, create);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
