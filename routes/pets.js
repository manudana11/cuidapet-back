const express = require('express');
const PetController = require('../controllers/PetController');
const router = express.Router();
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const { imgLoad } = require('../middlewares/multer');


router.post("/", authentication, imgLoad, PetController.create);
router.get("/", authentication, PetController.getInfoByOwner);
router.get("/getById/:id", PetController.getById);

module.exports = router;