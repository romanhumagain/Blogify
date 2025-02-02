import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"
import AppRoutes from './AppRoutes'
import BlogContextProvider from "./context/BlogContext"
import ProfileContextProvider from './context/ProfileContext'
import CommentContextProvider from "./context/CommentContext"

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-800">
      <Router>
        <AuthContextProvider>
          <BlogContextProvider>
            <ProfileContextProvider>
              <CommentContextProvider>
                <AppRoutes />
              </CommentContextProvider>
            </ProfileContextProvider>
          </BlogContextProvider>
        </AuthContextProvider>
      </Router>

    </div>
  )
}

export default App
