import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String,
        unique : [true, 'Email already exists'],
        required : [true , 'Email is required']
    } , 
    user_name : {
        type : String,
        required : [true, 'Name is required']
    }, 
    image : {
        type : String,
    },

})

const User = mongoose.models.User || mongoose.model("User" , userSchema);

export default User;