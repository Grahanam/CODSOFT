import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars, faSwatchbook, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'
import Cookies from 'universal-cookie'
const cookies=new Cookies()

const navbar=()=>{
    const navigate=useNavigate()
    const [open,setopen]=useState(false)
    return(
        <>
        <div className='h-[80px] w-full bg-orange-500 justify-around items-center flex flex-row'>
        <div className='flex flex-row pl-4 items-center'>
          <i className='p-1 rounded bg-black'>
            <FontAwesomeIcon className='text-3xl' icon={faSwatchbook} />
          </i>
          <h2 className='text-xl md:text-2xl lg:text-2xl pl-1 font-extrabold'>Educad</h2>
        </div>
        <div className='hidden md:flex lg:flex'>
          <ul className='w-full flex justify-end items-center text-xs md:text-md lg:text-md md:font-extrabold lg:font-extrabold'>
           
            {cookies.get('USER')?
            <li>
              Hi,{cookies.get('USER')}
            </li>
            :<></>}
            {cookies.get('TOKEN')?
            <li className='p-1 md:p-3 lg:p-3' >
               <button onClick={()=>{
                cookies.remove('TOKEN')
                cookies.remove('USER')
                cookies.remove('USERID')
                navigate('/',{replace:true})
              }}>Logout</button>
              
              
            </li>:
            <>
              <li className='p-1 md:p-3 lg:p-3'><Link className='text-white' to="/">Home</Link></li>
              <li className='p-1 md:p-3 lg:p-3'><Link className='text-white' to="/course">Courses</Link></li>
              <li className='p-1 md:p-3 lg:p-3'>
                <Link className='text-white' to="/auth">Login/Signup</Link>
              </li>
            </>

            }

           
          </ul>
        </div>
        <i className='md:hidden lg:hidden' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faBars}/></i>
      </div>
      {/* Mobile Nav */}
      {open?
        (<>
        <div className=''>
        <ul className='border p-1'>
        {cookies.get('USER')?
            <li className='p-1 text-orange-500'>
              Hi, {cookies.get('USER')}
            </li>
            :<></>}
          
            {cookies.get('TOKEN')?
            <li className='p-1 md:p-3 lg:p-3 hover:bg-gray-600'onClick={()=>{
              cookies.remove('TOKEN')
              cookies.remove('USER')
              cookies.remove('USERID')
              navigate('/',{replace:true})
            }}>
               Logout
            </li>:
            <>
               <li className='p-1 md:p-3 lg:p-3'><Link className='text-white' to="/course">Courses</Link></li>
              <li className='p-1 md:p-3 lg:p-3'>
                <Link className='text-white' to="/auth">Login/Signup</Link>
              </li>
            </>

            }
        </ul>
      </div>
        </>):
        (<>
           
        </>)

      }
        </>
    )
}

export default navbar