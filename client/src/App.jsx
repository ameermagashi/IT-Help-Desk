
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CreateTicket from "./CreateTicket";
import TicketList from "./TicketList";

function App() {
  const [page, setPage] = useState("login"); 
  const [user, setUser] = useState(null); 


  const [tickets, setTickets] = useState(
    JSON.parse(localStorage.getItem("tickets")) || []
  );

  function saveTickets(newList) {
    setTickets(newList);
    localStorage.setItem("tickets", JSON.stringify(newList));
  }

  function addTicket(ticket) {
    saveTickets([...tickets, ticket]);
  }

  function updateTicket(id, changes) {
    const newList = tickets.map((t) =>
      t.id === id ? { ...t, ...changes } : t
    );
    saveTickets(newList);
  }

  if (!user) {
    return page === "login" ? (
      <Login onLogin={setUser} goToRegister={() => setPage("register")} />
    ) : (
      <Register goToLogin={() => setPage("login")} />
    );
  }

  const myTickets =
    user.role === "IT Officer"
      ? tickets
      : tickets.filter((t) => t.ownerEmail === user.email);

  return (
    <div className="page">
      <div className="topbar">
        <h2>IT Help Desk</h2>
        <span>{user.name} ({user.role})</span>
        <button onClick={() => setUser(null)}>Log out</button>
      </div>

      <Dashboard tickets={myTickets} />

    
      {user.role === "Staff" && (
        <CreateTicket user={user} onCreate={addTicket} />
      )}

      <TicketList tickets={myTickets} user={user} onUpdate={updateTicket} />
    </div>
  );
}

export default App;