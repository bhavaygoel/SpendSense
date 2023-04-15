import React, { useState } from "react";
import { useCookies } from "react-cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include", // Include credentials in the request (cookies)
    });
    if (response.ok) {
      const user = await response.json();
      // Store the user data in state or context
    }
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form onSubmit={handleLogin} action="">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <button>Submit</button>
      </form>
      <button onClick={handleLogOut}>Logout</button>
    </>
  );
}

export default Login;
