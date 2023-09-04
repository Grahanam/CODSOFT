import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Createcourse=({userId})=>{
    const [courses,setcourses]=useState([])
    const [courseId,setcourseId]=useState('')
    const [title,settitle]=useState('')
    const [description,setdescription]=useState('')
    const [level,setlevel]=useState('Beginner')
    const [time,settime]=useState('28')
    const [language,setlanguage]=useState('')
    const [edit,setedit]=useState(false)
    
    const startupdate=(data)=>{
        if(!edit){
            setedit(!edit)
        }
        setcourseId(data._id)
        settitle(data.title)
        setdescription(data.description)
        setlevel(data.level)
        settime(data.time)
        setlanguage(data.language)
    }

    const deletecourse=(data)=>{
        const confirmation=window.confirm('Confirm deletion of this Course and its associated Chapter,MCQ and User progres data?')
        if(confirmation){
        fetch(`${API_BASE_URL}/course/${data._id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(response=>response.json())
        .then(data=>{
            
            alert(data.message)
            getCourse()
        })
        .catch(err=>console.log(err))
    }else{

    }
    }

    const updatecourse=()=>{
        fetch(`${API_BASE_URL}/instructor/course`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({_id:courseId,title:title,description:description,level:level,time:time,language:language,instructor:userId})
           }).then(response=>response.json())
           .then(response=>{
                console.log(response)
                alert('course updated')
                setedit(!edit)
                settitle('')
                setdescription('')
                setlevel('Beginner')
                settime('28')
                setlanguage('')
                getCourse() 

           })
           .catch(err=>console.log(err))
    }
    

    const saveCourse=()=>{
        fetch(`${API_BASE_URL}/instructor/course`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({title:title,description:description,level:level,time:time,language:language,instructor:userId})
           }).then(response=>response.json())
           .then(data=>{
               
                alert(data.message)
                getCourse()
            })
           .catch(err=>console.log(err))
    }
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl">Course</h2>
            <div className="text-lg md:text-xl lg:text-2xl">Create - Update - Delete</div>
            <form className="flex flex-col"> 
                <input className="m-1 p-1" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title"/>
                <textarea className="m-1 p-1" value={description} onChange={(e)=>setdescription(e.target.value)} placeholder="Description"/>
                <div className="flex flex-row justify-evenly">
                <label>Level: 
                <select value={level} onChange={(e)=>setlevel(e.target.value)}>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Expert'>Expert</option>
                </select>
                </label>
                <label>Time: 
                <select value={time} onChange={(e)=>settime(e.target.value)}>
                    <option value='28'>1 Week</option>
                    <option value='50' >2 Weeks</option>
                    <option value='80'>3 Weeks</option>
                    <option value='110'>4 Weeks</option>
                </select>
                </label>
                </div>
                <input className="m-1 p-1" value={language} onChange={(e)=>setlanguage(e.target.value)} placeholder="Language"/>
            </form>
            <div className="flex items-end justify-end">
            {edit?<>
                <button onClick={()=>{
                    setedit(!edit)
                    settitle('')
                    setdescription('')
                    setlevel('Beginner')
                    settime('28')
                    setlanguage('')
                }}>Cancel</button>
                <button onClick={updatecourse}>Update</button>
            </>:<>
                <button onClick={saveCourse}>Save</button>
            </>}
            </div>
            

            <div className="p-1">
                <h2 className="text-lg md:text-xl lg:text-2xl p-3">Your Courses</h2>
                {courses?<>
                   {courses.map((data,index)=>(
                    <div className="flex justify-between border rounded mb-1 p-1" key={index}>{data.title} <div> <i className="mr-3" onClick={()=>{startupdate(data)}}><FontAwesomeIcon icon={faPenToSquare}/></i>  <i className='text-red-500 mr-1' onClick={()=>{deletecourse(data)}}><FontAwesomeIcon icon={faTrash}/></i> </div> </div>
                   ))}
                </>:<>No Course created</>}
            </div>
        </>
      )
}

export default Createcourse