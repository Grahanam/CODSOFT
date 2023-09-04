const express=require('express')
const router=express.Router()

const Course=require('../models/coursemodel')
const Chapter=require('../models/chaptermodel')
const Question=require('../models/questionmodel')
const Progress=require('../models/progressmodel')

router.post('/course',async(req,res)=>{
    try{   
 
        const {title,description,level,time,language,instructor}=req.body
        const savecourse=new Course({
            title,
            description,
            level,
            time,
            language,
            instructor
        })
        await savecourse.save()
        res.status(200).json({message:'Course created'})
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get('/course/:id',async(req,res)=>{
    try{
        const findcourse=await Course.find({instructor:req.params.id})
        res.status(200).json(findcourse)
         
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/course',async(req,res)=>{
    try{
       
        const update=req.body
        const updatecourse=await Course.findByIdAndUpdate(update._id,update,{new:true})
        if(!updatecourse){
            res.status(404).json({message:'Course not found'})
        }
        res.status(200).json(updatecourse)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/chapter',async(req,res)=>{
    try{
        console.log(req.body)
        const update=req.body
        const updatechapter=await Chapter.findByIdAndUpdate(update._id,update,{new:true})
        if(!updatechapter){
            res.status(404).json({message:'Course not found'})
        }
        res.status(200).json({message:'chapter updated',data:updatechapter})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/mcq',async(req,res)=>{
    try{
        console.log(req.body)
        const update=req.body
        const updatequestion=await Question.findByIdAndUpdate(update._id,update,{new:true})
        if(!updatequestion){
            res.status(404).json({message:'Course not found'})
        }
        res.status(200).json({message:'chapter updated',data:updatequestion})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/course/enrollment/:id',async(req,res)=>{
    try{
        const enrolled=await Progress.find({course:req.params.id}).populate('user')
        res.status(200).json(enrolled)
         
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})



module.exports=router