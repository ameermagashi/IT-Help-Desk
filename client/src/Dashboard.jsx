
function Dashboard({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="stats">
      <div className="stat"><h2>{total}</h2><p>Total</p></div>
      <div className="stat"><h2>{open}</h2><p>Open</p></div>
      <div className="stat"><h2>{inProgress}</h2><p>In Progress</p></div>
      <div className="stat"><h2>{resolved}</h2><p>Resolved</p></div>
    </div>
  );
}

export default Dashboard;