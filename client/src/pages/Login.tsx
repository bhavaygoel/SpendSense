import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  async function handleLogOut() {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      console.log("Logged out successfully");
      // Clear the user data in state or context
    }
  }
  
  async function handleLogin(e: React.FormEvent) {
    console.log("Requested for login");
    
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      }
    });
    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      localStorage.setItem('token', token);
    }
    setSuccess(true)
  }
  if(success){
    return <Navigate to="/" />
  }
  return (
    <>
      <form onSubmit={handleLogin} action="" className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              type="email" 
                              name="email" 
                              id="email" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }} 
                              type="password" 
                              name="password" 
                              id="password" 
                              placeholder="••••••••" 
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <Button type="submit">Sign in</Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                </div>
            </div>
        </div>
    </form>
      
    </>
  );
}

export default Login;
