const app = require("express");
const router = app.Router();
const authenticateUser = require("../middleware/auth");
const handleOrder = require("../middleware/orderHandler");
const guestmw = require("../middleware/guestmiddleware");
const controllers = require("../controllers/controllers");

router.get("/", controllers.landing);

router.post("/login", controllers.logIn);
router.post("/signup", controllers.signUp);
router.get("/guest", controllers.continueAsGuest);

router.get("/menu", authenticateUser, controllers.getMenu);

router.post("/create", authenticateUser, handleOrder, controllers.createOrder);

module.exports = router;
