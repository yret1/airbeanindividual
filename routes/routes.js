const app = require("express");
const router = app.Router();
const authenticateUser = require("../middleware/auth");
const adminCheck = require("../middleware/adminprotector");
const handleOrder = require("../middleware/orderHandler");
const guestmw = require("../middleware/guestmiddleware");
const controllers = require("../controllers/controllers");
const blockGuest = require("../middleware/guestmiddleware");

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
// User functions

router.get("/about", controllers.about);
router.post("/login", controllers.logIn);
router.post("/signup", controllers.signUp);
router.get("/guest", controllers.continueAsGuest);
router.get("/viewcart", authenticateUser, controllers.viewCart);
router.post("/addtocart", authenticateUser, handleOrder, controllers.addToCart);
router.post("/removefromcart", authenticateUser, controllers.removeFromCart);
router.get("/menu", authenticateUser, controllers.getMenu);

router.get("/create", authenticateUser, controllers.createOrder);
router.get(
  "/orderhistory",
  authenticateUser,
  blockGuest,
  controllers.getPreviousOrders
);

module.exports = router;
