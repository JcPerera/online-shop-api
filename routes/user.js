const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/tokenAuth");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserStats,
} = require("../controllers/user");
const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
