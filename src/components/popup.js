import Dog from './dog'
import LogSign from './log-sign'
import Upload from './uploadForm'
import AboutForm from './aboutForm'
import DogForm from './dogForm'

const Popup = (props) =>{

    return(
        <div className='popup'>
            <div className='close-div'>
                <button onClick={()=>{props.togglePopup({})}}className='close'>X</button>
            </div>
            {props.form &&
                <LogSign form = {props.form} setForm = {props.setForm} getNearby={props.getNearby} togglePopup={props.togglePopup}/>
            }
            {props.dog && props.edit !== 'edit-dog' &&
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

        </div>
    )
}

export default Popup