import axios from 'axios'
import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'

const LogSign = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [zip, setZip] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${props.form}`,{
            name,email,password,zip
        })
        if(res.data.message === "success"){
            props.setForm(null)
            props.togglePopup()
            localStorage.setItem('userId', res.data.user.id)
            setUser(res.data.user)
            props.getNearby()
        }
    }
    
    return(
        <div>
            {props.form === 'signup' ? 
                <h3>Sign Up!</h3>
            :
                <h3>Login!</h3>
            }
            <form onSubmit={(e)=>{handleSubmit(e)}} >            
            {props.form === 'signup' &&
            <>
                <input type='text' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required />
                <input type='text' placeholder='Zipcode' value={zip} onChange={(e)=>{setZip(e.target.value)}} required />     
            </>
            }   
                <input type='email' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />   
                <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
                <input type='submit' value="Submit" />

            </form>

        </div>
    )
}

export default LogSign