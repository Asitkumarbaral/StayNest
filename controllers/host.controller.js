const Home = require("../models/home.models");
const {ObjectId} = require("mongodb");
const Favhome = require("../models/favorite.model");
exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', { PageTitle: "Add Home", editing: false,isLogin:req.session.isLogin });
};

exports.getEdithome =  async(req, res, next) => {
  const homeId = req.params.homeId;
  const querypara = req.query.editing === "true";
  try{
  const homeFound =await Home.findById(homeId);
    console.log("Home found for editing", homeFound);
    if (!homeFound) {
      return res.redirect('host/hosthome-list');
    }

    res.render('host/edit-home', {
      home: homeFound,
      PageTitle: "Edit Home",
      editing: querypara,
      isLogin:req.session.isLogin
    });
  }catch(error){
  console.log("Error while fetching home for editing",error);
  res.status(500).send("Internal Server Error");
  }
};

exports.postAddHome =  async(req, res, next) => {
  const { HouseName, price, Location, rating, image,description } = req.body;
  try{
  const newHome = new Home({HouseName, price, Location, rating, image,description});

  const response= await newHome.save();
    console.log("Home added successfully",response);

     res.redirect('/host/home-list')
}
  catch(error){
    console.log("Error while adding home",error);
    res.status(500).send("Internal Server Error");
    
  }
};

exports.postEdithome = async(req, res, next) => {

  const {  HouseName, price, Location, rating, image ,description,_id} = req.body;
  try{
    const homeFound = await Home.findById(_id);
    if (!homeFound) {
      return res.redirect('host/hosthome-list');
    }
  const updatedHome = new Home({HouseName, price, Location, rating, image,description, _id});


  const response = await updatedHome.save();
    console.log("Home updated successfully",response);
    res.redirect('/host/home-list');
  }catch(error){
    console.log("Error while updating home",error);
    res.status(500).send("Internal Server Error");
  }
  
};

exports.gethostHome = async(req, res, next) => {
  // home.fetchCall().then(registerhome => {
  //   res.render('host/hosthome-list', {
  //     registerhome: registerhome,
  //     PageTitle: "airbnb host home list"
  //   });
  // });
  try{
   const registerhome=await Home.find()
   res.render('host/hosthome-list', {
      registerhome: registerhome,
      PageTitle: "StayNest host home list",
      isLogin:req.session.isLogin
    });
  }catch(error){
    console.log("Error while fetching host home",error);
    res.status(500).send("Internal Server Error");
  }
  
};

exports.postDeleteHome = async (req, res, next) => {
  // const homeId = req.params.homeId;
   const homeId = req.params.homeId;
   try{
  console.log('Came to delete ', homeId);

  const home=await Home.deleteOne({_id:new ObjectId(homeId)});
  const deleteFav=await Favhome.deleteOne({houseId:homeId});
    console.log("Home deleted successfully", home);

    res.redirect("/host/home-list");
  }catch(error){
    console.log("Error while deleting home",error);
    res.status(500).send("Internal Server Error");
  }
  
};
