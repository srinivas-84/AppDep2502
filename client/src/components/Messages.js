import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';

function Messages() {
  let userDetails = useSelector((store)=>{
        return store.userDetails;
    })
  return (
    <div>
        <TopNavigation/>
        <h1>Dashboard</h1>
        <h1>{userDetails.firstName} {userDetails.lastName}</h1>
        <h1>{userDetails.mobileNo}</h1>
        <img src={`/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Messages