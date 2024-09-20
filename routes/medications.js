const express = require('express');
const MedicationController = require('../controllers/MedicationController');
const router = express.Router();
const { authentication, isDoctor } = require("../middlewares/authentication");
const { imgLoad } = require('../middlewares/multer');

router.post("/", authentication, imgLoad, isDoctor, MedicationController.create);

module.exports = router;