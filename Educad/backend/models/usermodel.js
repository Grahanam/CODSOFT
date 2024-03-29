const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    fullname:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','instructor'],require:true},

})

const User=mongoose.model('User',UserSchema)

module.exports=User