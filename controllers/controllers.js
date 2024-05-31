const connectToMongoDB = require("../config/database");

exports.createOrder = async (req, res) => {
  try {
    const orderInit = new order(req.body);
    const order = await orderInit.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error order failed " + error });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const client = await connectToMongoDB();

    const menu = await client.db("Airbean").collection("Menu");

    const fullMenu = await menu.find({}).toArray();

    res.status(200).json({ menuItems: fullMenu });
  } catch (err) {
    console.log("Oops");
    res.status(500).json();
  }
};
