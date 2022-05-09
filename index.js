import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import { DBconnect } from "./config/database.js";

dotenv.config();
DBconnect();
const app = express();

app.use(cors());
app.use(helmet());
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
