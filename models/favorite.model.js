const { mongo, Schema, default: mongoose } = require("mongoose");


const FavoriteScema=new  mongoose.Schema({
     houseId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Home",
      required:true,
      unique:true


     }
})
const Favhome=mongoose.model('Favhome',FavoriteScema);
module.exports=Favhome;
//  constructor(houseId) {
//           this.houseId = houseId;
//   }
// }
  
//  save() {
//     const db = getDb();
//     return db.collection('favourite').findOne({ houseId: this.houseId }).then((existingFav) => {
//       if (!existingFav) {
       
//          return db.collection('favourite').insertOne(this);
//       } else {
        
//           return new Promise((resolve, reject) => {
//             resolve({ message: 'Already exists' });
//           });
//       }
//     });
   
//   }
  
//   // static deleteById(delHomeId, callback) {
  
//   // }

//   static removeById(removeId){
//          const db = getDb();
//          return db.collection('favourite').deleteOne({ houseId: removeId });
//   }
//  static getTofav(){
//     const db = getDb();
//     return db.collection('favourite').find().toArray()
//   }
//  }


