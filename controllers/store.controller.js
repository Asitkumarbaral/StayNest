const home= require("../models/home.models")
const fav=require("../models/favorite.model")
   exports.homepage= (req,res,next)=>{
   
      home.fetchCall((registerhome)=>{
        res.render('store/home-list',{registerhome:registerhome, PageTitle:"airbnb home list"})
      });
      
      
      
    }
    exports.getindex= (req,res,next)=>{
   
      home.fetchCall((registerhome)=>{
        res.render('store/index',{registerhome:registerhome, PageTitle:"airbnb Home"})
      });

      
      
      
    }
  
    exports.getbookings=(req,res,next)=>{
       
            res.render('store/booking',{ PageTitle:"Bokings"})
        
    }
    exports.getfavlist=(req,res,next)=>{
      fav.getTofav((favorites)=>{
         home.fetchCall((registerhome)=>{
          const favHomes=registerhome.filter(home=>favorites.includes(home.id))
          res.render('store/favourite-list',{ PageTitle:"My favorite",favHomes:favHomes})})
         }) 
      

       
      
  
     }
     
    
    

exports.postAddfavorite=(req,res,next)=>{
   
  console.log("Come to add fav",req.body);
  fav.addtofav(req.body.id,(error)=>{
    if(error){
      console.log("error");
      
    }
  })
  res.redirect("/favourite-list")
  

   
   
   
 }
exports.getHomedetails= (req,res,next)=>{
   
 const homeid=req.params.homesId;
 home.findbyid(homeid,home=>{
  if(!home){
    res.redirect("/index")
    console.log("home not found");
    
  }
  else{
    console.log("Home deatails founds",home);
   console.log("Home id",homeid);
 res.render('store/homedetails',{ PageTitle:"Home details",home:home})
  }
   
   
 })
 
 
 
}
