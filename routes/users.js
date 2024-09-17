const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router()
const { authentication, isAdmin } = require("../middlewares/authentication");
const { imgLoad } = require("../middlewares/multer");

router.post('/',imgLoad,UserController.create);
router.post('/login',UserController.login);
router.put('/',authentication, imgLoad,UserController.update);
router.put("/resetPassword/:recoverToken", UserController.resetPassword);
router.put("/confirm/:email", UserController.confirm);;
router.get('/', authentication, UserController.userData);
router.get('/getAll', authentication, UserController.getAll);
router.get('/id/:_id', authentication, UserController.getById);
router.get('/getByName/', authentication, UserController.getUserByUsername);
router.get("/recoverPassword/:email", UserController.recoverPassword);
router.delete('/logout',authentication, UserController.logout);
router.delete('/deleteUser',authentication, UserController.delete);


module.exports = router;

