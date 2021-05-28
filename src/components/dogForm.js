import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import axios from 'axios'

const DogForm = (props) =>{
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    const [name, setName] = useState(null)
    const [breed, setBreed] = useState(null)
    const [age, setAge] = useState(null)
    const [size, setSize] = useState(null)
    const [description, setDescription] = useState(null)
    const [file, setFile] = useState(null)

    const handleAdd = async (e)=>{
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/add-dog`,{name, breed, age, size, description},{
            headers:{
                Authorization: userId
            }
        })
        if (res.data.message === 'dog added'){
            uploadPic(userId,res.data.dog.id)
        }
    }
    const uploadPic = async (userId,dogId)=>{
        const picture = new FormData()
        picture.append('file',file)
        const config = {
            headers:{
                Authorization: userId,
                dogId: dogId,
                'content-type': 'multipart/form-data'
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/dog/upload`,picture,config)
        console.log(res);
        if (res.data.message === 'image uploaded'){
            setUser(res.data.user)
            props.togglePopup()
        }
    }

    const handleEdit = async (e) =>{ 
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/dog/edit`,{dogId: props.dog.id, name, breed, age, size, description},{headers:{Authorization:userId}})
        console.log(res);
        if(res.data.message === 'dog updated'){
            setUser(res.data.user)
            props.togglePopup()
        }
    }

    const checkForDoggo = () =>{
        if(props.dog){
            setName(props.dog.name)
            setBreed(props.dog.breed)
            setAge(props.dog.age)
            setSize(props.dog.size)
            setDescription(props.dog.description)
        }
    }
    useEffect(()=>{checkForDoggo()},[])
    
    return(
        <>
        {props.dog ? 
        <>
            <h1>Edit {props.dog.name}</h1>
            <form className='dog-form' onSubmit={(e)=>{handleEdit(e)}}>
            <input type='text' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required />
            <input type='text' placeholder='Breed' value={breed} onChange={(e)=>{setBreed(e.target.value)}} required />
            <input type='text' placeholder='Age' value={age} onChange={(e)=>{setAge(e.target.value)}} required />
            <select value={size} onChange={(e)=>{setSize(e.target.value)}} required>
                <option value = 'Small'>Small</option>
                <option value = 'Medium'>Medium</option>
                <option value = 'Large'>Large</option>
            </select>
            <input type='text' placeholder='Description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required />
            <input type='submit' value={`Edit ${props.dog.name}`}/>
        </form>
        </>
        :
        <>
        <h1>Add a Doggo!</h1>
        <form className='dog-form' onSubmit={(e)=>{handleAdd(e)}}>
            <input type='text' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} required />
            <input type='text' placeholder='Breed' value={breed} onChange={(e)=>{setBreed(e.target.value)}} required />
            <input type='text' placeholder='Age' value={age} onChange={(e)=>{setAge(e.target.value)}} required />
            <select value={size} onChange={(e)=>{setSize(e.target.value)}} required>
                <option value = 'Small'>Small</option>
                <option value = 'Medium'>Medium</option>
                <option value = 'Large'>Large</option>
            </select>
            <input type='text' placeholder='Description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required />
            <input type='file'onChange={(e)=>{setFile(e.target.files[0])}}  required />
            <input type='submit' value='Add Doggo'/>
        </form>
        </>
        }
        </>
    )
}

export default DogForm