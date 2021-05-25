import {useContext} from 'react'
import {UserContext} from '../context/userContext'

const ProfilePic = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <>
        {user.image === null ? 
            <div className = 'profile-pic-container'>
                <button onClick={()=>{
                    props.setEdit('profile-pic')
                    props.setShouldPopup(true)
                }}>Upload a picture!</button>
            </div>
        :
            <div className='profile-pic-container'>
                <img className='profile-pic' src = {user.image}></img>
            </div>
        }

        </>
    )
}

export default ProfilePic