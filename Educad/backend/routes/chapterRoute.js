const express=require('express')
const router=express.Router()


//Models
const chapterModel=require('../models/chaptermodel')
const questionModel=require('../models/questionmodel')

router.get('/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const chapter=await chapterModel.findById(id).exec()
        res.status(200).send(chapter)

    }catch(err){
        console.log(err)
        res.status(500).json({err})

    }
})


router.get('/course/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
    const findchapter=await chapterModel.find({course:req.params.id}).exec()
    res.status(200).send(findchapter)
    }catch(err){
        console.log(err)
       res.status(500).json({err})
    }
})

router.post('/',async(req,res)=>{
    console.log(req.body)
    try{
    const {title,index,course,paragraphs,videoId}=req.body

    const chapter=new chapterModel({
        title,
        index,
        course:course,
        paragraphs,
        videoId
    })
    const savechapter=await chapter.save()
    res.status(200).json({message:'chapter created'})  
}catch(err){
    res.status(500).json({message:'Error creating chapter'})
}

})

router.post('/mcq',async(req,res)=>{
    console.log(req.body)
    try{
    const {question,chapter,options}=req.body


    const mcq=new questionModel({
        question,
        chapter,
        options:options
    })

    const savemcq=await mcq.save()
    res.status(200).json({message:'mcq created'})
}catch(err){
    res.status(500).json(err)
}

})

router.get('/mcq/:id',async(req,res)=>{
    const id=req.params.id
    try{
       const mcq=await questionModel.find({chapter:id}).exec()
       res.status(200).send(mcq)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const delchapter=await chapterModel.findById(req.params.id)
        if(!delchapter){
          res.status(404).json({message:'Chapter not found'})
        }
         const mcqs=await questionModel.find({chapter:req.params.id})
         for(const mcq of mcqs){
             await questionModel.findByIdAndDelete(mcq._id)
         }
         await chapterModel.findByIdAndDelete(req.params.id)
         res.status(200).json({message:'Chapter deleted successfully'})
    }catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })

  router.delete('/mcq/:id',async(req,res)=>{
    try{
        const delquestion=await questionModel.findById(req.params.id)
        if(!delquestion){
          res.status(404).json({message:'MCQ not found'})
        }
         await questionModel.findByIdAndDelete(req.params.id)
         res.status(200).json({message:'MCQ deleted successfully'})
    }catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  })


module.exports=router