import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight, faCircleXmark, faDeleteLeft, faPenToSquare, faRefresh, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import Youtubevid from "../Youtubevid"

const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Createchapter=({userId})=>{
  const [courses,setcourses]=useState([])

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
            <h2 className="text-2xl md:text-3xl lg:text-4xl">Chapter</h2>
            <div className="text-lg md:text-xl lg:text-2xl">Create - Update - Delete</div>
          
            <div className="p-1">
            <h2 className="text-lg md:text-xl lg:text-2xl p-3">Your Chapters</h2>
              {courses.map((data,index)=>(
                <div className="pb-4"  key={index}>
                  <CourseList course={data}/>
                </div>
              ))}
            </div>
        </>
      )
}

export default Createchapter


const CourseList=({course})=>{
  
  const [id,setid]=useState('')
  const [title,settitle]=useState('')
  const [index,setindex]=useState('')
  const [paragraph,setparagraph]=useState([''])
  const [videoId,setvideoId]=useState('')
  const [edit,setedit]=useState(false)
  const [open,setopen]=useState(false)
  const [chapters,setchapters]=useState([])
    

  const parahandlechange=(index,data)=>{
    const para=[...paragraph]
    para[index]=data
    setparagraph(para)
  }

  const scrollToTop=()=>{
    const targetdiv=document.getElementById(course._id)
    if(targetdiv){
      targetdiv.scrollIntoView({behavior:'smooth'})
    }
  }

  const addpara=()=>{
    setparagraph([...paragraph,'']);
  }
  const removepara=(index)=>{
    const para=[...paragraph]
    para.splice(index,1)
    setparagraph(para)
  }
  
  const savechapter=()=>{
    fetch(`${API_BASE_URL}/chapter`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({title:title,index:index,course:course,paragraphs:paragraph,videoId:videoId})
           }).then(response=>response.json())
           .then(response=>{
            // console.log(response)
            alert(response.message)
            getchapter()
            settitle('')
            setindex('')
            setparagraph([''])
            setvideoId('')
          })
           .catch(err=>console.log(err))
  }

  const updatechapter=()=>{
    fetch(`${API_BASE_URL}/instructor/chapter`,{
      method:'PUT',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({_id:id,title:title,index:index,course:course._id,paragraphs:paragraph,videoId:videoId})
     }).then(response=>response.json())
     .then(response=>{
          alert(`Chapter Updated: ${title}`)
          getchapter()
          setedit(!edit)
          settitle('')
          setindex('')
          setparagraph([''])
          setvideoId('')

     })
     .catch(err=>console.log(err))
  }

    const deletechapter=(data)=>{
        const confirmation=window.confirm('Confirm deletion of this chapter and its associated MCQ data?')
        if(confirmation){
        
        fetch(`${API_BASE_URL}/chapter/${data._id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(response=>response.json())
        .then(data=>{
            alert(data.message)
            getchapter()
        })
        .catch(err=>console.log(err))
      }else{
      }
    }

    const getchapter=()=>{
        fetch(`${API_BASE_URL}/chapter/course/${course._id}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }).then(response=>response.json())
        .then(data=>{
            setchapters(data)
        })
    }
    useEffect(()=>{
        getchapter()
        
    },[])
    return(
        <>
        
        <div className="">
            
            <div onClick={()=>setopen(!open)} className='border mb-1 p-1 flex justify-between'> 
              {course.title}
            <div>
            {open?<i className='pr-2' ><FontAwesomeIcon icon={faChevronDown}/></i>  
                :
                <i className='pr-2' ><FontAwesomeIcon icon={faChevronRight}/></i>  
            } 
            </div>
            </div>
            {open?<>
              <div id={course._id} className="flex flex-col">
              <input className="m-1 p-1" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title"/>
              <input className="m-1 p-1" value={index} onChange={(e)=>setindex(e.target.value)} placeholder="Index"/>
                <div>
                <lable className='place-self-left pt-4'>Paragraphs</lable>
                {paragraph.map((data,index)=>(
                  <div className="flex flex-row justify-between" key={index}>
                    <div className="flex flex-row w-full">
                      <textarea className="m-1 p-1 w-full" placeholder={`Paragraph`} value={data} onChange={(e)=>parahandlechange(index,e.target.value)}/>
                    </div>
                    <div className="pr-2 flex items-center justify-center">
                      <i className="text-red-700" onClick={()=>removepara(index)}><FontAwesomeIcon icon={faCircleXmark}/></i>
                    </div>
                  </div>
                ))}
                </div>
                <div className="flex">
                <button onClick={addpara}>Add Paragraph</button>
                </div>
                <input className="m-1 p-1" value={videoId} onChange={(e)=>setvideoId(e.target.value)} placeholder="Youtube Video Id"/>
                {videoId?<div>Video Preview<Youtubevid videoId={videoId}/></div>:<></>}
            </div>
            
            {edit?<>
                <button className="mr-2" onClick={()=>{
                    setedit(!edit)
                    settitle('')
                    setindex('')
                    setparagraph([''])
                    setvideoId('')
                }}>Cancel</button>
                <button onClick={updatechapter}>Update</button>
            </>:<>
                <button className="mb-10" onClick={savechapter}>Save</button>
            </>}
            
            <div className='border rounded'>

                    {chapters.map((data,index)=>(
                    <div className="flex justify-between mb-1 p-1" key={index} >
                        {data.index}) {data.title}
                        <div> 
                            <i className="mr-3" onClick={()=>{
                                if(!edit){
                                    setedit(!edit)
                                }
                                setid(data._id)
                                settitle(data.title)
                                setindex(data.index)
                                setparagraph(data.paragraphs)
                                setvideoId(data.videoId)
                                scrollToTop()
                            }}><FontAwesomeIcon icon={faPenToSquare}/>
                            </i>  
                            <i className='text-red-500 mr-1' onClick={()=>{deletechapter(data)}}><FontAwesomeIcon icon={faTrash}/></i> 
                        </div>
                    </div>
                    ))}
            </div>
            </>:<></>}
        </div>
        
        </>
    )
}