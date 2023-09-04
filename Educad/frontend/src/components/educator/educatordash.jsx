import { faChevronDown, faChevronRight, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie'
const cookies=new Cookies()

const API_BASE_URL=import.meta.env.VITE_BASE_URL






const Educatordash=({userId})=>{
    const [courses,setcourses]=useState([])
    const [open,setopen]=useState(false)

    const navigate=useNavigate()

    const getCourse=()=>{
        fetch(`${API_BASE_URL}/instructor/course/${userId}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },   
        })
        .then(response=>response.json())
        .then(data=>{
            setcourses(data)  
              
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCourse()
       
    },[])

    return(
        <>
        <div className="flex justify-between items-center">
            <i>Hi, {cookies.get('USER')}</i>
        
        <button className="p-1 px-2" onClick={()=>{
                cookies.remove('TOKEN')
                cookies.remove('USER')
                cookies.remove('ROLE')
                cookies.remove('USERID')
                navigate('/',{replace:true})
              }}>Logout</button>
        </div>
         <h2 className="text-2xl md:text-3xl lg:text-4xl py-4">Dashboard</h2>
            <div className="text-lg md:text-xl lg:text-2xl py-2">Your Courses</div>
            {courses.map((data,index)=>(
                 <div key={index} className='border mb-2 p-1 flex flex-col justify-between'> 
                  <div className="flex flex-row justify-between">
                 {data.title}
                 {/* <button onClick={()=>getchapter()}>Refresh</button> */}
                 {/* <div>
                 <i className='pr-4' onClick={()=>getchapter()}><FontAwesomeIcon icon={faRefresh}/></i>  
                 {open?<i className='pr-2' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faChevronDown}/></i>  
                     :
                     <i className='pr-2' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faChevronRight}/></i>  
                 } 
                 </div> */}
                 </div>
                 <Userenrollment course={data}/>
                 </div>
            ))}
        </>
    )
}

export default Educatordash


const Userenrollment=({course})=>{
    const [open,setopen]=useState(false)
    const [user,setuser]=useState([])
    const getuser=()=>{
        fetch(`${API_BASE_URL}/instructor/course/enrollment/${course._id}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(response=>response.json())
        .then(data=>{
            setuser(data)
            // console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getuser()
    },[])
    return(
        <>
            <div className="flex flex-row justify-between">
                    User Enrolled:{user.length}
                 {/* <button onClick={()=>getchapter()}>Refresh</button> */}
                 <div>
                 
                  
                 {/* {open?<i className='pr-2' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faChevronDown}/></i>  
                     :
                     <i className='pr-2' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faChevronRight}/></i>  
                 }  */}
                 </div>
                 </div>
        </>
    )
}