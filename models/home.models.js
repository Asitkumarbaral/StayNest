const fs=require('fs')
const path=require('path')
const rootDir=require('../utils/path.utils');
const { error, log } = require('console');
//let registerhome=[];
const homeDataPath=path.join(rootDir,'data','home.json')

module.exports=class home {
   constructor(HouseName,price,Location,rating,image) {
       this.HouseName=HouseName
       this.price=price
       this.Location=Location
       this.rating=rating
       this.image=image
   }
   save(){
      this.id=Math.random.toString();
      home.fetchCall((registerhome)=>{
         registerhome.push(this);
         console.log(registerhome);
         fs.writeFile(homeDataPath,JSON.stringify(registerhome),(error)=>{
            if(error){
               console.log("Error in file writing",error);

               
            }
            else{
               console.log("File is written sucessfully")
            }
         })
         
      })
   }
   static fetchCall(callback){

      fs.readFile(homeDataPath,(error,data)=>{
         console.log("file read ",error,data);
         if(!error){
           callback(  JSON.parse(data))
         }
        else{
         callback([])
        }
         
      })
  
   }
   static findbyid(homeId,callback){
      this.fetchCall((registerhome)=>{
        const homeFound =registerhome.find(homes=>homes.id===homeId);
        callback(homeFound);
      })
      }
   }


    

   
  

  
