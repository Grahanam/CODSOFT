import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'
import ProtectedEducatorRoute from './ProtectedEducatorRoute'

//Pages
import Home from './pages/home'
import Course from './pages/course'
import Auth from './pages/auth'
import Cookies from 'universal-cookie'
import Main from './pages/main'
import Dashboard from './pages/dashboard'
import Educator from './pages/educator'


function App() {
  const cookies=new Cookies()
  const [username,setusername]=useState(()=>cookies.get('USER')?cookies.get('USER'):null)
  const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AuthRoute><Home/></AuthRoute>}/>
          <Route path="/course" element={<AuthRoute><Main/></AuthRoute>}/>
          <Route path="/course/:id/*" element={<ProtectedRoute><Course userId={userId}/></ProtectedRoute>}/>
          <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard userId={userId}/></ProtectedRoute>}/>
          <Route path='/educator/*' element={<ProtectedEducatorRoute><Educator/></ProtectedEducatorRoute>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
