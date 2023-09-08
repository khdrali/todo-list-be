const router = require("express").Router();
const db = require("../db");
const dataController = require("../controller/data");
const { validateToken } = require("../middlewares/token");

router.get("/:id?", dataController.dataAll);
router.post("/add/list", validateToken, dataController.getCreateData);
router.patch("/list/edit/:id", validateToken, dataController.getUpdateData);
router.delete("/list/delete/:id", validateToken, dataController.getDeleteData);

module.exports = router;
