const express= require('express');
const bodyparser= require('body-parser');
const path=require('path')
const rootDir=require('./utils/path.utils')
const userRouter=require('./routes/userrouter')
const {hostRouter}=require('./routes/hostrouter')
const errorController=require('./controllers/error')
const app=express()

 app.set('view engine','ejs')
 app.set('views','views')
 app.use(express.urlencoded());
 app.use(express.static(path.join(rootDir,'public')));
 app.use(userRouter)
 
 console.log(path.join(rootDir, 'public'));
 
 

 app.use('/host',hostRouter)
 

app.use(errorController.pagenotfound)

const PORT=3056;
app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
});
