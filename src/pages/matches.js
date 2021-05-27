import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import io from 'socket.io-client'
import Chat from '../components/chat'

let socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`)

const Matches = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [matches, setMatches] = useState([])
    const [chatId, setChatId] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

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
    useEffect(()=>{getMessages()},[messages.length])

 
    const getMes = async (chatId) =>{
        setChatId(chatId)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/messages`,{chat_id: chatId})
        setMessages(res.data.chat.messages)   
    }

    const getMessages = () => {
        socket.on("message", msg => {
            getMes(chatId)
        })
    }

    const sendMes = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/send/message`,{
            chat_id: chatId,
            content: message
        },{
            headers:{
                Authorization: localStorage.getItem('userId')
            }
        })
        console.log(res);
        // if(res.data.message === 'message sent'){
        //     sendMessage()
        // }   
    }

     const sendMessage = () => {
        const userId = localStorage.getItem('userId')
        if(message !== ''){
            socket.emit("message", message,userId,chatId);
            setMessage('')
        }else{
            alert('Please add a message')
        }
    }

    return(
        <div className= 'page-column'>
            Matches
            <div className='content-row'>
                <div className='left'>
                    {matches.map(m=>
                        <button key={m.user.id} onClick={()=>{getMes(m.chat.id)}}>{m.user.name}</button>
                    )}
                </div>

                <div className='right'>
                    <Chat messages = {messages} message={message} setMessage={setMessage} sendMes = {sendMessage}/>
                </div>  
            </div>
        </div>
    )
}

export default Matches