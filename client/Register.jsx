// Register page - made with AI assistance (Claude)
import { useState } from "react";

function Register({ goToLogin }) {
  // Little boxes that remember what the person types
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff"); // Staff or IT Officer
  const [message, setMessage] = useState("");

  // This runs when the person clicks the Register button
  function handleRegister(e) {
    e.preventDefault(); // stops the page from refreshing

    // Get the saved users (or an empty list if none yet)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if this email is already used
    const emailTaken = users.find((u) => u.email === email);
    if (emailTaken) {
      setMessage("That email is already registered!");
      return;
    }

    // Add the new user to the list and save it
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