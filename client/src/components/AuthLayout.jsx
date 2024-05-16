import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthLayout = ({children}) => {
    const currentUser = useSelector(state => state.auth.currentUser);
  return currentUser ? children : <Navigate to="/signin" />
}

export default AuthLayout