import Login from "./pages/Login"
import Register from "./pages/Register"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"
import OTPModal from "./components/OTPModal"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import BlogPost from "./pages/BlogPost"
import ResetPassword from "./components/ResetPassword"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <AuthContextProvider>
          <Nav />
          <OTPModal />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog-post" element={<BlogPost />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </AuthContextProvider>
      </Router>
    </div>
  )
}

export default App
