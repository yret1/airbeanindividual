const { client } = require("../config/database");
const discountCheck = (req, res, next) => {
  if (req.session.cart && req.session.cart.length >= 1) {
    const database = client.db("Airbean");
    const discounts = database.collection("discounts");

    const isDiscount = discounts.findOne({ combo: req.session.cart });
    if (isDiscount) {
      req.session.discount = isDiscount.code;
      res.status(200).json({ message: "Discount applied" });
      next();
    }
  } else {
    next();
  }
};

module.exports = discountCheck;
