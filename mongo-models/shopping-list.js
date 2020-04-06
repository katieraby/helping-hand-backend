const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
  orderStatus: { type: String, required: true, default: 'pending' },
  dateCreated: { type: Date, default: Date.now, required: true },
  helpee: { type: Schema.Types.ObjectId, ref: 'Helpee', required: true },
  volunteer: { type: Schema.Types.ObjectId, ref: 'Volunteer', required: false },
  listImage: { type: String, required: false },
  listText: [{ type: String, required: false }],
});

module.exports = { shoppingListSchema };
