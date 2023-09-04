import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'
import Navbar from '../components/navbar'
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Main=()=>{
  const [data,setdata]=useState([])
 
  useEffect(()=>{
      fetch(`${API_BASE_URL}/course`,{
          method:"GET",
          headers:{

          },
      })
      .then((response)=>response.json())
      .then((data)=>{
          setdata(data)
          console.log(data)
      })
      .catch((error)=>console.log(error))
  },[])
  

    return(
        <>
        <Navbar/>
        <div className='text-center pt-24'>
         <h2 className='text-lg md:text-xl lg:text-2xl pb-20 font-bold'>COURSES</h2>
         <div className='flex flex-col'>
         <ul>
            {data.map((item,index)=>(
              <li key={index}>
                <Link to={`/course/${item._id}`}>
                <div className='text-left pl-5 w-[80%] pb-20 text-white'>
                  <div className='border-4 w-[80px] mb-5 border-orange-500'></div>
                  <h2 className='text-orange-500 text-xl md:text-2xl lg:text-3xl font-extrabold pb-10'>{item.title}</h2>
                  <p className='text-lg md:text-xl lg:text-2xl pb-4'>Answer a few questions about yourself- it takes less than 5 minutes.</p>
                  <div className='flex flex-col'>
                  <i className='text-sm md:text-lg lg:text-xl'><FontAwesomeIcon icon={faMedal}/> What is your biggest achievement?</i>
                  <i className='text-sm md:text-lg lg:text-xl'><FontAwesomeIcon icon={faCat}/> What does your ideal opportunity look like?</i>
                  </div>
                </div>

                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
        </>
    )

}

export default Main