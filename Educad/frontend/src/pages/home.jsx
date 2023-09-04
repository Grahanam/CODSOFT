import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket,faChartColumn, faHeart, faLaptopCode, faRupee, faRupeeSign, faIndianRupeeSign, faUserTie, faMagnifyingGlass, faCat, faMedal, faBolt, faEnvelopesBulk, faBars, faSwatchbook, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import {faReact,faAmazon,faGoogle,faDailymotion,faMicrosoft,faFacebook,faMeta, faApple, faStripe, faXTwitter, faPaypal, faYahoo, faUnity, faSoundcloud, faShopify, faKickstarter, faCloudflare, faWix, faAirbnb, faInstagram, faLinkedin, faCodepen, faSpotify} from '@fortawesome/free-brands-svg-icons'
import Navbar from '../components/navbar'
import Youtubevid from '../components/Youtubevid'
import ComLogos from '../components/Comlogos'
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Home=()=>{
    const [data,setdata]=useState([])
    const [open,setopen]=useState(false)
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
            {/* navbar */}
        <Navbar/>
        <div>
        <div className='bg-orange-500 text-center pb-1 p-4'>
  <h1 className='text-3xl md:text-5xl lg:text-5xl pt-24 pb-9 font-bold'>
    Explore the Future with Our Cutting-Edge Courses.
  </h1>
  <h2 className='text-lg md:text-xl lg:text-xl'>
    <i className='bg-yellow-200 text-black'>Dive into Web3 Development,</i> Quantum Computing, and More!
  </h2>
  <h2 className='text-lg md:text-xl lg:text-xl pb-9'>
    Empower Yourself with Knowledge and <i className='bg-yellow-200 text-black'>Master the Technologies of Tomorrow.</i>
  </h2>
  <Link to='/auth'>
  <button className='text-sm md:text-lg lg:text-lg mb-3'>
    Join for Free
  </button>
  </Link>
  <p className='text-xs md:text-sm lg:text-sm pb-28'>Unlock Your Potential Today. It's Quick and Free.</p>
</div>
<div className='p-4 pt-20 text-center font-bold flex flex-col '>
              <h2 className='text-lg md:text-xl lg:text-2xl pb-20'>We collaborate with <i className='text-orange-500'>300+ leading universities and companies</i></h2>
              <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-3 lg:gap-4 justify-between '>
                <ComLogos brand={faFacebook} name={'Facebook'}/>
                <ComLogos brand={faGoogle} name={'Google'}/>
                <ComLogos brand={faAmazon} name={'Amazon'}/>
                <ComLogos brand={faMicrosoft} name={'Microsoft'}/>
                <ComLogos brand={faMeta} name={'Meta'}/>
                <ComLogos brand={faDailymotion} name={'Dailymotion'}/>
                <ComLogos brand={faApple} name={'Apple'}/>
                <ComLogos brand={faStripe} name={'Stripe'}/>
                <ComLogos brand={faPaypal} name={'Paypal'}/>
                <ComLogos brand={faXTwitter} name={'Twitter'}/>
                <ComLogos brand={faYahoo} name={'Yahoo'}/>
                <ComLogos brand={faUnity} name={'Unity'}/>
                <ComLogos brand={faSoundcloud} name={'Soundcloud'}/>
                <ComLogos brand={faShopify} name={'Shopify'}/>
                <ComLogos brand={faKickstarter} name={'Kickstarter'}/>
                <ComLogos brand={faCloudflare} name={'Cloudflare'}/>
                <ComLogos brand={faWix} name={'Wix'}/>
                <ComLogos brand={faAirbnb} name={'Airbnb'}/>
              </div>
         </div>

            {/*Card-Div */}
            <h1 className='pt-12 font-extrabold text-2xl md:text-3xl lg:text-3xl'>Techies <i><FontAwesomeIcon icon={faHeart} /></i> Courses</h1>
          <div className='p-2 flex flex-col md:flex-row lg:flex-row md:justify-around lg:justify-around text-sm px-2 md:px-5 lg:px-5 py-20 text-center'>
            {/* Cards */}
            <div className="card lg:w-72 p-2 flex flex-col items-center ">
              <i className='rounded-full bg-white p-2 mb-5 border-2 border-black hover:border-blue-500 '>
                <FontAwesomeIcon className='text-4xl text-red-500 hover:text-red-600 ' icon={faChartColumn} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-4'>STEP 1: Explore Courses</h2>
              <p className='text-xs md:text-sm lg:text-md'>
                Discover a wide range of courses in various categories and fields of study.
              </p>
            </div>

            <div className="card lg:w-72 p-2 flex flex-col items-center ">
              <i className='rounded-full bg-white p-2 mb-5 border-2 border-black hover:border-blue-500 '>
                <FontAwesomeIcon className='text-4xl text-red-500 hover:text-red-600 ' icon={faReact} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-4'>STEP 2: Create Account to Enroll</h2>
                <p className='text-xs md:text-sm lg:text-md'>
                  Sign up for an account to access exclusive features, track your progress, and enroll in courses.
                </p>
            </div>
            <div className="card lg:w-72 p-2 flex flex-col items-center">
              <i className='rounded-full bg-white p-2 mb-5 border-2 border-black hover:border-blue-500 '>
                <FontAwesomeIcon className='text-4xl text-red-500 hover:text-red-600' icon={faRocket} />
              </i>
              <h2 className='text-sm md:text-md lg:text-lg pb-4'>STEP 3: Learn with Educad</h2>
                <p className='text-xs md:text-sm lg:text-md'>
                  Join our community of learners, engage with expert instructors, and achieve your learning goals.
                </p>
            </div>
            </div>
        </div>

        

        <div className='py-12 flex flex-col items-center'>
              <h1 className='pt-12 font-extrabold text-2xl md:text-3xl lg:text-3xl'>Techies <i><FontAwesomeIcon icon={faHeart} /></i> Educad</h1>
              <p className='pt-6 text-center text-md md:text-2xl lg:text-2xl text-gray-400'>A better love story than twilight. Check the video below to find out why.</p>
              <Youtubevid videoId={'K4TOrB7at0Y'}/>
              
              <div className='p-2 flex flex-col md:flex-row lg:flex-row md:justify-around lg:justify-around text-sm px-2 md:px-5 lg:px-5 py-20 text-center'>
            {/* Cards */}
            <div className="text-left lg:w-72 px-12 md:px-2 lg:px-2 py-5 md:py-2 lg:py-2  flex flex-col">
              <i className=' mb-5 flex flex-row items-center'>
                <FontAwesomeIcon className='text-xl md:text-3xl lg:text-4xl pr-1 ' icon={faMeta} />
                <p className='text-base md:text-lg lg:text-lg'>Meta</p>
              </i>
              <div className='flex items-center pb-2'>
              <i className='rounded-full bg-white px-2 py-1'>
                <FontAwesomeIcon className='text-xl md:text-3xl lg:text-3xl  text-gray-800' icon={faUserTie} />
              </i>
                <div className='pl-2'>
                  <h1 className='text-base md:text-md lg:text-lg font-extrabold'>Yadhu Manoharam <i><FontAwesomeIcon icon={faLinkedin}/></i></h1>
                  <p className='text-xs'>SDE-2</p>
                </div>
              </div>
              <p className='text-xs text-left md:text-sm lg:text-md'>
              I'm so grateful for Educad! The platform's user-friendly interface made it easy to find courses that matched my interests. The instructors were knowledgeable, and the course material was comprehensive. I've learned so much and can't wait to enroll in my next course. </p>
            </div>

            <div className="text-left lg:w-72 px-12 md:px-2 lg:px-2 py-5 md:py-2 lg:py-2  flex flex-col ">
              <i className=' mb-5 flex flex-row items-center'>
                <FontAwesomeIcon className='text-xl lg:text-3xl lg:text-4xl pr-1 ' icon={faMicrosoft} />
                <p className='text-base md:text-lg lg:text-lg'>Microsoft</p>
              </i>
              <div className='flex items-center pb-2'>
              <i className='rounded-full bg-white px-2 py-1'>
                <FontAwesomeIcon className='text-xl md:text-3xl lg:text-3xl  text-gray-800' icon={faUserTie} />
              </i>
                <div className='pl-2'>
                  <h1 className='text-base md:text-md lg:text-lg font-extrabold'>Santosh Nain <i><FontAwesomeIcon icon={faLinkedin}/></i></h1>
                  <p className='text-xs'>SDE-2</p>
                </div>
              </div>
                <p className='text-xs md:text-sm lg:text-md'>
                Educad is a game-changer for lifelong learners like me. I appreciated the diverse range of courses available. The flexibility to learn at my own pace was fantastic. Plus, the certificates I earned boosted my resume. Highly recommended! </p>
            </div>
            <div className="text-left lg:w-72 px-12 md:px-2 lg:px-2 py-5 md:py-2 lg:py-2  flex flex-col">
              <i className='mb-5 flex flex-row items-center'>
                <FontAwesomeIcon className='text-xl md:text-3xl lg:text-4xl pr-1 ' icon={faSpotify} />
                <p className='text-base md:text-lg lg:text-lg'>Spotify</p>
              </i>
              <div className='flex items-center pb-2'>
              <i className='rounded-full bg-white px-2 py-1'>
                <FontAwesomeIcon className='text-xl md:text-3xl lg:text-3xl  text-gray-800' icon={faUserTie} />
              </i>
                <div className='pl-2'>
                  <h1 className='text-base md:text-md lg:text-lg font-extrabold'>Tarun Dugar <i><FontAwesomeIcon icon={faLinkedin}/></i></h1>
                  <p className='text-xs'>SDE-2</p>
                </div>
              </div>
                <p className='text-xs md:text-sm lg:text-md'>
                As an instructor, I've had an amazing experience with Educad. The platform provided all the tools I needed to create and manage my courses effectively. The support from the Educad team has been outstanding, and the community of students is engaged and eager to learn.  </p>
            </div>
            </div>
            </div>
            

         {/* Footer */}
         <div className='flex flex-col md:flex-row lg:flex-row py-12 bg-black items-center md:items-start lg:items-start  text-center justify-items-center justify-around'>
            <div className='flex flex-col items-center md:items-left lg:items-left px-10 md:px-1 lg:px-1 w-52 '>
              <div className='flex flex-row  items-center '>
                <i className='p-1 rounded bg-black'>
                  <FontAwesomeIcon className='text-3xl' icon={faSwatchbook} />
                </i>
                <h2 className='text-xl md:text-2xl lg:text-2xl pl-1 font-extrabold'>Educad</h2>
              </div>
              <p className='text-xs py-4'>Stay ahead of the curve.</p>
              <div className='py-4'>
                <i className='p-2'><FontAwesomeIcon icon={faXTwitter}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faFacebook}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faInstagram}/></i>
                <i className='p-2'><FontAwesomeIcon icon={faLinkedin}/></i>
              </div>
            </div>
            <div className='text-xs w-52 py-5 md:py-0 lg:py-0'>
            <h2 className='text-md font-extrabold'>LEARNERS</h2>
            <p className='py-2'>For Learners</p>
            <p className='py-2'>Learners Sign Up</p>
          </div>
          <div className='text-xs w-52 py-5 md:py-0 lg:py-0'>
            <h2 className='text-md font-extrabold'>EDUCATORS</h2>
            <p className='py-2'>For Educators</p>
            <p className='py-2'>Educators Sign Up</p>
            <p className='py-2'>Educators FAQ</p>  
          </div>
          <div className='text-xs w-52 py-5 md:py-0 lg:py-0'>
            <h2 className='text-md font-extrabold'>COMPANY</h2>
            <p className='py-2'>Careers</p>
            <p>Privacy Policy</p>
          </div>
          <div className='text-xs w-52 py-5 md:py-0 lg:py-0 flex flex-col items-center'>
            <h2 className='text-md font-extrabold'>PARTNERS</h2>
            <div className='flex flex-row  items-center '>
                <i className='p-1 rounded bg-black'>
                  <FontAwesomeIcon className='text-2xl' icon={faCodepen} />
                </i>
                <h2 className='text-md md:text-xl lg:text-xl pl-1 font-extrabold'>Codepen</h2>
            </div>
          </div>
         </div>
        </>
    )
}


export default Home