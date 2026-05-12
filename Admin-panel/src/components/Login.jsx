import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onSubmithandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + "/api/admin/login",{email,password},{withCredentials:true})

           if (response.data.token) {
            setToken(response.data.token); 
            localStorage.setItem('token', response.data.token); 
            toast.success({ autoClose: 2000 }, response.data.message);
        } else {
            toast.error({ autoClose: 2000 }, response.data.message || "Login failed");
        }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error({ autoClose: 2000 }, "An error occurred while logging in.");
        }
    }
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-85">
        {/* Branding */}
        <form
        onSubmit={onSubmithandler}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900"> Admin <span className='text-blue-600'>Login</span></h2>
          
        </div>

        
          <div>
            <p className='text-sm font-medium text-gray-600 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-sm"
              required 
            />
          </div>

          <div>
            <p className='text-sm font-medium text-gray-600 mb-2'>Password</p>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all text-sm"
              required 
            />
          </div>

          <button 
           
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
    );
};


export default Login
