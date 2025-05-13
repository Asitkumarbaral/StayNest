const Home= require("../models/home.models")
const Favhome=require("../models/favorite.model")
const {ObjectId} = require("mongodb")
   exports.homepage= async(req,res,next)=>{
    try{
      const registerhome=await Home.find();
        res.render('store/home-list',{registerhome:registerhome, PageTitle:"airbnb home list",isLogin:req.session.isLogin})
      
    }catch(error){
      console.log("Error while fetching home",error);
      res.status(500).send("Internal Server Error");
    
    }
      
      
    }
    exports.getindex= async(req,res,next)=>{
   try{
    const registerhome=  await Home.find()
        res.render('store/index',{registerhome:registerhome, PageTitle:"airbnb Home",isLogin:req.session.isLogin})
      

      
   } catch(error){
    console.log("Error while fetching home",error);
    res.status(500).send("Internal Server Error");
   }
      
    }
  
    exports.getbookings=(req,res,next)=>{
       
            res.render('store/booking',{ PageTitle:"Bokings",isLogin:req.session.isLogin})
        
    }
    exports.getfavlist= async(req,res,next)=>{
    
 
      try{


      const favorites=await Favhome.find().populate('houseId');
       console.log("Favorites",favorites);
     
        const favHomes = favorites
          .filter(fav => fav.houseId !== null)
          .map(fav => fav.houseId);


         console.log("Favorite IDs",favHomes);
         
          // const favHomes=registerhome.filter(home=>favorite.includes(home._id.toString()));
         return  res.render('store/favourite-list',{ PageTitle:"My favorite",favHomes:favHomes,isLogin:req.session.isLogin})
         
      
        }catch(error){
          console.log("Error",error);
          res.status(500).send("Internal Server Error");
        }
       
      
  
     }
     
    
    


exports.postAddfavorite= async(req,res,next)=>{
    const homeId = req.params.homesId;
    try{
      const fav = await Favhome.findOne({houseId:homeId});
      // console.log("Fav",fav);
      // console.log("Home ID",homeId);
     
      
      if (fav) {
        console.log("Already marked as favourite",fav);
        return res.redirect('/favourite-list');
      } else {
        const newFav = new Favhome({houseId:homeId});
        await newFav.save();
        console.log("Fav added: ", newFav);
         res.redirect('/favourite-list');
      }
     

    }
    catch(error){
      console.log("Error while adding to favorite",error);
    }
  

   
   
   
 
}
exports.getHomedetails= async (req,res,next)=>{
   
 const homeid=req.params.homesId;
 try{
 const home=await Home.findById(homeid)
  if(!home){
    res.redirect("/index")
    console.log("home not found");
    
  }
  else{
    console.log("Home deatails founds",home);
   console.log("Home id",homeid);
 res.render('store/homedetails',{ PageTitle:"Home details",home:home,
  isLogin:req.session.isLogin})
  }

}catch(error){
  console.log("Error while fetching home details",error);
  res.status(500).send("Internal Server Error");
 }
 
}
 exports.removeHome=async(req,res,next)=>{
    const homeid=req.params.homeId;
    try{
     console.log("Remove Fav Home ID:",homeid);
    const deletehome=await Favhome.deleteOne({houseId:homeid})
    console.log("Deleted home from fav",deletehome);
     if(deletehome.deletedCount===0){
      console.log("No home found to delete");
     }
     else{
      console.log("Home deleted from fav");
     }
     res.redirect('/favourite-list')
     }
      catch(error){
        console.log("Error while removing home",error);
     }
       
 
    }
 
 

