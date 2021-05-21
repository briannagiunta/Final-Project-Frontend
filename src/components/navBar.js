import {useContext} from 'react'
import {UserContext} from '../context/userContext'
import {Link} from 'react-router-dom'

const NavBar = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <nav>
            <span onClick={()=>{props.setForm(null)}}>
                <Link to= '/'>Home</Link>{'  |  '}
            </span>
            
            {!user.id ? 
            <>
                <span onClick={()=>{props.setForm('signup')}}>
                    <Link to= '/'>Sign Up</Link>{'  |  '}
                </span>
                
                <span onClick={()=>{props.setForm('login')}}>
                    <Link to= '/'>Login</Link>
                </span>
            </>
            :
                <span onClick={()=>{
                    localStorage.removeItem('userId')
                    setUser({})
                }}><Link to= '/'>Logout</Link></span>
            }
        </nav>
    )
}

export default NavBar