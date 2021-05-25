import axios from 'axios'
import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'


const AboutForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [about,setAbout] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/about`,{
            about
        },{
            headers:{
                Authorization: userId
            }
        })
        if(res.data.message.includes('SUCCES!')){
            setUser(res.data.user)
            props.togglePopup()
        }
    }

    return(
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <input type = 'text' placeholder='Tell us a little about you and your dog!' value={about} onChange={(e)=>{setAbout(e.target.value)}} />
            <input type = 'submit' value='Submit!'/>
        </form>
    )
}

export default AboutForm

