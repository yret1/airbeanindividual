const app = require("express");
const router = app.Router();
const controllers = require("../controllers/controllers");

router.post("/create", controllers.createOrder);
router.get("/menu", controllers.getMenu);

module.exports = router;
