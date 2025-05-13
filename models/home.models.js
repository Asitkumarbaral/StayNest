

const Favourite=require('./favorite.model')


const { default: mongoose } = require('mongoose');
/*

class home {
  constructor(HouseName, price, Location, rating, image,description,_id) {
    this.HouseName = HouseName;
    this.price = price;
    this.Location = Location;
    this.rating = rating;
    this.image = image;
    
    this.description=description;    
    this._id = _id ? new ObjectId(_id) : undefined;           // Use ObjectId if id is provided, otherwise null
  }

  save() {
    if(this._id) {

      // Update existing home
      
      const db = getDb();
      return db.collection('homes').updateOne({ _id: this._id }, { $set: this });
    }
    const db = getDb();
   return  db.collection('homes').insertOne(this);
  
  }

  static fetchCall() {

    const db = getDb();
    return db.collection('homes').find().toArray();

  }
  

  static findById(homeId) {

    const db = getDb();
    if(!ObjectId.isValid(homeId)){
    throw new Error('Invalid home ID format');
    }
    return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db.collection('homes').deleteOne({ _id: new ObjectId((String(homeId))) })
  
};
}
module.exports = home;
*/
const homeSchema = new mongoose.Schema({
  HouseName:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  image:String,
  description: {
    type: String
    
  }
});

homeSchema.pre('remove', async function(next) {
  try {
    // Remove the favorite entry associated with this home
    await Favourite.deleteOne({ houseId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});
const Home=mongoose.model("Home",homeSchema);
module.exports=Home;