exports. getLogin=((req,res,next)=>{
     res.render('auth/login',{
       PageTitle:"login",
        isLogin:false
       
     })
})
exports.postLogin=(req,res,next)=>{
    const {UserName,Password}=req.body;
    console.log("UserName",UserName);
    console.log("password",Password);
    req.session.isLogin=true;


    res.redirect('/');
    
}
exports.postLogout=(req,res,next)=>{
  req.session.isLogin=false;
  // res.cookie("isLogin",false);
  res.redirect("/login");
}
