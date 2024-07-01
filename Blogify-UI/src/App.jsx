import Login from "./pages/Login"
import Register from "./pages/Register"
import Nav from "./components/Nav"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"
import OTPModal from "./components/OTPModal"
import { useState } from "react"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import BlogPost from "./pages/BlogPost"

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Nav />
          <OTPModal/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog-post" element={<BlogPost />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App
