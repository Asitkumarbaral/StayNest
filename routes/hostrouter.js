const express=require('express')
const hostRouter=express.Router();
const path=require('path');
const rootDir=require('../utils/path.utils')
const hostcontroller=require('../controllers/host.controller')
hostRouter.get("/add-home",hostcontroller.getAddHome)

 hostRouter.post("/add-home",hostcontroller.postAddHome)

 hostRouter.get("/home-list",hostcontroller.gethostHome);
 hostRouter.get("/edit-home/:homeId",hostcontroller.getEdithome)
 //edit home 
 hostRouter.post("/edit-home",hostcontroller.postEdithome)
 //delete home
 hostRouter.post("/home-delete/:homeId",hostcontroller.postDeleteHome);
  exports.hostRouter=hostRouter;
 
  