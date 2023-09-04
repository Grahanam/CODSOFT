require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT||4000
const url=process.env.url

//Models
const courseModel=require('./models/coursemodel')
const chapterModel=require('./models/chaptermodel')


//Routes
const courseRoute=require('./routes/courseRoute')
const chapterRoute=require('./routes/chapterRoute')
const userRoute=require('./routes/userRoute')
const instructorRoute=require('./routes/instructorRoute')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

//Routes
app.use('/course',courseRoute)
app.use('/chapter',chapterRoute)
app.use('/user',userRoute)
app.use('/instructor',instructorRoute)

app.get('/',(req,res)=>{
    routes={
        "get":"/course",
        "get":"/chapter",

    }
    res.send(routes)
})
app.post('/',async(req,res)=>{
    try{
        console.log(req.body)
        const title=req.body.title
        const course=new courseModel({
        title:title
        })
        await course.save()
        res.status(200).send('data saved')
    }catch(err){
        console.log(err)
        res.status(200).send('error')
    }
    
})

//middleware 
app.use((req, res, next) => {
    // Set the allowed origin to your frontend server URL
    res.setHeader("Access-Control-Allow-Origin", "https://superb-yeot-575ab1.netlify.app/");
    
    // Set other CORS headers if needed
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
  
    next();
  });

//starting server  
app.listen(port,()=>{
    console.log(`Listening on port:${port}`)
})


//Database
mongoose.connect(url)
const db=mongoose.connection
db.on('error',(error)=>{
    console.error('MongoDB connection error:',error)
})
db.once('open',()=>{
    console.log('Connected to MongoDB')
})
