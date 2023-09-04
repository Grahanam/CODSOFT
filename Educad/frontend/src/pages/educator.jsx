import {useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import Cookies from 'universal-cookie'

import Educatornav from '../components/educator/educatornav'
import Educatordash from '../components/educator/educatordash'
import Createcourse from '../components/educator/createcourse'
import Createchapter from '../components/educator/createchapter'
import Createmcq from '../components/educator/createmcq'


const educator=()=>{
    const cookies=new Cookies()
    const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)
     return(
        <>
           <div className='md:flex lg:flex flex-row'>
            <Educatornav />
            <div className='md:w-[80%] lg:w-[80%]  p-1 md:p-10 lg:p-10 border h-[93vh] md:h-[100vh] lg:h-[100vh] overflow-auto'>
            <Routes>
                <Route path='/' element={<Educatordash userId={userId}/>}/>
                <Route path='/course' element={<Createcourse userId={userId}/>}/>
                <Route path='/chapter' element={<Createchapter userId={userId}/>}/>
                <Route path='/mcq' element={<Createmcq userId={userId}/>}/>
            </Routes>
            </div>
           </div>
        </>
     )
}

export default educator