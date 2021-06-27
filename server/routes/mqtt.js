const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const model = require('../models/Mqtt')

// @route GET api/testmqtts
// @desc Get mqtt
// @access Private
const now = new Date();
const Day =now.getDay()
router.get('/', verifyToken, async (req, res) => {
	try {
		
		const SimData = await model.SimData.find() ///{createdAt:new Date.getDay()}
		
		console.log(SimData)
		res.json({ success: true, SimData})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
module.exports = router