const mongoose = require("mongoose")

const IngredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String
})

const RecipeSchema = new mongoose.Schema({
    creator: String,
    creator_name: String,
    date_created: String,
    dish_name: String,
    serving_size: Number,
    ingredients: [IngredientSchema],
    steps: [String],
    image_id: String,
    tips: String,
    reported: Number,
    saved_by: [mongoose.SchemaTypes.ObjectId]
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe };