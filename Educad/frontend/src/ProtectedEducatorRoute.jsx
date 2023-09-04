
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'



const ProtectedEducatorRoute=({children})=>{
    const cookies=new Cookies()
    const token=cookies.get("TOKEN")
    const role=cookies.get("ROLE")
    return(
        <> 
           {token&&role=='instructor'?children:<Navigate to="/auth"/>}
        </>
    )
}

export default ProtectedEducatorRoute