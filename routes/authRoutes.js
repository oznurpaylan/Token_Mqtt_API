const { Router } = require("express");
const authController=require('../controllers/authControllers');
const routes=Router();

routes.get('/',authController.loginGet);
routes.get('/signup',authController.signupGet);
routes.get('/logout',authController.logoutGet);

routes.post('/',authController.loginPost);
routes.post('/signup',authController.signupPost);
routes.post('/location',authController.locationPost);
routes.post('/data',authController.dataPost);

module.exports=routes;