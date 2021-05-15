const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlanSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	status: {
		type: String,
		enum: ['TO DO', 'DOING', 'DONE']
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
    createdAt:{
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('plans', PlanSchema)