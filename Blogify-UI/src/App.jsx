import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"
import AppRoutes from './AppRoutes'
import BlogContextProvider from "./context/BlogContext"

function App() {
  return (
    <div className="bg-slate-50 dark:bg-neutral-800 min-h-screen">
      <Router>
        <AuthContextProvider>
          <BlogContextProvider>
                <AppRoutes />
          </BlogContextProvider>
        </AuthContextProvider>
      </Router>

    </div>
  )
}

export default App
