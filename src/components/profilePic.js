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
                <div className='edit-div'>
                    <img onClick={()=>{
                    props.setEdit('profile-pic')
                    props.setShouldPopup(true)
                }} className='edit' src = 'https://www.pngfind.com/pngs/m/275-2755033_edit-png-file-on-phone-svg-edit-icon.png'/>
                </div>
                <img className='profile-pic' src = {user.image}></img>
            </div>
        }

        </>
    )
}

export default ProfilePic