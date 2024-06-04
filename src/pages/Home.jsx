import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dataActive= useSelector((state) => {
    return state.activeSlice;
  });
  console.log(dataActive.active);

  return (
    <div className='home'>
      <div className="container">
        <Sidebar active={dataActive.active}/>
        <Chat active={dataActive.active}/>
      </div>
    </div>
  )
}

export default Home