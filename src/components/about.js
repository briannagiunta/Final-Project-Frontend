import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const About = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className = 'about-container'>
            {user.dogs && user.dogs.length > 0 ? 
            <>
                <div className='username'>{user.name}</div>
                <div> 
                    {user.dogs.map(dog=> dog === user.dogs[0]?<span>{dog.name}</span>:dog === user.dogs[user.dogs.length -1] ? <span> and {dog.name} </span>:<span>, {dog.name}</span>)}
                </div>
                <div className='about'>{user.about}</div>
            </>    
            :
            <>
                <div>{user.name}</div>

                <div>{user.about}</div>  
            </>                 
            }
            {user.about === null && 
                <button onClick={()=>{
                    props.setEdit('about')
                    props.setShouldPopup(true)
                }}>Add an about me</button>
            }
        </div>
    )
}

export default About