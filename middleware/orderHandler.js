const { client } = require("../config/database");

const handleOrder = (req, res, next) => {
  const details = req.body;

  const order = details.order;

  const keys = Object.keys(order);

  const database = client.db("Airbean");
  const menu = database.collection("Menu");

  let validOrder = true;

  keys.forEach((key) => {
    const id = Number(key);
    const item = menu.findOne({ id: id });

    if (item.title) {
      return;
    } else {
      validOrder = false;
      res.status(404).json({
        message:
          "One or more of your products didnt exist. Place a valid order",
      });
    }
  });

  if (validOrder) {
    next();
  } else {
    return;
  }
};

module.exports = handleOrder;
