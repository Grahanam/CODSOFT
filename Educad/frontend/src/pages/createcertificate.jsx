// import {PDFViewer} from '@react-pdf/renderer'
import Certificate from '../components/certificate'
import { useParams,useNavigate } from "react-router-dom"
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const Createcertificate = ({updateprogress,progress,userId,course,fullname}) => {
  const navigate=useNavigate()
  const certificateDownloaded=()=>{
    // console.log(progress)
    fetch(`${API_BASE_URL}/user/certificatedownloaded`,{
      method:'POST',
      headers:{
         'Accept':'application/json',
         'Content-Type':'application/json'
      },
      body:JSON.stringify({course:course._id,user:userId})
    })
    .then((response)=>response.json())
    .then(response=>{
      // console.log(response)
      // alert('Certificate downloaded')
      updateprogress()
      navigate(`/dashboard`)

    })
    .catch(err=>{
      console.log(err)
    })
    
    // getprogress()
  }
    return (
      <div>
        {!progress.certificateDownloaded? <>
        <h1 className='text-lg md:xl lg:2xl pb-5'>Congratulations!</h1>
        <Certificate certificateDownloaded={certificateDownloaded} userId={userId} course={course.title} name={fullname}/>
        </>
        :<>
        Certificate Already Dowloaded
        </>}
      </div>
    );
  };

export default Createcertificate