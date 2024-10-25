import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>

        <Nav/>

        <Routes>

          {/* All other route are inside PrivateComponent, to ensure that the user must be signup to view these content */}
          <Route element={<PrivateComponent/>}>
            <Route path="/" element={<h1>Product Listing Component</h1>}/>
            <Route path="/add" element={<AddProduct/>}/>
            <Route path="/update" element={<h1>Update Product Component</h1>}/>
            <Route path="/logout" element={<h1>Logout Product Component</h1>}/>
            <Route path="/profile" element={<h1>Profile Product Component</h1>}/>
          </Route>

          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>

        </Routes>

      </BrowserRouter>

      <Footer/>

    </div>
  )
}

export default App
