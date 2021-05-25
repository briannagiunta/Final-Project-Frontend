import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import LogSign from '../components/log-sign'
import axios from 'axios'
import Popup from '../components/popup'
import Carousel from '../components/swipe'

const Home = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [nearbyUsers, setNearbyUsers] = useState([])
    
    const getNearby = async () => {
        const userId = localStorage.getItem('userId')
        if(userId){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/nearby`,{
                headers:{
                    Authorization: userId
                }
            })
            console.log(res);
            setNearbyUsers(res.data.users)
        }
    }
    
    useEffect(()=>{getNearby()},[])
 
    return(
        <>
        {props.shouldPopup === true && 
            <Popup form = {props.form} setForm = {props.setForm} getNearby={getNearby} togglePopup={props.togglePopup}/>      
        }
        <div className = 'page-column'>
            {!user.name ? 
                <h4>Home page</h4>
            :
                <h4>Welcome Back, {user.name}!</h4>       
            }
            <div className='content'>
                {user.name && 
                    <Carousel users={nearbyUsers}/>  
                }

            </div>
        </div>
        </>
    )
}

export default Home