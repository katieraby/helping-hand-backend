const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema(
  {
    orderStatus: { type: String, required: true, default: "pending" },
    helpee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: "User", required: false },
    listImage: { type: String, required: false },
    listText: [{ type: String, required: false }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShoppingList", shoppingListSchema);
