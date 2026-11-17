
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function App() {
  // "page" remembers which screen to show: "login" or "register"
  const [page, setPage] = useState("login");

  // "user" remembers who is logged in (empty = nobody)
  const [user, setUser] = useState(null);

  // If somebody is logged in, show a welcome message
  if (user) {
    return (
      <div className="box">
        <h1>Welcome, {user.name}</h1>
        <p>Your role is: <b>{user.role}</b></p>
        <button onClick={() => setUser(null)}>Log out</button>
      </div>
    );
  }

  // If nobody is logged in, show login or register
  return (
    <div>
      {page === "login" ? (
        <Login onLogin={setUser} goToRegister={() => setPage("register")} />
      ) : (
        <Register goToLogin={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;