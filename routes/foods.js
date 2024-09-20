const express = require('express');
const FoodController = require('../controllers/FoodController');
const router = express.Router();
const { authentication } = require("../middlewares/authentication");
const { imgLoad } = require('../middlewares/multer');

router.post("/", authentication, imgLoad, FoodController.create);

module.exports = router;