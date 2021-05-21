import {useContext} from 'react'
import {UserContext} from '../context/userContext'
import LogSign from '../components/log-sign'

const Home = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div>
            {!user.name ? 
                <h4>Home page</h4>
            :
                <h4>Welcome Back, {user.name}!</h4>         
            }

            {props.form &&
                <LogSign form = {props.form} setForm = {props.setForm}/>         
            }


        </div>
    )
}

export default Home