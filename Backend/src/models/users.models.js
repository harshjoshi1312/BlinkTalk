// import mongoose from "mongoose";
// import { Schema } from "mongoose";


// const UserSchema = new Schema(
//     {
//         name: {type:String, required:true},
//         username: {type:String, required:true, unique: true},
//         password: {type:String, required:true},
//         token: {type:String, required:true}
//     }
// )


// const User = mongoose.model("User",UserSchema);
// export {User} ;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false, // Change this to false if it's not required during registration
  },
});

const User = mongoose.model("User", userSchema);
export { User };


// this type of export is help to export multiple things 
// at the same time