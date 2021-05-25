import './App.css';
import {useState, useEffect, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from './context/userContext'
import axios from 'axios'
import NavBar from './components/navBar'
import Home from './pages/home'
import Profile from './pages/profile'
import Matches from './pages/matches'

function App() {
  const {fetchUser} = useContext(UserContext)
  const [form, setForm] = useState(null)
  const [shouldPopup, setShouldPopup] = useState(false)

  useEffect(()=>{fetchUser()},[])

  const togglePopup = () => {
    setShouldPopup(!shouldPopup)
  }

  return (
    <div className="App">
      <NavBar setForm={setForm} setShouldPopup={setShouldPopup}/>
      <Route exact path= '/' render={()=><Home form={form} setForm={setForm} shouldPopup={shouldPopup} togglePopup={togglePopup}/>} />
      <Route exact path= '/profile' render={()=> <Profile />} />
      <Route exact path= '/matches' render={()=> <Matches />} />
    </div>
  );
}

export default App;
