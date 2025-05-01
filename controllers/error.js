exports.pagenotfound=(req,res,next)=>{
    res.status(404).render('404eror',{PageTitle:"Page Not Found"})
  }