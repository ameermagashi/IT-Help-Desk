
import { useState } from "react";

function CreateTicket({ user, onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Software");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  function handleSubmit(e) {
    e.preventDefault();


    const ticket = {
      id: Date.now(),        
      title: title,
      category: category,
      description: description,
      priority: priority,
      status: "Open",         
      ownerName: user.name,   
      ownerEmail: user.email,
      comments: [],           
    };

    onCreate(ticket);

    setTitle("");
    setDescription("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Create a ticket</h3>

      <input placeholder="Title" value={title}
        onChange={(e) => setTitle(e.target.value)} required />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Software</option>
        <option>Hardware</option>
        <option>Network</option>
        <option>Other</option>
      </select>

      <textarea placeholder="Describe the problem" value={description}
        onChange={(e) => setDescription(e.target.value)} required />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button type="submit">Submit ticket</button>
    </form>
  );
}

export default CreateTicket;