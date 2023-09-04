import {useState,useEffect} from 'react'
import Coursenav from '../components/coursenav'
import Chapter from '../components/chatper'
import { Routes,Route,useParams } from 'react-router-dom'
import Welcome from '../components/welcome'
import Createcertificate from './createcertificate'
import Cookies from "universal-cookie"
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Course=({})=>{
  const cookies=new Cookies()
  const {id}=useParams()
  const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)
  const [fullname,setfullname]=useState(()=>cookies.get('FULLNAME')?cookies.get('FULLNAME'):null)
    const [data,setdata]=useState([])
    const [progress,setprogress]=useState([])
    const [chapter,setchapter]=useState([])
    const getprogress=()=>{
        fetch(`${API_BASE_URL}/user/progress?courseId=${id}&userId=${userId}`,{
        method:"GET",
        headers:{
        }
      })
      .then(response=>response.json())
      .then((data)=>{
        setprogress(data)
        // console.log(data)
      })
      .catch(err=>console.log(err))
    }
    const getcourse=()=>{
      fetch(`${API_BASE_URL}/course/${id}`,{
        method:"GET",
        headers:{

        },
      })
      .then((response)=>response.json())
      .then((data)=>{
        setdata(data)
      })
      .catch(err=>console.log(err))
    }

    const getchapter=()=>{
      fetch(`${API_BASE_URL}/chapter/course/${id}`,{
           method:"GET",
           headers:{

           },
      })
      .then((response)=>response.json())
      .then((pac)=>{
        setchapter(pac)
        
      })
      .catch((error)=>console.log(error))
    }
    
    useEffect(()=>{
         
         getcourse()
         getchapter()
         getprogress()
    },[])
    return(
        <>
           <div className='md:flex lg:flex flex-row'>
            <Coursenav progress={progress} />
            <div className='md:w-[80%] lg:w-[80%]  p-1 md:p-10 lg:p-10 border h-[93vh] md:h-[100vh] lg:h-[100vh] overflow-auto'>
            <Routes>
                <Route path='/' element={<Welcome chapter={chapter} course={data} userId={userId} progress={progress}/>}/>
                <Route path='/:id' element={<Chapter progress={progress} updateprogress={getprogress} userId={userId} courseId={id}/>}/>
                <Route path='/certificate' element={<Createcertificate updateprogress={getprogress} progress={progress} userId={userId} course={data} fullname={fullname} />}/>
            </Routes>
            </div>
           </div>
        </>
    )
}

export default Course