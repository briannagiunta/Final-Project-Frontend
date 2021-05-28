import './App.css';
import {useState, useEffect, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from './context/userContext'
import axios from 'axios'
import NavBar from './components/navBar'
import Home from './pages/home'
import Profile from './pages/profile'
import Matches from './pages/matches'
import Carousel from './pages/carousel'

function App() {
  const {userState, fetchUser} = useContext(UserContext)
  const [user, setUser] = userState
  const [form, setForm] = useState(null)
  const [shouldPopup, setShouldPopup] = useState(false)

  useEffect(()=>{fetchUser()},[])

  const togglePopup = () => {
    setShouldPopup(!shouldPopup)
  }

  return (

    <div className="App">
      <NavBar setForm={setForm} setShouldPopup={setShouldPopup}/>
      <Route exact path= '/' render={()=> {
        if(user.id){
          return <Redirect to='/dashboard'/>
        }else{
          return <Home form={form} setForm={setForm} shouldPopup={shouldPopup} togglePopup={togglePopup}/>
        } 
      }} />
      <Route exact path= '/dashboard' render={()=> {
        if(!user.id){
          return <Redirect to='/'/>
        }else{
          return <Carousel />
        }
      }} />
      <Route exact path= '/profile' render={()=>{
        if(!user.id){
          return <Redirect to='/'/>
        }else{
          return <Profile />
        }
      }} />
      <Route exact path= '/matches' render={()=> {
        if(!user.id){
          return <Redirect to='/'/>
        }else{
          return <Matches />
        }
      }} />
    </div>
  );
}

export default App;
