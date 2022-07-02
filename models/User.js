import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isAdmin: {type:Boolean, required:true, default: false},
},{
    timestamps: true
})

const model = mongoose.models.User || mongoose.model('User', usersSchema)

export default model;