import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import axios from 'axios'
import Popup from '../components/popup'


const Home = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState

    return(
        <>
        {props.shouldPopup === true && 
            <Popup form = {props.form} setForm = {props.setForm} togglePopup={props.togglePopup}/>      
        }

           <div className='home-pic'>
           </div>


        </>
    )
}

export default Home