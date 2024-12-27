import React from 'react'
import { Navigate } from 'react-router-dom'

const Private = ({ isAuthenticated, children }) => {
    
  return isAuthenticated ? children : <Navigate to='/login' />
}

export default Private
