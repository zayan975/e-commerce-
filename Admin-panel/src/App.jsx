import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddItems from './pages/AddItems'
import ListItems from './pages/ListItems'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto my-8 ml-[max(5vw,25px)] text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<AddItems  />} />
                <Route path='/list' element={<ListItems  />} />
                <Route path='/orders' element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App; 