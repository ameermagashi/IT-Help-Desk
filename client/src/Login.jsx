
import { useState } from "react";

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  
  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

  
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      onLogin(found); // tell App who logged in
    } else {
      setMessage("Wrong email or password.");
    }
  }

  return (
    <form className="box" onSubmit={handleLogin}>
      <h1>Login</h1>

      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required />

      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Login</button>
      <p className="message">{message}</p>

      <p>
        No account yet?{" "}
        <a href="#" onClick={goToRegister}>Register</a>
      </p>
    </form>
  );
}

export default Login;