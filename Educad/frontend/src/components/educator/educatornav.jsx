import {Link,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faBars, faBookBookmark, faCheck, faChevronLeft, faChevronRight, faHandPaper, faLock, faLockOpen, faMedal, faNewspaper, faPenToSquare, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'




const Educatornav=()=>{
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

      // fetch(`http://localhost:4000/chapter/course/${id}`,{
      //      method:"GET",
      //      headers:{

      //      },
      // })
      // .then((response)=>response.json())
      // .then((pac)=>{
      //   setdata(pac)
        
      // })
      // .catch((error)=>console.log(error))
    },[])

    return(
        <>
         {/* large screen view */}
          <div className='hidden md:flex lg:flex flex-col w-[20%] h-[100vh] border'>
            <Link to='/educator'><div className='text-xl p-2 mt-4 hover:bg-gray-700'>Dashboard <i><FontAwesomeIcon icon={faChevronRight}/> </i></div></Link>
            <div className='p-2 mt-4 text-xl text-left border-b-2 border-white'><i><FontAwesomeIcon icon={faBookBookmark}/></i> Educator</div>
            <ul className=' overflow-auto'>
                <li className='p-2 mt-4 md:text-lg lg:text-xl text-left'>
                  <Link className='flex flex-row justify-between p-1' to={`/educator/course`}>
                  <i>Course</i>
                  <div>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>
                <li className='p-2 mt-4 md:text-lg lg:text-xl text-left'>
                  <Link className='flex flex-row justify-between p-1' to={`/educator/chapter`}>
                  <i>Chapter</i>
                  <div className='md:text-base'>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>
                <li className='p-2 mt-4 md:text-lg lg:text-xl text-left'>
                  <Link className='flex flex-row justify-between p-1' to={`/educator/mcq`}>
                  <i>MCQs</i>
                  <div>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>  
              
            </ul>
            </div>
            {/* mobile screen view */}
            <div className='text-left h-[7vh] border md:hidden lg:hidden'><button className='py-1'><i className='md:hidden lg:hidden' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faBars}/></i></button></div>
            {open?<>
            <div className='absolute md:hidden lg:hidden w-full z-10 t-2 l-2 bg-gray-900'>
            <div className='flex flex-col h-[100vh] border'>
            <Link onClick={()=>setopen(!open)} to='/dashboard'><div className='text-xl p-2 mt-4 hover:bg-gray-700'><i><FontAwesomeIcon icon={faChevronLeft}/> </i> Dashboard</div></Link>
            <div className='p-2 mt-4 text-xl text-left border-b-2 border-white'><i><FontAwesomeIcon icon={faBookBookmark}/></i> Educator</div>
            <ul className=' overflow-auto'>
                <li className='p-2 mt-4 text-lg text-left'>
                  <Link onClick={()=>setopen(!open)} className='flex flex-row justify-between p-1' to={`/educator/course`}>
                  <i>Course</i>
                  <div>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>
                <li className='p-2 mt-4 text-lg text-left'>
                  <Link onClick={()=>setopen(!open)} className='flex flex-row justify-between p-1' to={`/educator/chapter`}>
                  <i>Chapter</i>
                  <div>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>
                <li className='p-2 mt-4 text-lg text-left'>
                  <Link onClick={()=>setopen(!open)} className='flex flex-row justify-between p-1' to={`/educator/mcq`}>
                  <i>MCQs</i>
                  <div>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPlus}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faPenToSquare}/></i>
                  <i className='color-green-500 pr-1'><FontAwesomeIcon icon={faTrash}/></i>
                  </div>
                  </Link>
                </li>
              
                
            </ul>
            </div>
              
            </div>
            </>:<>
            
            </>}
        </>
    )
}

export default Educatornav