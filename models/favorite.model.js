const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path.utils");
const { log } = require("console");

const favDataPath = path.join(rootDir, "data", "favourite.json");
module.exports = class fav {
  static addtofav(homeId, callback = () => {}) {
    fav.getTofav((favorites) => {
      if (favorites.includes(homeId)) {
        callback("Home is already marked favourite");
      } else {
        favorites.push(homeId);
        fs.writeFile(favDataPath, JSON.stringify(favorites),err=>{
          if (err) {
            callback("Error writing to file");
          } else {
            callback("Home marked as favourite successfully");
          }
        });
      }
    });
  }
  static getTofav(callback) {
    fs.readFile(favDataPath, (err, data) => {
      if (err) {
       console.log("Error reading file:", err);
        callback("Error reading file");
      } else {
        try {
          const parsedData = JSON.parse(data.toString() || '[]');
          callback(Array.isArray(parsedData) ? parsedData : []);
        } catch (e) {
          // JSON parsing error (e.g., file was empty or invalid JSON)
          callback([]);
        }
      }
    });
  }
} 
