const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Food Stock Schema:
// totalStock: Array of objects with food name, category, and quantity
// Categories: Array of objects with category name and array of food names
// fridge: holds individual food items with name, category, expiration date, but no quantity
// meant to have repeat foods

let foodStockSchema = new Schema({
totalStock:{
	type: [{
		foodName: String,
		category: String,
		quantity: Number,
		datesAdded: [Date],
	}]
},
categories: {
	type: [{
		categoryName: String,
		unifiedEmoji: String,
		foodNames: [String]
	}]
},
fridge: {
	type: [{
		foodName: String,
		category: String,
		expirationDate: Date
	}]
},

}, {
	collection: 'foodStock'
})

module.exports = mongoose.model('FoodStock', foodStockSchema)
