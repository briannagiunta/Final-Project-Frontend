import {useContext} from 'react'
import {UserContext} from '../context/userContext'
import {Link} from 'react-router-dom'

const NavBar = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <nav>
            {!user.id ? 
            <>
            <span onClick={()=>{
                props.setForm(null)
                props.setShouldPopup(false)
            }}>
                <Link to= '/'>Home</Link>{'  |  '}
            </span>

                <span onClick={()=>{
                    props.setForm('signup')
                    props.setShouldPopup(true)
                    }}>
                    <Link to= '/'>Sign Up</Link>{'  |  '}
                </span>
                
                <span onClick={()=>{
                    props.setForm('login')
                    props.setShouldPopup(true)
                }}>
                    <Link to= '/'>Login</Link>
                </span>
            </>
            :
            <>
                <Link to= '/dashboard'>Dashboard</Link>{'  |  '}
                <Link to= '/profile'>Profile</Link>{'  |  '}
                <Link to= '/matches'>Matches</Link>{'  |  '}
                <span onClick={()=>{
                    localStorage.removeItem('userId')
                    setUser({})
                }}><Link to= '/'>Logout</Link></span>
            </>
            }
        </nav>
    )
}

export default NavBar