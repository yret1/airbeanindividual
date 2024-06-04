const { client } = require("../config/database");

const handleOrder = async (req, res, next) => {
  const details = req.body;
  const order = details.order;

  const database = client.db("Airbean");
  const menu = database.collection("Menu");

  let validOrder = true;

  order.map(async (order) => {
    const item = await menu.findOne({ id: order.id });

    if (!item) {
      validOrder = false;
      res
        .status(401)
        .json("One or more items in your order went missing. Try again!");
      return;
    }
  });

  if (validOrder) {
    next();
  }
};

module.exports = handleOrder;
