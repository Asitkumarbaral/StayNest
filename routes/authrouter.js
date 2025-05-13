const express=require('express')
const authRouter=express.Router();
const AuthController=require('../controllers/Auth.controller');
authRouter.get('/login',AuthController.getLogin);
authRouter.post('/login',AuthController.postLogin);
authRouter.post('/logout',AuthController.postLogout);
module.exports=authRouter;
