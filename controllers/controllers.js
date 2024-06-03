const { client } = require("../config/database");

const crypto = require("node:crypto");

let userID = null;

exports.createOrder = async (req, res) => {
  if (userID !== null && userID !== undefined) {
    res.status(200).json("Log in to place orders");
    return;
  }

  const data = await req.body;
  try {
    const database = client.db("Airbean");
    const menu = database.collection("Menu");
    const orders = database.collection("Orders");

    const order = data.order;

    const userId = data.order;

    for (item in order) {
      console.log(item);
    }

    const Confirm = "Tack för din beställning! Kaffe och kaka på väg";

    res.status(200).json({ message: Confirm });
  } catch (error) {
    res.status(500).json({ message: "Error order failed " + error });
  }
};

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
        userID = findUser.username;

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

      userID = shiftedUser;
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
