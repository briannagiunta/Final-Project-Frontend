
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import ReactSwipe from 'react-swipe';
import User from '../components/user'
import axios from 'axios';
import Popup from '../components/popup'

const Carousel = () => {
    const {nearbyState, getNearby} = useContext(UserContext)
    const [nearbyUsers, setNearbyUsers] = nearbyState
    const [shouldPopup, setShouldPopup] = useState(false)
    const [currentSwipe, setCurrentSwipe] = useState(null)
    let reactSwipeEl;

    const togglePopup = () =>{
        setShouldPopup(!shouldPopup)
    }
    
    const handleLetsPlay = async (user) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/potential`,{
            user2_id: user.id
        },{
            headers:{
                Authorization: localStorage.getItem('userId')
            }
        })
        console.log(res);
        if(res.data.message === 'potential match created'){
            getNearby()
        }else if(res.data.message === 'users matched'){
            setCurrentSwipe(user)
            setShouldPopup('match')
            getNearby()
        }
    }
    
    useEffect(()=>{getNearby()},[])
    useEffect(()=>{setShouldPopup(false)},[])
  return (
<>
    {shouldPopup === 'match' && 
        <Popup match user={currentSwipe} togglePopup={togglePopup}/>
    }
    {shouldPopup === 'view-user' && 
        <Popup viewuser user={currentSwipe} togglePopup={togglePopup}/>
    }
    <div className = 'page-column'>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={el => (reactSwipeEl = el)}
        childCount={nearbyUsers.length}
      >
        {nearbyUsers.map(user=>
            <div key = {user.id}>
                <User setShouldPopup={setShouldPopup} setCurrentSwipe={setCurrentSwipe} user={user} />
            </div>
        )}

      </ReactSwipe>
      <div className='swipe-buttons'>
        <button onClick={() => reactSwipeEl.prev()}>Previous</button>
        <button onClick={() => reactSwipeEl.next()}>Next</button>
      </div>
      <button onClick={() => handleLetsPlay(nearbyUsers[reactSwipeEl.getPos()])}>Lets Play!</button>
    </div>
</>
  );
};
export default Carousel
