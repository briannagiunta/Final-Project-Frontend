import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'

const Matches = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [matches, setMatches] = useState([])

    const getMatches = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/matches`,{
            headers:{
                Authorization: userId
            }
        })
        console.log(res);
        setMatches(res.data.matches)
    }

    useEffect(()=>{getMatches()},[])
    
    return(
        <div className= 'page-column'>
            Matches
            <div className='content-row'>
                <div className='left'>
                    {matches.map(user=>
                        <button key={user.id}>{user.name}</button>
                    )}
                </div>

                <div className='right'>

                </div>  
            </div>
        </div>
    )
}

export default Matches