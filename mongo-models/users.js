const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  postcode: { type: String, required: true },
  streetAddress: { type: String, required: false },
  city: { type: String, required: false },
  distanceToTravel: { type: Number, required: false, default: 5 },
  profilePhoto: { type: String, required: false },
  shoppingListId: [{ type: Schema.Types.ObjectId, ref: 'ShoppingList' }],
  userType: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
