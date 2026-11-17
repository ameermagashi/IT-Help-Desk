
import { useState } from "react";

function TicketCard({ ticket, user, onUpdate }) {
  const [comment, setComment] = useState("");
  const isOfficer = user.role === "IT Officer";

  const nextStatus = {
    "Open": "In Progress",
    "In Progress": "Resolved",
  };

  function addComment() {
    if (comment.trim() === "") return; 
    const newComment = { by: user.name, text: comment };
    onUpdate(ticket.id, { comments: [...ticket.comments, newComment] });
    setComment("");
  }

  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <div>
        <span className="tag">{ticket.category}</span>{" "}
        <span className="tag">Priority: {ticket.priority}</span>{" "}
        <span className="tag">Status: {ticket.status}</span>
      </div>
      <p>{ticket.description}</p>
      <small>Created by: {ticket.ownerName}</small>

      
      {isOfficer && nextStatus[ticket.status] && (
        <button onClick={() => onUpdate(ticket.id, { status: nextStatus[ticket.status] })}>
          Move to {nextStatus[ticket.status]}
        </button>
      )}

    
      <div>
        <b>Comments:</b>
        {ticket.comments.length === 0 && <p>No comments yet.</p>}
        {ticket.comments.map((c, index) => (
          <p key={index}>💬 <b>{c.by}:</b> {c.text}</p>
        ))}
      </div>

      
      {isOfficer && (
        <div>
          <input placeholder="Write a resolution or comment" value={comment}
            onChange={(e) => setComment(e.target.value)} />
          <button onClick={addComment}>Add comment</button>
        </div>
      )}
    </div>
  );
}

function TicketList({ tickets, user, onUpdate }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");


  const shown = tickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || t.status === status;
    const matchPriority = priority === "All" || t.priority === priority;
    const matchCategory = category === "All" || t.category === category;
    return matchSearch && matchStatus && matchPriority && matchCategory;
  });

  return (
    <div>
      <div className="filters">
        <input placeholder="Search by title" value={search}
          onChange={(e) => setSearch(e.target.value)} />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option><option>Open</option>
          <option>In Progress</option><option>Resolved</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>All</option><option>Low</option>
          <option>Medium</option><option>High</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option><option>Software</option><option>Hardware</option>
          <option>Network</option><option>Other</option>
        </select>
      </div>

      <h3>Tickets ({shown.length})</h3>
      {shown.length === 0 && <p>No tickets found.</p>}

      <div className="list">
        {shown.map((t) => (
          <TicketCard key={t.id} ticket={t} user={user} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

export default TicketList;