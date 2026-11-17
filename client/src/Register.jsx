
import { useState } from "react";

function Register({ goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff"); 
  const [message, setMessage] = useState("");

  function handleRegister(e) {
    e.preventDefault(); 

  
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const emailTaken = users.find((u) => u.email === email);
    if (emailTaken) {
      setMessage("That email is already registered!");
      return;
    }

  
    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registered! You can log in now.");
  }

  return (
    <form className="box" onSubmit={handleRegister}>
      <h1>Register</h1>

      <input placeholder="Your name" value={name}
        onChange={(e) => setName(e.target.value)} required />

      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />

      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Staff</option>
        <option>IT Officer</option>
      </select>

      <button type="submit">Register</button>
      <p className="message">{message}</p>

      <p>
        Already have an account?{" "}
        <a href="#" onClick={goToLogin}>Log in</a>
      </p>
    </form>
  );
}

export default Register;