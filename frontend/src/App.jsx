import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeInput from './components/HomeInput'
import Preview from './components/Preview'
import NotFound from './components/NotFound'

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<HomeInput/>} />
      <Route path='/preview' element={<Preview/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App