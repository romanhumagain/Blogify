// import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost";
import ResetPassword from "./components/ResetPassword";
import Footer from "./components/Footer";
import Notification from "./pages/Notification";
import SideBar from "./components/SideBar";
import PopularSection from "./components/PopularSection";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Message from "./pages/Message";
import { useAuth } from "./context/AuthContext";
import BlogDetails from "./pages/BlogDetails";
import UpdatePost from "./pages/UpdatePost";
import ArchivePost from "./pages/ArchivePost";
import SavedPost from "./pages/SavedPost";
import LoadingBar from 'react-top-loading-bar'
import { useBlog } from "./context/BlogContext";

function AppRoutes() {
  const { user } = useAuth();
  const {progress,setProgress} = useBlog();

  return (
    <div className="bg-slate-50 dark:bg-neutral-900 min-h-screen">
    <LoadingBar
        color='#f23426'
        progress={progress}
        shadow={true}
       height={3}
        onLoaderFinished={() => setProgress(0)}
      />

      {user ? (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2">
            <SideBar />
          </div>
          <div className="col-span-7 dark:bg-neutral-900 ml-5">
            <main>
              <Routes>
                <Route path="/" element={<Home setProgress = {setProgress}/>} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog-post" element={<BlogPost />} />
                <Route path="/message" element={<Message />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog-details/:slug" element={<BlogDetails />} />
                <Route path="/update-post/:slug" element={<UpdatePost />} />
                <Route path="/archive-post-details" element={<ArchivePost />} />
                <Route path="/saved-post-details" element={<SavedPost />} />
              </Routes>
            </main>
          </div>
          <div className="hidden md:block col-span-3 dark:bg-neutral-900">
            <PopularSection />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen dark:bg-neutral-800">
          <Nav />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
}

export default AppRoutes;
