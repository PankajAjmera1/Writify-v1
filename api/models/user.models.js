import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema =new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
    // fullName:{
    //     type:String,
    //     required:true,
    //     unique:true
    // }
},{timestamps:true})


export const User =mongoose.model('User',userSchema)

export default User;