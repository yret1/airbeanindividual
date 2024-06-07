const { client } = require("../config/database");

const discountCheck = async (req, res, next) => {
  if (req.session.cart && req.session.cart.length >= 1) {
    const database = client.db("Airbean");
    const discounts = database.collection("Discounts");

    try {
      const discountList = await discounts.find().toArray();
      let foundDiscount = null;

      discountList.forEach((discount) => {
        const comboIds = discount.combo.map((item) => item.id);
        const cartIds = req.session.cart.map((item) => item.id);

        if (comboIds.every((id) => cartIds.includes(id))) {
          foundDiscount = discount;
        }
      });

      if (foundDiscount) {
        req.session.discount = foundDiscount.code;
      }
    } catch (error) {
      console.error("Error checking discounts:", error);
    }
  }

  next();
};

module.exports = discountCheck;
