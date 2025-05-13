const express=require('express')
const path=require('path');
const userRouter=express.Router();

const storeController= require('../controllers/store.controller');

userRouter.get("/",storeController.getindex)  
userRouter.get("/index",storeController.homepage)
userRouter.get("/favourite-list",storeController.getfavlist)
userRouter.get("/bookings",storeController.getbookings)
userRouter.get("/homes/:homesId",storeController.getHomedetails)
userRouter.post("/favourite/:homesId",storeController.postAddfavorite);
userRouter.post("/remove-home/:homeId",storeController.removeHome);
module.exports=userRouter;
