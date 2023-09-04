
import { faArrowRight, faCaretDown, faCaretRight ,faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars, faListCheck, faMessage, faAward } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const chapterlist=({course,chapter})=>{
    const [drop,setdrop]=useState(false)
    const [detail,setdetail]=useState(false)
    const [data,setdata]=useState([])
    
        useEffect(()=>{
            fetch(`${API_BASE_URL}/chapter/course/${course._id}`,{
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
             <div  className="mt-0 md:mt-3 lg:mt-3">
                <div className="flex p-2 md:p-4 lg:p-4 justify-between hover:bg-gray-800 rounded" onClick={()=>setdetail(!detail)}>
                <div className="text-base md:text-lg lg:text-lg  md:text-lg lg:text-lg font-medium"  >Detail </div>
                <i className="pr-7"><FontAwesomeIcon icon={detail?faCaretDown:faCaretRight}/></i>
                </div>
                {detail?<>
                    <div>
            {/* <h1 className="text-left text-orange-500">{course.title}</h1> */}
            <div className="text-base text-left text-base font-light pt-4">{course.description}</div>
            <div className="flex flex-row border rounded p-1 md:p-3 lg:p-4 m-2 justify-between text-xs font-bold mt-4 md:mt-9 lg:mt-9  text-orange-500">
                <div >{course.level}</div>
                <div>Approx.{course.time} hours to complete</div>
                <div>Flexible schedule</div>
            </div>
            <h1 className='pt-4 md:pt-12 lg:pt-12 text-left lg:font-extrabold md:font-extrabold text-lg md:text-3xl lg:text-3xl'>Details to know</h1>
         <div className=' flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between text-sm px-2 md:px-2 lg:px-2 py-1 md:py-10 lg:py-10 text-center'>
            {/* Cards */}
            <div className="card lg:w-72 p-2 flex flex-col  place-items-start">
              <i className='bg-white p-1 px-2 mb-1 md:mb-2 lg:mb-3 border-2 rounded'>
                <FontAwesomeIcon className='text-xl md:text-4xl lg:text-4xl text-red-500 hover:text-red-600 ' icon={faAward} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-1 md:pb-4 lg:pb-4'>Certificate</h2>
            </div>
            <div className="card lg:w-72 p-2 flex flex-col place-items-start">
              <i className='bg-white p-1 px-2 mb-1 md:mb-2 lg:mb-3 border-2 rounded'>
                <FontAwesomeIcon className='text-xl md:text-4xl lg:text-4xl text-red-500 hover:text-red-600 ' icon={faListCheck} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-1 md:pb-4 lg:pb-4'>MCQs</h2>
            </div>
            <div className="card lg:w-72 p-2 flex flex-col place-items-start">
              <i className='bg-white p-1 px-2 mb-1 md:mb-2 lg:mb-3 border-2 rounded'>
                <FontAwesomeIcon className='text-xl md:text-4xl lg:text-4xl text-red-500 hover:text-red-600 ' icon={faMessage} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-1 md:pb-4 lg:pb-4'>{course.language}</h2>
            </div>
         </div> 
         </div>
                </>:<></>}

                {chapter?<>
                <div className="text-base md:text-lg lg:text-lg flex p-2 md:p-4 lg:p-4 font-medium justify-between hover:bg-gray-800 rounded" onClick={()=>setdrop(!drop)}>
                <div className="" >Chapters </div>

                <i className="pr-7"><FontAwesomeIcon icon={drop?faCaretDown:faCaretRight}/></i>
                </div>
                {drop?<>
                    {data.map((datas,index)=>(
                    <div key={index} className="p-2 pl-5 text-left text-base font-light md:text-lg lg:text-lg ">
                        {index+1}. {datas.title}
                    </div>
                ))}
                </>:<></>}
                </>:<></>}
                

             </div>
        </>
    )
}

export default chapterlist