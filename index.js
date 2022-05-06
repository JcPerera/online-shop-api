const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require('helmet')

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");


dotenv.config();
// need to initialize .env before mongoose, so we can use env variables inside db config
require("./config/database").connect();

const app = express();
app.use(cors());
app.use(helmet())
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
