const mongoose=require('mongoose')

const chapterSchema=new mongoose.Schema({
    title:String,
    index:Number,
    course:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},
    paragraphs:[String],
    videoId:String,
})

const Chapter=mongoose.model('Chapter',chapterSchema)

module.exports=Chapter