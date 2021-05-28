import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const Chat = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    
    return(
        <>
        {console.log(props.chatWith)}
        {props.messages.length > 0 &&
            <div className = 'chat-container'>
                {props.messages.map((msg, i) =>
                    msg.user_id === props.chatWith.id ?
                    <div key = {i} className = 'left-message'>
                        <p>{msg.content}</p>
                    </div>  
                    :
                    <div key = {i} className = 'right-message'>
                        <p>{msg.content}</p>
                    </div>

                )}
            </div>
        }
        <input type = 'text' value={props.message} name="message" onChange={(e)=>{props.setMessage(e.target.value)}}/>
        <button onClick={()=>{props.sendMes()}}>Send message</button>
        </>
    )
}

export default Chat