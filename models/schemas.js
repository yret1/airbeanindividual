const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  created_at: {
    type: String,
    default: Date.now(),
  },

  orderID: {
    type: String,
    required: true,
  },

  cart: {
    type: Array,
    required: true,
  },

  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
