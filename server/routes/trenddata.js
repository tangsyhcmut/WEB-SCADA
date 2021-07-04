const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Data = require("../models/DataSchema");

// @route GET api/data
// @desc Get mqtt
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {const TrendData = await Data.find().limit(10) ///{createdAt:new Date.getDay()}
  const sendTrendData = TrendData.reverse()
  res.json({ success: true, sendTrendData})
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;