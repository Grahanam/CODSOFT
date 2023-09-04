const mongoose=require('mongoose')


const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    level:{type:String,enum:['Beginner','Intermediate','Expert'],require:true},
    time:{type:Number,enum:[28,50,80,100],require:true},
    language:String,
    instructor:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

const Course=mongoose.model('Course',courseSchema)

module.exports=Course