import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
        }),
        headers: {
            "Content-type": "application/json",
        },
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }
  
  return (
    <>
      <form onSubmit={handleRegister} action="">
        <label htmlFor="firstName">First Name</label>
        <input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
        />
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
    </>
  );
}

export default Register;
