const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

//  /admin/add-product => GET
router.get("/add-product", adminController.getAddProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

module.exports = router;
