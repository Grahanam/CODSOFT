import { faChevronDown, faChevronRight, faCircleXmark, faPenToSquare, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Createmcq=({userId})=>{
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl">MCQs</h2>
            <div className="text-lg md:text-xl lg:text-2xl">Create - Update - Delete</div>
            <div className="p-1">
            <h2 className="text-lg md:text-xl lg:text-2xl p-3">Your MCQs</h2>
              {courses.map((data,index)=>(
                <div className="p-1"  key={index}>
                     <Chapterlist course={data}/>
                </div>
              ))}
              </div>
        </>
      )
}

export default Createmcq

const Chapterlist=({course})=>{
  const [chapters,setchapters]=useState([])
  
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
    <div className="border p-1">
    Course: {course.title}
    <div className="text-left">Chapters List:</div>
    {chapters.map((data,index)=>(
      <div key={index}>
        <Mcqlist chapter={data}/>
      </div>         
    ))}
    </div>
    </>
  )

}

const Mcqlist=({chapter})=>{
  const [mcqs,setmcqs]=useState([])
  const [open,setopen]=useState(false)
  const [id,setid]=useState('')
  const [question,setquestion]=useState('')
  const [options,setoptions]=useState([{text:'',isCorrect:false}])
  const [edit,setedit]=useState(false)
  
  const handletext=(index,value)=>{
        const updateoption=[...options]
        updateoption[index]['text']=value
        setoptions(updateoption)
  }

  const handleisCorrect=(index,value)=>{
    const updateoption=[...options]
    if(!value){
      updateoption[index]['isCorrect']=value
      setoptions(updateoption)
    }else{
        for(let i=0;i<updateoption.length;i++){
          if(updateoption[i]['isCorrect']==true){
            updateoption[i]['isCorrect']=false
          }
        }
        updateoption[index]['isCorrect']=value
        setoptions(updateoption)
    }
    
}  
  const addoption=()=>{
    setoptions([...options,{text:'',isCorrect:false}])
  }

  const removeoption=(index)=>{
     const updateoptions=[...options]
     updateoptions.splice(index,1)
     setoptions(updateoptions)
  }

  const scrollToTop=()=>{
    const targetdiv=document.getElementById(chapter._id)
    if(targetdiv){
      targetdiv.scrollIntoView({behavior:'smooth'})
    }
  }
  
  const updatemcq=()=>{
    fetch(`${API_BASE_URL}/instructor/mcq`,{
      method:'PUT',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({_id:id,question:question,chapter:chapter._id,options:options})
     }).then(response=>response.json())
     .then(response=>{
          console.log(response)
          alert(`MCQ Updated`)
          getmcq()
          setid('')
          setedit(!edit)
          setquestion('')
          setoptions([{text:'',isCorrect:false}])

     })
     .catch(err=>console.log(err))
  }

  const savemcq=()=>{
    fetch(`${API_BASE_URL}/chapter/mcq`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({question:question,chapter:chapter._id,options:options})
           }).then(response=>response.json())
           .then(response=>{
            // console.log(response)
            alert(`MCQ created`)
            getmcq()
            setquestion('')
            setoptions([{text:'',isCorrect:false}])
          })
           .catch(err=>console.log(err))
  }
  const deletemcq=(data)=>{
    const confirmation=window.confirm('Confirm deletion of this MCQ?')
    if(confirmation){
    fetch(`${API_BASE_URL}/chapter/mcq/${data._id}`,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    }).then(response=>response.json())
    .then(data=>{
        alert(data.message)
        getmcq()
    })
    .catch(err=>console.log(err))
  }else{}
}
  const getmcq=()=>{
    fetch(`${API_BASE_URL}/chapter/mcq/${chapter._id}`,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    }).then(response=>response.json())
    .then(data=>{
        setmcqs(data)
    })
}
useEffect(()=>{
    getmcq()
    
},[])
  return(
    <>
      <div className="pb-2">
            
            <div onClick={()=>setopen(!open)} className='border mb-1 p-1 flex justify-between'> 
                
            {chapter.title}
            <div>
            {open?<i className='pr-2' ><FontAwesomeIcon icon={faChevronDown}/></i>  
                :
                <i className='pr-2'><FontAwesomeIcon icon={faChevronRight}/></i>  
            } 
            </div>
            </div>
            {open?<>
            <div id={chapter._id} className=" flex flex-col">
                <textarea className="m-1 p-1" value={question} onChange={(e)=>setquestion(e.target.value)} placeholder="Question"/>
                <div className="flex">
                  <button onClick={addoption}>Add Option</button>
                </div>
                {options.map((data,index)=>(
                  <div className="flex flex-row items-center justify-between" key={index}>
                    <div className="flex flex-row w-full justify-between">
                      <input className="w-full m-1 p-1" value={data.text} placeholder="Option" onChange={(e)=>handletext(index,e.target.value)} />
                    </div>
                    
                    <label className="flex flex-row pr-3">
                      Answer
                      <input type="checkbox" checked={data.isCorrect} onChange={(e)=>handleisCorrect(index,e.target.checked)}/>
                    </label>
                    <i className="text-red-500 pr-3" onClick={()=>removeoption(index)}><FontAwesomeIcon icon={faCircleXmark}/></i>
                    
                  </div>
                ))}
                
            </div>
            {edit?<>
            <div className="flex justify-evenly">
                <button onClick={()=>{
                    setedit(!edit)
                    setquestion('')
                    setoptions([{text:'',options:false}])
                 
                }}>Cancel</button>
                <button onClick={updatemcq}>Update</button>
                </div>
            </>:<>
                <button className="mb-10" onClick={savemcq}>Save</button>
            </>}
            <div className='border rounded'>
                    {mcqs.map((data,index)=>(
                    <div className="flex justify-between mb-1 p-1" key={index} >
                        {data.question}
                        <div> 
                            <i className="mr-3" onClick={()=>{
                                if(!edit){
                                    setedit(!edit)
                                }
                                
                                setid(data._id)
                                setquestion(data.question)
                                setoptions(data.options)
                                // window.scrollTo(0,0)
                                scrollToTop()
                            }}><FontAwesomeIcon icon={faPenToSquare}/>
                            </i>  
                            <i className='text-red-500 mr-1' onClick={()=>{deletemcq(data)}}><FontAwesomeIcon icon={faTrash}/></i> 
                        </div>
                    </div>
                    ))}
            </div>
            </>:<></>}
        </div>
    </>
  )
}