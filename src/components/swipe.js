import ReactSwipe from 'react-swipe';

const Carousel = (props) => {
  let reactSwipeEl;

  return (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >

       {/* { props.users.map(user=>
        <div key={user.id}>{user.name}</div>
      )} */}
        <div>PANE 1</div>
        <div>PANE 2</div>
        <div>PANE 3</div>
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
    </div>
  );
};

export default Carousel