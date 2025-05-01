const home = require("../models/home.models")

exports.getAddHome=(req,res,next)=>{
    res.render('host/edit',{PageTitle:"Add Home"})
  }
  exports.getEdithome=(req,res,next)=>{
    //reading variable of the query parameter
    const homeId=req.params.homeId
    const querypara=req.query.editing
    console.log(homeId);
    console.log(querypara);
    res.render('/edit-home/:homeId',{PageTitle:"Add Home"})
  }

  exports.postAddHome=(req,res,next)=>{
    const {HouseName,price,location,rating,image}=req.body;
   const newHome= new home(HouseName,price,location,rating,image)
   
    newHome.save();
   
    
      res.render('host/homeadded',{PageTitle:"Home Added SucessFully"})

    }
    
    exports.gethostHome= (req,res,next)=>{
   
      home.fetchCall((registerhome)=>{
        res.render('host/hosthome-list',{registerhome:registerhome, PageTitle:"airbnb host home list"})
      });
      
      
      
    }

    

   
