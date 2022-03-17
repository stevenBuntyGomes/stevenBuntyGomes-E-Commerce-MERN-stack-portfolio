import React, {Fragment, useEffect} from 'react';
import MetaData from '../layouts/MetaData';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../layouts/Loader/Loader'
import './Profile.css'


function Profile() {
  const history = useNavigate();
  const {user, loading, isAuthenticated} = useSelector(state => state.user);
  useEffect(() => {
    if(isAuthenticated===false){
      history(`/login`);
    }
  }, [history, isAuthenticated]);

  return(
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
          <MetaData title = {`${user.name}'s Profile`}/>
          <div className='profileContainer'>
            <div>
                <h1>My Pforfile</h1>
                {
                  user.avatar && (
                    <img src = {user.avatar.url} alt = {user.name}/>
                  )
                }
                
                <Link to = "/me/update">Edit Profile</Link>
            </div>
            <div>
                <div className=''>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div className=''>
                  <h4>Full Name</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to = "/orders">My Orders</Link>
                  <Link to = "/password/update">Change Password</Link>
                </div>
            </div>
          </div>
      </Fragment>
      )}
    </Fragment>
  ) 
  
  
}

export default Profile;
