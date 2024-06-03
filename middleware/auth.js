const authenticateUser = (req, res, next) => {
  if (!req.session.userID) {
    return res
      .status(401)
      .json({ message: "Log in to place orders and see the menu!" });
  }
  next();
};

module.exports = authenticateUser;
