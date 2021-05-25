import {useContext} from 'react'
import {UserContext} from '../context/userContext'
import Dog from './dog'

const Dogs = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    return(
        <div className='dogs'>              
            {user.dogs && user.dogs.map(d=>
                <Dog key={d.id} dog={d} togglePopup={props.togglePopup} setEdit={props.setEdit}/>    
            )}
        </div>
    )
}

export default Dogs