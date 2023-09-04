import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import Navbar from "../components/navbar"
import Chapterlist from "../components/chapterlist"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Cookies from "universal-cookie"
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Dashboard=({})=>{
    const cookies=new Cookies()
    const [data,setdata]=useState([])
    const [course,setcourse]=useState([])
    const navigate=useNavigate()
    const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)

    const enroll=(course)=>{
        fetch(`${API_BASE_URL}/user/enroll`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user:userId,course:course})
          }).then(response=>response.json())
          .then((data)=>{
            // console.log(data.message)
            alert(data.message)
            navigate(`/course/${course}`,{replace:true})
            
          })
          .catch(err=>console.log(err))
    }

    useEffect(()=>{
       fetch(`${API_BASE_URL}/user/progress/${userId}`,{
        method:"GET",
        headers:{

        }
       })
       .then((response)=>response.json())
       .then((data)=>{
          // console.log(data)
          setdata(data)
        })
       .catch((err)=>{
        console.log(err)
        alert('Server Error')
       })
       

       fetch(`${API_BASE_URL}/course`,{
          method:"GET",
          headers:{

          },
      })
      .then((response)=>response.json())
      .then((data)=>{
          setcourse(data)
      })
      .catch((error)=>console.log(error))

      

    },[userId])
    return(
        <>
        <Navbar/>
        <h2 className='text-xl md:text-2xl lg:text-2xl pl-4 py-4 md:py-10 lg:py-10 font-bold text-left'>Dashboard</h2>
        <div className='p-2 md:p-4 lg:p-4 pt-5 text-center font-bold flex flex-col '>
              <h2 className='text-md md:text-lg lg:text-xl pb-5'>My Courses</h2>
              
              <div className='px-0 md:px-5 lg:px-10'>
              {data.length?(<>
               {data.map((datas,index)=>(
                <Link key={index} to={`/course/${datas.course._id}`}>
                <div className="flex flex-row items-center justify-between border mb-4  px-3 p-2 md:p-3 lg:p-4  rounded">
                  <div>
                  <div className='border border-2 md:border-3 lg:border-4  w-[40px] md:w-[60px] lg:w-[70px] border-orange-500'></div>
                  <h2 className='text-left text-orange-500 text-xl md:text-2xl lg:text-3xl font-extrabold'>{datas.course.title}</h2>
                  {/* {datas.course.title} */}
                  </div>
                  <div className="pr-7 text-base md:text-xl lg:text-xl"><i><FontAwesomeIcon icon={faArrowRight} /></i></div>
                 </div>
                 </Link>
               ))}
            </>):(<>
            <div className="h-48 flex flex-col items-center justify-center">
               <div className="text-xl">Find your favourite courses</div>
               <div className="text-md">Enroll and Track your progress here</div>
            </div>
            </>)}
              </div>
         
          </div>
           {/* <h2 className="text-left">Courses</h2>
           <div className="flex flex-col">
           {course.map((courses,index)=>( 
                   <div className="border p-3 rounded m-1 text-left" key={index}>
                   <div>{courses.title} </div>
                  
                   <div>Course descripttion</div>
                   <button onClick={()=>enroll(courses._id)}>Enroll</button>
                   </div>
           ))}
          </div> */}

          <div className='p-2 md:p-4 lg:p-4 pt-5 text-center flex flex-col '>
              <h2 className='text-md md:text-lg lg:text-xl font-bold pb-5'>Courses</h2>
              <div className='px-0 md:px-5 lg:px-10'>
              {course.length?(<>
               {course.map((courses,index)=>(
               <div key={index}>
                <div key={index} className="flex flex-col border p-2  mb-3 rounded  ">
                <div className="flex flex-row items-center justify-between " key={index}>
                  <div>
                  <div className='border border-2 md:border-3 lg:border-4  w-[40px] md:w-[60px] lg:w-[70px] border-orange-500'></div>
                  <h2 className='text-orange-500 text-left text-xl md:text-2xl lg:text-3xl font-extrabold pb-10'>{courses.title}</h2>
                  </div>
                  {data.some(item=>item.course._id===courses._id)?<></>:
                    <div className="pr-7"><button onClick={()=>enroll(courses._id)}>Enroll</button></div>
                  }
                </div>
                 <div className="w-full place-items-start">
                     <Chapterlist course={courses} chapter={courses._id}/>
                 </div>
                 </div>
                 </div>
               ))}
            </>):(<>
            <div className="h-48 flex flex-col items-center justify-center">
               <div className="text-xl">No Courses Available</div>
               <div className="text-md"></div>
            </div>
            </>)}
              </div>
         </div>

        </>
    )
}

export default Dashboard