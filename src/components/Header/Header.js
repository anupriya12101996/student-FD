import React from 'react'
import './Header.css'
import profilePic from '../../../src/images/profile-pic.png';
import { useSelector } from 'react-redux';

const Header = () => {
  const userSelector = useSelector(state => state.user.email);
  const handleLogout = () => {
    localStorage.removeItem('email');
    window.location.href = "/login";
  }
  return (
    <div className='header-holder'>
        <h1 className='header-heading'>TUNICALABS MEDIA</h1>
        {userSelector && (<div className='profile-show'>
            <span className='notification-holder'>
              <i className="far fa-bell"></i>
              <span>1</span>
            </span>
            <div onClick={handleLogout}>
              <img className='profile-image' src={profilePic} alt='profile'/>
              <h4>Steve</h4>
              <i className="fas fa-chevron-down"></i>
            </div>
        </div>)}
    </div>
  )
}

export default Header;