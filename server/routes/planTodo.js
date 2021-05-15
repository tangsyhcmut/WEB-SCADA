const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Plan = require('../models/PlanTodo')

// @route GET api/plans
// @desc Get plans
// @access Private
router.get('/', verifyToken, async (req, res) => {
	try {
		const plans = await Plan.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, plans })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { title, description,status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newPlan = new Plan({
			title,
			description,
            status: status||'DONE',
			user: req.userId
		})

		await newPlan.save()

		res.json({ success: true, message: 'Create success!', plan: newPlan })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/plans
// @desc Update plan
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description,status} = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedPlan = {
			title,
			description: description||'',
            status: status||'TO DO'
			
		}

		const planUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPlan = await Plan.findOneAndUpdate(
			planUpdateCondition,
			updatedPlan,
			{ new: true }
		)

		// User not authorised to update plan or plan not found
		if (!updatedPlan)
			return res.status(401).json({
				success: false,
				message: 'Plan not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			plan: updatedPlan
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const planDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPlan = await Plan.findOneAndDelete(planDeleteCondition)

		// User not authorised or post not found
		if (!deletedPlan)
			return res.status(401).json({
				success: false,
				message: 'Plan not found or user not authorised'
			})

		res.json({ success: true, plan: deletedPlan })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router