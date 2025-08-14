const express = require('express');
const router = express.Router();

router.post('/displaydata', async (req, res) => {
  try {
    const foodItems = global.food_items;
    const foodCategory = global.food_category;

    if (!foodItems || !foodCategory) {
      return res.status(500).json({ error: "Data not loaded in memory" });
    }

    console.log("✅ Food items and categories sent successfully");
    res.status(200).json({ foodItems, foodCategory });

  } catch (error) {
    console.error("❌ Error fetching food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
