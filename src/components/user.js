import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const User = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
    <div>
        <img className='user-pic' src = {props.user.image}/>
        <div>{props.user.name}</div>
        <div>{props.user.dogs.map(dog=> dog === props.user.dogs[0]?<span>{dog.name}</span>:dog === props.user.dogs[props.user.dogs.length -1] ? <span> and {dog.name} </span>:<span>, {dog.name}</span>)}</div>
   </div>
    )
}

export default User