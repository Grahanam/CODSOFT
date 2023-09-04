const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

//Models
const courseModel=require('../models/coursemodel')
const chapterModel=require('../models/chaptermodel')
const questionModel=require('../models/questionmodel')
const progressModel=require('../models/progressmodel')


router.get('/',async(req,res)=>{
    try{
        const course=await courseModel.find()
        res.status(200).json(course)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error getting courses'})
    } 
})



router.get('/:id',async(req,res)=>{
    try{ 
         const course=await courseModel.findById(req.params.id)
         if(course){
            res.status(200).json(course)
         }
         else{
            res.status(500).json({message:'Not found'})
         }
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Error getting courses"})
    }
})

router.post('/',async(req,res)=>{
    try{
        console.log(req.body)
        const {title,description,level,time,language}=req.body
        const course=new courseModel({
        title,
        description,
        level,
        time,
        language
        })
        await course.save()
        res.status(200).send('data saved')
    }catch(err){
        console.log(err)
        res.status(200).send('error')
    }
    
})

router.delete('/:id',async(req,res)=>{
  try{
      const delcourse=await courseModel.findById(req.params.id)
      if(!delcourse){
        res.status(404).json({message:'Course not found'})
      }
       const chapters=await chapterModel.find({course:req.params.id})
       for(const chapter of chapters){
          const mcqs=await questionModel.find({chapter:chapter._id})

          for(const mcq of mcqs){
            await questionModel.findByIdAndDelete(mcq._id)
          }
          await chapterModel.findByIdAndDelete(chapter._id)
       }
       const progresses=await progressModel.find({course:req.params.id})
       for(const progress of progresses){
           await progressModel.findByIdAndDelete(progress._id)
       }
       await courseModel.findByIdAndDelete(req.params.id)
       res.status(200).json({message:'Course deleted successfully'})
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})



module.exports=router