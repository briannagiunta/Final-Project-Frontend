import {useState, createContext} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState({})
    const [nearbyUsers, setNearbyUsers] = useState([])

    const fetchUser = async () => {
        let userId = localStorage.getItem('userId') 
        if(userId){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
                headers:{
                    Authorization: userId
                }
            })
            setUser(res.data.user)
        }
    }

    const getNearby = async () => {
        const userId = localStorage.getItem('userId')
        if(userId){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/nearby`,{
                headers:{
                    Authorization: userId
                }
            })
            setNearbyUsers(res.data.users)
        }
    }

    const state = {
        userState: [user,setUser],
        nearbyState: [nearbyUsers,setNearbyUsers],
        fetchUser: fetchUser,
        getNearby: getNearby
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}