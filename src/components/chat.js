import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Chat = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <>
        {props.messages.length > 0 &&
            props.messages.map((msg, i) => 
                <div key = {i}>
                    <p>{msg.content}</p>
                </div>  
            )
        }
        <input type = 'text' value={props.message} name="message" onChange={(e)=>{props.setMessage(e.target.value)}}/>
        <button onClick={()=>{props.sendMes()}}>Send message</button>
        </>
    )
}

export default Chat