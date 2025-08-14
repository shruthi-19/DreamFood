require("dotenv").config();
const mongoose = require('mongoose');

// Replace with your actual MongoDB Atlas URI
const MONGO_URI = process.env.MONGO_URI;
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");

    const db = mongoose.connection.db;

    const foodItemsCollection = db.collection("food_items");
    const foodCategoryCollection = db.collection("food_category");

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.food_category = foodCategories;

    console.log("✅ Global food_items and food_category loaded");

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectToMongo;