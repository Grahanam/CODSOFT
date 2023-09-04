import { useParams,useNavigate, useAsyncError } from "react-router-dom"
import { useState,useEffect } from "react"
import Youtubevid from "./Youtubevid"
import Mcq from "./mcq"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faListCheck } from "@fortawesome/free-solid-svg-icons"
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const chapter=({userId,updateprogress,progress})=>{
  const [chapter,setchapter]=useState([])
  const [mcq,setmcq]=useState([])
  const [count,setcount]=useState(0)
  const {id}=useParams()
  // const [progress,setprogress]=useState([])
  const navigate=useNavigate()
  
    // const getprogress=()=>{
    //     fetch(`http://localhost:4000/user/progress/${userId}`,{
    //     method:"GET",
    //     headers:{

    //     }
    //   })
    //   .then(response=>response.json())
    //   .then((data)=>{
    //     setprogress(data)
    //     console.log(data)
    //   })
    //   .catch(err=>console.log(err))
    // }

  const chapterfinish=()=>{
    fetch(`${API_BASE_URL}/user/chapterdone`,{
      method:'POST',
      headers:{
         'Accept':'application/json',
         'Content-Type':'application/json'
      },
      body:JSON.stringify({course:chapter.course,chapter:id,user:userId})
    })
    .then((response)=>response.json())
    .then(response=>{
      console.log(response)
      alert('chapter completed')
      updateprogress()
      navigate(`/course/${chapter.course}/${id}`)

    })
    .catch(err=>{
      console.log(err)
    })
    
    // getprogress()
  }
  
  useEffect(()=>{
      // getprogress()

      fetch(`${API_BASE_URL}/chapter/${id}`,{
         method:'GET',
         header:{

         },
        })
        .then((response)=>response.json())
        .then((data)=>{
          setchapter(data)
      })
      .catch((err)=>console.log(err))

      fetch(`${API_BASE_URL}/chapter/mcq/${id}`,{
        method:'GET',
        header:{

        },
      })
      .then((response)=>response.json())
      .then((data)=>{
        // console.log(data)
        setmcq(data)
      })
      .catch((err)=>console.log(err))

      
  },[id,count])
      return(
        <>
      
          <h1 className="pb-3 text-orange-500 text-left text-2xl md:text-3xl lg:text-4xl">{chapter.title}</h1>
          {chapter.paragraphs?.map((para,index)=>(
            <p className='text-left pb-3' key={index}>{para}</p>
          ))}
          <div className="flex items-center justify-center pb-4">
          <Youtubevid videoId={chapter.videoId}/>
          </div>
          {progress.completedChapters?.includes(chapter._id)?(<>
            <div className='flex flex-row items-center justify-between p-1'>
                  <i className="text-3xl"><FontAwesomeIcon icon={faListCheck}/> MCQs</i>
                  <i className='color-green-500'><FontAwesomeIcon icon={faCheck}/></i>
            </div>
            </>):(<>
              
          
            <div className='flex text-orange-500 flex-row items-center justify-between p-1'>
                  <i className="text-2xl md:text-3xl lg:text-4xl"><FontAwesomeIcon icon={faListCheck}/> MCQs</i>
                  <i className='color-green-500'>{count}/{mcq.length} </i>
            </div>  
          
          <ul>
          {mcq.map((question,index)=>(
            <li key={index}>
              <Mcq mcq={question} index={index} setcount={setcount} count={count}/>
            </li>
            
          ))}
          </ul>
          {mcq.length>0?
          <div className="flex items-center justify-end">
            {mcq.length==count?(<><button className="bg-green-500" onClick={()=>chapterfinish()} >Submit</button></>):(<><button className="bg-red-500" onClick={()=>alert('Complete all mcq')}>Submit</button></>)}
          </div>
          :<></>}
          </>)}
          
          
        </>
      )
}

export default chapter

