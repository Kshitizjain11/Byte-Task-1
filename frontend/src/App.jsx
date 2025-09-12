import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeInput from './components/HomeInput'
import Preview from './components/Preview'

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<HomeInput/>} />
      <Route path='/preview' element={<Preview/>} />
    </Routes>
  )
}

export default App