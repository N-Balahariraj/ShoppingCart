import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home'
import Login from './components/login'
import Product from './components/Product'
import Register from './components/Register'


function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>}></Route>
        <Route path="/register" element={<Register setUser={setUser}/>}></Route>
        <Route path="/home" element={<Home user={user} setUser={setUser}/>}></Route>
        {user && <Route path="/home/shop" element={<Product user={user} setUser={setUser}/>}></Route>}
      </Routes>
    </Router>
  )
}

export default App
