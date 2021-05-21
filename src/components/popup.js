import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Popup = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div>

        </div>
    )
}

export default Popup