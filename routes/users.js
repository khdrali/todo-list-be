const router = require("express").Router();
const userController = require("../controller/users");
const loginController = require("../controller/login");
const { validateToken } = require("../middlewares/token");

router.get("/:id?", validateToken, userController.userAll);
router.get("/get/:id", validateToken, userController.userById);
router.post("/add/data", userController.CreateUser);
router.post("/auth/login", loginController.Login);
router.patch("/data/edit/:id", validateToken, userController.updateUser);
router.delete("/data/delete/:id", validateToken, userController.deleteUser);
module.exports = router;
