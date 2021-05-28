
import Dog from './dog'
import LogSign from './log-sign'
import Upload from './uploadForm'
import AboutForm from './aboutForm'
import DogForm from './dogForm'
import {Link} from 'react-router-dom'


const Popup = (props) =>{
    return(
        <div className='popup'>
            <div className='close-div'>
                <button onClick={()=>{props.togglePopup({})}}className='close'>X</button>
            </div>
            {props.form &&
            <div className = 'pop-container'>
                <LogSign form = {props.form} setForm = {props.setForm} togglePopup={props.togglePopup}/>
            </div>
            }
            {props.dog && !props.edit &&
                <Dog dog={props.dog} isPopup setEdit={props.setEdit} togglePopup={props.togglePopup} />
            }
            {props.dog && props.edit === 'edit-dog' &&
                <DogForm dog={props.dog} togglePopup={props.togglePopup}/>
            }
            {props.edit === 'profile-pic' &&
                <Upload togglePopup={props.togglePopup}/>
            }
            {props.edit === 'about' &&
                <AboutForm edit={props.edit} togglePopup={props.togglePopup}/>
            }
            {props.edit === 'add-dog' && 
                <DogForm togglePopup={props.togglePopup}/>
            }
            {props.match && 
            <>
                <h1>Its a match!</h1>
                <div>{props.user.name} thinks your pups would get along great too!</div>
                <Link to= '/matches'>View Matches</Link>
            </>
            }
            {props.viewuser && 
                <div className='dogs-popup-container'>
                    <div>{props.user.name}'s dogs</div>
                    <div className='dogs-popup'>
                        {props.user.dogs.map((dog,i)=>
                        <Dog dog={dog} i={i} isSwipe />
                        )}
                    </div>
                </div>
            }

        </div>
    )
}

export default Popup