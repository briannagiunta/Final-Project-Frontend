import axios from "axios"
import {useContext, useState} from 'react'
import {UserContext} from '../context/userContext'

const Dog = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const removeDog =async () =>{
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/dog/remove`,{
            dogId: props.dog.id
        },{
            headers:{
                Authorization: localStorage.getItem('userId')
            }
        })
        if(res.data.message === 'dog removed'){
            setUser(res.data.user)
            props.togglePopup()
        }
    }

    return(
        <>
            {props.isPopup ?
                <div className='dog-popup'>
                    <img src={props.dog.image} className= 'dog-pic'></img>
                    <div>{props.dog.name}</div>
                    <div>{props.dog.age} years old</div>
                    <div>Size: {props.dog.size}</div>
                    <div>Breed: {props.dog.breed}</div>
                    <div>{props.dog.description}</div>
                    <button onClick={()=>{props.setEdit('edit-dog')}}>Edit {props.dog.name}</button>
                    <button onClick={()=>{removeDog()}}>Remove</button>
                </div> 
            : props.isSwipe ?

                <div className = 'dog-row-container'>
                    {props.i % 2 === 0 ?
                    <>
                    <div>
                        <img src={props.dog.image} className= 'dog-pic'></img>
                    </div>
                    <div>
                        <div>{props.dog.name}</div>
                        <div>{props.dog.age} years old</div>
                        <div>{props.dog.description}</div>
                    </div>
                    </>
                    :
                    <>
                    <div>
                        <div>{props.dog.name}</div>
                        <div>{props.dog.age} years old</div>
                        <div>{props.dog.description}</div>
                    </div>
                    <div>
                        <img src={props.dog.image} className= 'dog-pic'></img>
                    </div>
                    </>


                    
                
                    }
                </div>

            :
                <div className = 'dog'>
                    <img src={props.dog.image} className= 'dog-pic' onClick={()=>{
                        props.setEdit(null)
                        props.togglePopup(props.dog)
                    }}></img>
                    <div>{props.dog.name}</div>
                    <div>{props.dog.age} years old</div>
                </div>
            }
        </>
    )
}

export default Dog