const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  distanceToTravel: { type: Number, required: true },
  profilePhoto: { type: String, required: false },
  shoppingListId: [{ type: Schema.Types.ObjectId, ref: "ShoppingList" }],
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
