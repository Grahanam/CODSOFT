const mongoose=require('mongoose')


const progressSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    course:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},
    completedChapters:[{type:mongoose.Schema.Types.ObjectId,ref:'Chapter'}],
    certificateDownloaded: { type: Boolean, default: false } 
})

const progressModel=mongoose.model('Progress',progressSchema)

module.exports=progressModel