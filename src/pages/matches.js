import axios from 'axios'
import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'

const Matches = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    const getMatches = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/matches`,{
            headers:{
                Authorization: userId
            }
        })
        console.log(res);
    }

    useEffect(()=>{getMatches()},[])
    
    return(
        <div className= 'page-column'>
            Matches
            <div className='content'>
                
            </div>
        </div>
    )
}

export default Matches