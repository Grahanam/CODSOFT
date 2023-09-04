
const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User=require('../models/usermodel')
const Progress=require('../models/progressmodel')


//Sign up
router.post('/signup',async(req,res)=>{
//    console.log(req.body)
   try{
      const {username,fullname,password,role}=req.body

      const existingUser=await User.findOne({username:username})
      if(existingUser){
        res.status(400).send({message:"Username already exists"})
      }else{
          const hashedpass=await bcrypt.hash(password,10)
          if(hashedpass){
            const user=new User({
                username,
                fullname,
                password:hashedpass,
                role,
            })

            const saveuser=await user.save()
            if(saveuser){
                res.status(200).send(saveuser)
            }else{
                res.status(500).send({message:"user saving error"})
            }
          }else{
            res.status(500).send({message:"Password not hashed correctly"})
          }
      }
   }catch(err){
    console.log(err)
        res.status(500).send({message:"Internal server error"})
   }
})


//Log in
router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const founduser=await User.findOne({username})
        // console.log(founduser)
        if(founduser){
            const checkpass=await bcrypt.compare(password,founduser.password)
            if(checkpass){
                const token=await jwt.sign({
                    userId:founduser._id,
                    username:founduser.username,
                    fullname:founduser.fullname
                },
                process.env.secretkey,
                    {expiresIn:"24h"}
                );
            res.status(200).send({message:"Login successful",token,user:founduser.username,userId:founduser._id,role:founduser.role,fullname:founduser.fullname})    

            }else{
                res.status(500).send({message:"Password does not match"})
            }

        }else{
            res.status(400).send({message:'User not found'})
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message:'Internal server Error'})
    }

})


router.post('/',async(req,res)=>{
        console.log(req.body)
        try{
            const {username,password}=req.body
            const user=new User({
                username,
                password
            })
            const usernew=await user.save()
            res.status(200).send(usernew)
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
})
router.post('/certificatedownloaded',async(req,res)=>{
   
    const {course,user}=req.body
    try{
        const progress=await Progress.findOne({course,user}).exec()
        if(!progress.certificateDownloaded){
            progress.certificateDownloaded=true
            // console.log(progress)
            const updateprogress=await progress.save()
        }
        res.status(200).json({message:'Certificate downloaded'})

    }catch(err){
        console.log(err)
       res.status(500).json(err)
    }
})

router.post('/chapterdone',async(req,res)=>{
   
    const {course,chapter,user}=req.body
    try{
        const progress=await Progress.findOne({course,user}).exec()
        console.log(progress)
        if(!progress.completedChapters?.includes(chapter)){
            progress.completedChapters?.push(chapter)
            console.log(progress)
            const updateprogress=await progress.save()
        }
        res.status(200).json({message:'chapter saved'})

    }catch(err){
        console.log(err)
       res.status(500).json(err)
    }
})

router.post('/enroll',async(req,res)=>{
    const {user,course}=req.body
    try{
        const progress=new Progress({
            user,
            course
        })
        const saveprogress=await progress.save()
        res.status(200).json({message:'Enrollment successfull'})

    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/progress/:id',async(req,res)=>{
   
    try{
        const progress=await Progress.find({user:req.params.id}).populate('course')
        
        res.status(200).json(progress)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/progress',async(req,res)=>{
       
    try{
        console.log(req.query)
        const {courseId,userId}=req.query
        const progress=await Progress.findOne({user:userId,course:courseId}).populate('course')
        console.log(progress)
        res.status(200).json(progress)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports=router