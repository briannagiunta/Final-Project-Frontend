import './App.css';
import {useState, useEffect, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from './context/userContext'
import axios from 'axios'
import NavBar from './components/navBar'
import Home from './pages/home'

function App() {
  const {fetchUser} = useContext(UserContext)
  const [form, setForm] = useState(null)

  useEffect(()=>{fetchUser()},[])

  return (
    <div className="App">
      <NavBar setForm={setForm} />
      <Route exact path= '/' render={()=><Home form={form} setForm={setForm} />} />

    </div>
  );
}

export default App;
