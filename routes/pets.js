const express = require('express');
const PetController = require('../controllers/PetController');
const router = express.Router();
const { authentication, isAdmin, isYourPet } = require("../middlewares/authentication");
const { imgLoad } = require('../middlewares/multer');


router.post("/", authentication, imgLoad, PetController.create);
router.put("/id/:id", authentication, isYourPet, imgLoad, PetController.update);
router.put("/addDocument/:id", authentication, isYourPet, imgLoad, PetController.addDocument);
router.put("/addFood/:id", authentication, isYourPet, PetController.addFood);
router.put("/startWalk/:id", authentication, isYourPet, PetController.startWalk);
router.put("/endWalk/:id", authentication, isYourPet, PetController.endWalk);
router.get("/getById/:id", PetController.getById);
router.delete("/deletePet/:id", authentication, isYourPet, PetController.delete);

module.exports = router;