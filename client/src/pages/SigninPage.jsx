import React from 'react'
import SignIn from '../components/SignIn'
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'

const SigninPage = () => {
  const {isAuthenticated,currentUser} = useSelector(state => state.auth);
  return (
    <div>
        {/* {isAuthenticated ? currentUser.accountType === "Student" ? <Navigate to="/" /> : <Navigate to="/teacher" />  : <SignIn />} */}
        {isAuthenticated ? <Navigate to="/" /> : <SignIn />}
    </div>
  )
}

export default SigninPage