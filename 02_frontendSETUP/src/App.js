import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>

        <Nav/>

        <Routes>
          <Route path="/" element={<h1>Product Listing Component</h1>}/>
          <Route path="/add" element={<h1>Add Product Component</h1>}/>
          <Route path="/update" element={<h1>Update Product Component</h1>}/>
          <Route path="/logout" element={<h1>Logout Product Component</h1>}/>
          <Route path="/profile" element={<h1>Profile Product Component</h1>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>

      </BrowserRouter>

      <Footer/>

    </div>
  )
}

export default App
