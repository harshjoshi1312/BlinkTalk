import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema(
    {
        name: {type:String, required:true},
        username: {type:String, required:true, unique: true},
        password: {type:String, required:true},
        token: {type:String, required:true}
    }
)


const User = mongoose.model("User",UserSchema);
export {User} ;

// this type of export is help to export multiple things 
// at the same time