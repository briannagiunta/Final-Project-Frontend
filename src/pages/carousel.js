
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import ReactSwipe from 'react-swipe';
import User from '../components/user'
import axios from 'axios';

const Carousel = () => {
    const {nearbyState, getNearby} = useContext(UserContext)
    const [nearbyUsers, setNearbyUsers] = nearbyState
    let reactSwipeEl;
    
    const handleLetsPlay = async (id) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/potential`,{
            user2_id: id
        },{
            headers:{
                Authorization: localStorage.getItem('userId')
            }
        })
        console.log(res);
    }
    
    useEffect(()=>{getNearby()},[])
  return (
    <div className = 'page-column'>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={el => (reactSwipeEl = el)}
        childCount={nearbyUsers.length}
      >
        {nearbyUsers.map(user=>
            <div key = {user.id}>
                <User user={user} />
            </div>
        )}

      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => handleLetsPlay(nearbyUsers[reactSwipeEl.getPos()].id)}>Lets Play!</button>
    </div>
  );
};
export default Carousel
