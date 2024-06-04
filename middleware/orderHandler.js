const { client } = require("../config/database");

const handleOrder = async (req, res, next) => {
  const details = req.body;
  const order = details.order;
  const keys = Object.keys(order);

  const database = client.db("Airbean");
  const menu = database.collection("Menu");

  let validOrder = true;

  for (const key of keys) {
    const id = Number(key);
    try {
      const item = await menu.findOne({ id: id });
      if (!item || !item.title) {
        validOrder = false;
        res.status(404).json({
          message:
            "One or more of your products didn't exist. Place a valid order",
        });
        return;
      }
    } catch (error) {
      validOrder = false;
      res.status(500).json({
        message: "An error occurred while validating the order.",
      });
      return;
    }
  }

  if (validOrder) {
    next();
  }
};

module.exports = handleOrder;
