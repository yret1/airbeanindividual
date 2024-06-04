const { client } = require("../config/database");

const crypto = require("node:crypto");

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

exports.createOrder = async (req, res) => {
  const data = req.body;

  try {
    const database = client.db("Airbean");
    const menu = database.collection("Menu");
    const orders = database.collection("Orders");

    const order = data.order;
    const userId = req.session.userID;
    const itemsInCart = [];
    let billed = 0;

    const keys = Object.keys(order);

    for (const key of keys) {
      const id = Number(key);
      const quantity = Number(order[key]);

      const item = await menu.findOne({ id: id });

      if (!item) {
        return res.status(404).json({
          message: `Item with id ${id} not found in menu.`,
        });
      }

      item.quantity = quantity;
      const totalPrice = item.price * item.quantity;
      billed += totalPrice;

      itemsInCart.push(item);
    }

    const randomString = generateRandomString(8);
    const orderID = `${userId}${randomString}`;

    await orders.insertOne({
      ordernumber: orderID,
      placed_at: new Date().toDateString(),
      coffeeOrdered: itemsInCart,
      billed: `${billed} SEK`,
    });

    const confirmMessage = `Tack för din beställning! Ditt orderId = ${orderID}`;

    res.status(200).json({ message: confirmMessage });
  } catch (error) {
    res.status(500).json({ message: "Error order failed: " + error.message });
  }
};

exports.getPreviousOrders = async (req, res) => {};

exports.getMenu = async (req, res) => {
  try {
    const database = client.db("Airbean");
    const menuCollection = database.collection("Menu");

    const fullMenu = await menuCollection.find({}).toArray();

    res.status(200).json({ menuItems: fullMenu });
  } catch (err) {
    console.log("Error fetching menu:", err);
    res.status(500).json({ message: "Error fetching menu: " + err });
  }
};

exports.logIn = async (req, res) => {
  const details = req.body;

  try {
    const user = crypto
      .createHash("sha256")
      .update(details.username)
      .digest("hex");

    const pass = crypto
      .createHash("sha256")
      .update(details.password)
      .digest("hex");

    const shiftedUser = user.slice(5) + user.slice(0, 5);
    const shiftedPass = pass.slice(5) + pass.slice(0, 5);

    const database = client.db("Airbean");
    const userbase = database.collection("Users");

    const findUser = await userbase.findOne({ username: shiftedUser });

    if (findUser.username) {
      if (shiftedPass === findUser.password) {
        req.session.userID = findUser.username;

        res.status(200).json("Logged in!");
      } else {
        res.status(200).json("Wrong password");
      }
    } else {
      res.status(200).json("No user found, please create an account!");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.signUp = async (req, res) => {
  const details = req.body;

  try {
    const user = crypto
      .createHash("sha256")
      .update(details.username)
      .digest("hex");

    const pass = crypto
      .createHash("sha256")
      .update(details.password)
      .digest("hex");

    const email = details.email;

    const shiftedUser = user.slice(5) + user.slice(0, 5);
    const shiftedPass = pass.slice(5) + pass.slice(0, 5);

    const database = client.db("Airbean");
    const userbase = database.collection("Users");

    const findUser = await userbase.findOne({ username: shiftedUser });

    if (findUser) {
      res.status(200).json("User already exists. Please log in!");
    } else {
      const createUser = await userbase.insertOne({
        username: shiftedUser,
        password: shiftedPass,
        email: email,
      });

      req.session.userID = shiftedUser;
      res.status(200).json(`Welcome to airbean ${details.username}!`);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.landing = async (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<!DOCTYPE html><html><head><title>Landing Page</title></head><body><h1>To order, send your details to /login or /signup. The console will show the way!</h1></body></html>"
  );
  res.end();
};
