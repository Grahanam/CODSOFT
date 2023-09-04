import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars, faListCheck, faMessage, faAward } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'

import Navbar from "../components/navbar"
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const Welcome=({course,userId,progress,chapter})=>{
    const [data,setdata]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
      
       fetch(`${API_BASE_URL}/user/progress/${userId}`,{
        method:"GET",
        headers:{

        }
       })
       .then((response)=>response.json())
       .then((data)=>{
          console.log(data)
          setdata(data)
        })
       .catch((err)=>{
        console.log(err)
       })


    },[progress])
    return(
        <>
         {/* {progress ?<>
            
             
           
         </>:<>
            no data
         </>}
          */}

         
         <br/>
 

         <div>
            <h1 className="text-left text-3xl md:text-4xl lg:text-5xl text-orange-500">{course.title}</h1>
            
         </div>
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
        
        </>
    )
}

export default Welcome