import { Navigate } from "react-router-dom"
import Cookies from "universal-cookie"




const AuthRoute=({children})=>{
    const cookies=new Cookies()
    let token=cookies.get("TOKEN")
    let role=cookies.get("ROLE")
    return(
        <>
        {token?<>
            {role=='user'?<Navigate to="/dashboard"/>:<Navigate to="/educator"/>}
        </>:children
        }
          
        </>
    )
}

export default AuthRoute