const app = require("express");
const router = app.Router();
const controllers = require("../controllers/controllers");

router.get("/", controllers.landing);

router.post("/login", controllers.logIn);
router.post("/signup", controllers.signUp);

router.get("/menu", controllers.getMenu);

router.post("/create", controllers.createOrder);

module.exports = router;
