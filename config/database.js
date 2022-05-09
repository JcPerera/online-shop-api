import mongoose from "mongoose";

export const DBconnect = async () => {
  const { MONGO_URL } = process.env;
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error DB Connection Failed");
    process.exit(1);
  }
};
