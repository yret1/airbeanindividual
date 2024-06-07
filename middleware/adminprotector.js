const { client } = require("../config/database");

const adminCheck = async (req, res, next) => {
  const database = client.db("Airbean");
  const users = database.collection("Users");
  const admin = await users.findOne({ username: req.session.userID });

  if (admin && admin.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json(`You are not an admin, access denied! Current role: ${admin.role}`);
  }
};

module.exports = adminCheck;
