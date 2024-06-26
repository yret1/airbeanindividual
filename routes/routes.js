const app = require("express");
const router = app.Router();
const authenticateUser = require("../middleware/auth");
const adminCheck = require("../middleware/adminprotector");
const handleOrder = require("../middleware/orderHandler");
const controllers = require("../controllers/controllers");
const blockGuest = require("../middleware/guestmiddleware");
const discountCheck = require("../middleware/discountcontroll");

// Admin functions

router.post(
  "/addmenuitem",
  authenticateUser,
  adminCheck,
  controllers.addMenuItem
);
router.post(
  "/updatemenuitem",
  authenticateUser,
  adminCheck,
  controllers.updateMenuItem
);

router.post(
  "/deletemenuitem",
  authenticateUser,
  adminCheck,
  controllers.deleteMenuItem
);

router.post(
  "/creatediscount",
  authenticateUser,
  adminCheck,
  controllers.createDiscount
);
// User functions

router.get("/about", controllers.about);
router.post("/login", controllers.logIn);
router.post("/signup", controllers.signUp);
router.get("/guest", controllers.continueAsGuest);
router.get("/viewcart", authenticateUser, controllers.viewCart);
router.post(
  "/addtocart",
  authenticateUser,
  handleOrder,
  discountCheck,
  controllers.addToCart
);
router.post(
  "/removefromcart",
  authenticateUser,
  discountCheck,
  controllers.removeFromCart
);
router.get("/menu", authenticateUser, controllers.getMenu);

router.get("/create", authenticateUser, discountCheck, controllers.createOrder);
router.get(
  "/orderhistory",
  authenticateUser,
  blockGuest,
  controllers.getPreviousOrders
);

module.exports = router;
