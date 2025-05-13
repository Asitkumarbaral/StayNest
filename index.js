const express= require('express');
const bodyparser= require('body-parser');


const userRouter=require('./routes/userrouter')
const {hostRouter}=require('./routes/hostrouter')
const errorController=require('./controllers/error')

const { default: mongoose } = require('mongoose');
const session=require('express-session');
const authrouter=require('./routes/authrouter')
const app=express()
// app.use((req,res,next)=>{
//     console.log("Cookie check midlleware",req.get
//         ('cookie'));
//     req.isLogin=req.get('cookie')?req.get('cookie').split('=')[1]===true:false;
//     next();
    
//  })
const path=require('path')
const rootDir=require('./utils/path.utils')

 app.set('view engine','ejs')
 app.set('views','views')
 app.use(express.urlencoded());
 app.use(session({
   secret: 'mysecrete',
   resave: false,
   saveUninitialized: true
}))
app.use((req,res,next)=>{
    req.isLogin=req.session.isLogin;
    next();
})
 app.use(express.static(path.join(rootDir,'public')));
 
 app.use(userRouter)
 app.use('/host',(req,res,next)=>{
    if(req.isLogin){
        next();
    }
    else{
        res.redirect('/login');
    }
 })
 
 

 app.use('/host',hostRouter)
 app.use(authrouter)

app.use(errorController.pagenotfound)
// MongoConnect(()=>{
//     console.log('connected to database')
//     const PORT=3056;
//     app.listen(PORT,()=>{
//         console.log(`server is running on port http://localhost:${PORT}`);
//     });
// });
// mongoose.connect('mongodb+srv://asitkumar:Asit1234@cluster0.e63fg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((result)=>{
//     console.log('connected to database',result);
//     const PORT=3056;
//     app.listen(PORT,()=>{
//         console.log(`server is running on port http://localhost:${PORT}`);
//     })
    
// }).catch((error)=>{
//     console.log("Error connecting to database",error);
// })
const ConnectMongoDb=async()=>{
    try{
        const result=await mongoose.connect('mongodb+srv://asitkumar:Asit1234@cluster0.e63fg.mongodb.net/staynest?retryWrites=true&w=majority&appName=Cluster0')
        console.log('connected to database');
        const PORT=3056;
        app.listen(PORT,()=>{
            console.log(`server is running on port http://localhost:${PORT}`);
        })
}catch(error){
    log("Error connecting to database",error);
}
    
}
exports.ConnectMongoDb=ConnectMongoDb;
ConnectMongoDb();

