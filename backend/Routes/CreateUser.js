const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysecretkey='MY name IS Shruthi AND I AM HAPPY';

// Create User Route
router.post('/createuser', [
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // ✅ Correct check
      return res.status(400).json({ errors: errors.array() });
    }
    
    const salt= bcrypt.genSaltSync(10);
    const secPassword = bcrypt.hashSync(req.body.password, salt);

    await User.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: secPassword
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

// Login Route
router.post('/loginuser', [
  body('email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // ✅ Correct check
      return res.status(400).json({ errors: errors.array() });
    }

    let userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      return res.status(400).json({ error: "Enter correct credentials" });
    }
    const pswdcompare = await bcrypt.compare(req.body.password, userData.password);
    if (!pswdcompare) {
      return res.status(400).json({ error: "Enter correct credentials" });
    }

    const data = {
      user: {
        id: userData.id
      }
    };

    const authToken = jwt.sign(data, 'mysecretkey');

    return res.json({ success: true ,authToken: authToken });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

module.exports = router;
