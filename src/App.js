import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './api/Login'
import Register from './api/Login/Register'
import './App.css'

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </React.Fragment>
  )
}
export default App