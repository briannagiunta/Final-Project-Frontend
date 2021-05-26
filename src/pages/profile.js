import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'
import Dogs from '../components/dogs'
import Popup from '../components/popup'
import ProfilePic from '../components/profilePic'
import About from '../components/about'

const Profile = () =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [shouldPopup, setShouldPopup] = useState(false)
    const [dog, setDog] = useState(null)
    const [edit, setEdit] = useState(null)

    const togglePopup = (doggo) =>{
        if (doggo){
            setDog(doggo)
        }
        setShouldPopup(!shouldPopup)
    }
    
    return(
    <>
        {shouldPopup === true && dog &&
            <Popup dog={dog} togglePopup={togglePopup} edit={edit} setEdit={setEdit} />       
        }
        {shouldPopup === true && edit && !dog &&
            <Popup edit={edit} togglePopup={togglePopup} />       
        }
        <div className = 'page-column'>
            <div className='content'>
                <div className='top'>
                    <ProfilePic setEdit={setEdit} setShouldPopup={setShouldPopup}/>
                    <About setEdit={setEdit} setShouldPopup={setShouldPopup} />
                </div>

                <div className='bottom'>
                    <h3>Dogs</h3>
                    <Dogs togglePopup={togglePopup} setEdit={setEdit} setDog={setDog}/>
                    <button onClick={()=>{
                        setDog(null)
                        setEdit('add-dog')
                        togglePopup()
                    }}>Add a Doggo</button>
                </div>

            </div>      
        </div>
    </>
    )
}

export default Profile