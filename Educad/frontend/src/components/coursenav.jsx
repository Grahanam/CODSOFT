import {Link,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faBars, faBookBookmark, faCheck, faChevronLeft, faChevronRight, faHandPaper, faLock, faLockOpen, faMedal, faNewspaper} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const coursenav=({progress})=>{
    const {id}=useParams()
    const [data,setdata]=useState([])
    const [open,setopen]=useState(false)
    // const [progress,setprogress]=useState([])
   
    
    useEffect(()=>{

      // fetch(`http://localhost:4000/user/progress/64e086773c5befb01cd1ca6e`,{
      //   method:"GET",
      //   headers:{

      //   }
      // })
      // .then(response=>response.json())
      // .then((data)=>{
      //   setprogress(data)
      //   console.log(data)
      // })
      // .catch(err=>console.log(err))

      fetch(`${API_BASE_URL}/chapter/course/${id}`,{
           method:"GET",
           headers:{

           },
      })
      .then((response)=>response.json())
      .then((pac)=>{
        setdata(pac)
        
      })
      .catch((error)=>console.log(error))
    },[])

    return(
        <>
         {/* large screen view */}
          <div className='hidden md:flex lg:flex flex-col w-[20%] h-[100vh] border'>
            <Link to='/dashboard'><div className='text-xl p-2 mt-4 hover:bg-gray-700'><i><FontAwesomeIcon icon={faChevronLeft}/> </i> Dashboard</div></Link>
            <div className='p-2 mt-4 text-xl text-left border-b-2 border-white'><i><FontAwesomeIcon icon={faBookBookmark}/></i> Chapters</div>

            {/* <div className={`w-[${Math.round(progress.completedChapters?.length/data.length*100)}] h-1 bg-orange-500 rounded-full`}> */}
            
            <div
              style={{ width: `${Math.round((progress.completedChapters?.length / data.length) * 100)}%` }}
              className="h-1 bg-orange-500 rounded-full"
            ></div>
            <div> Completed: {Math.round(progress.completedChapters?.length/data.length*100)}%</div>
            
            <ul className=' overflow-auto'>
              {data.map((chapters,index)=>(

                <li className='p-2 mt-4 text-xl text-left' key={index}>
                  <Link className='flex flex-row justify-between p-1' to={`/course/${id}/${chapters._id}`}>
                  <i><FontAwesomeIcon icon={faNewspaper}/> {chapters.title}</i>
                  {progress.completedChapters?.includes(chapters._id)?(<><i className='color-green-500'><FontAwesomeIcon icon={faCheck}/></i></>):(<></>)}
                  </Link>
                </li>
              ))}
              <li className='p-2 mt-4 text-xl text-left text-orange-500'>
                  {progress.completedChapters?.length==data.length?
                  <Link to={`/course/${id}/certificate`}>
                  <div className='flex flex-row justify-between p-1 text-orange-500'>
                    <i><FontAwesomeIcon icon={faMedal}/> Certificate </i>
                    <i><FontAwesomeIcon icon={faLockOpen}/></i>
                  </div>
                  </Link>
                    :
                    <div className='flex flex-row justify-between p-1 '>
                    <i><FontAwesomeIcon icon={faMedal}/> Certificate </i>
                    <i><FontAwesomeIcon icon={faLock}/></i>
                  </div>
                  }
                
              </li>
              
                
            </ul>
            </div>
            {/* mobile screen view */}
            <div className='text-left h-[7vh] border md:hidden lg:hidden'><button className='py-1'><i className='md:hidden lg:hidden' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faBars}/></i></button></div>
            {open?<>
            <div className='absolute md:hidden lg:hidden w-full z-10 t-2 l-2 bg-gray-900'>
            <div className='flex flex-col h-[100vh] border'>
            <Link onClick={()=>setopen(!open)} to='/dashboard'><div className='text-xl p-2 mt-4 hover:bg-gray-700'><i><FontAwesomeIcon icon={faChevronLeft}/> </i> Dashboard</div></Link>
            <div className='p-2 mt-4 text-xl text-left border-b-2 border-white'><i><FontAwesomeIcon icon={faBookBookmark}/></i> Chapters</div>

            {/* <div className={`w-[${Math.round(progress.completedChapters?.length/data.length*100)}] h-1 bg-orange-500 rounded-full`}> */}
            
            <div
              style={{ width: `${Math.round((progress.completedChapters?.length / data.length) * 100)}%` }}
              className="h-1 bg-orange-500 rounded-full"
            ></div>
            <div> Completed: {Math.round(progress.completedChapters?.length/data.length*100)}%</div>
            
            <ul className=' overflow-auto'>
              {data.map((chapters,index)=>(

                <li className='p-2 mt-4 text-xl text-left' key={index}>
                  <Link onClick={()=>setopen(!open)} className='flex flex-row justify-between p-1' to={`/course/${id}/${chapters._id}`}>
                  <i><FontAwesomeIcon icon={faNewspaper}/> {chapters.title}</i>
                  {progress.completedChapters?.includes(chapters._id)?(<><i className='color-green-500'><FontAwesomeIcon icon={faCheck}/></i></>):(<></>)}
                  </Link>
                </li>
              ))}
              <li className='p-2 mt-4 text-xl text-left text-orange-500' >
                  {progress.completedChapters?.length==data.length?
                  <Link onClick={()=>setopen(!open)} to={`/course/${id}/certificate`}>
                  <div className='flex flex-row justify-between p-1 text-orange-500'>
                    <i><FontAwesomeIcon icon={faMedal}/> Certificate </i>
                    <i ><FontAwesomeIcon icon={faLockOpen}/></i>
                  </div>
                  </Link>
                    :
                    <div className='flex flex-row justify-between p-1 '>
                    <i><FontAwesomeIcon icon={faMedal}/> Certificate </i>
                    <i><FontAwesomeIcon icon={faLock}/></i>
                  </div>
                  }
                
              </li>
              
                
            </ul>
            </div>
              
            </div>
            </>:<>
            
            </>}
        </>
    )
}

export default coursenav