const mongoose=require('mongoose')


const questionSchema=new mongoose.Schema({
    question:String,
    chapter:{type:mongoose.Schema.Types.ObjectId,ref:'Chapter'},
    options:[
        {
            text:String,
            isCorrect:Boolean
        }
    ]
})

const Question=mongoose.model('Question',questionSchema)

module.exports=Question