const router = require("express").Router();
const {makePayment} = require("../controllers/stripe");

router.post("/payment", makePayment);

module.exports = router;
