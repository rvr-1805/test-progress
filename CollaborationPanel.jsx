import React from "react";
import { collaborationTasks } from "./collaborationData";
import { getOwnerName } from "./workflowService";

const CollaborationPanel = () => {
  return (
    <div style={styles.card}>
      <h3>Collaboration Tasks</h3>
      {collaborationTasks.map((task) => (
        <div key={task.id} style={styles.taskRow}>
          <div>
            <strong>{task.title}</strong>
            <p style={styles.meta}>Owner: {getOwnerName(task.ownerId)}</p>
          </div>
          <div style={styles.rightCol}>
            <span style={styles.badge}>{task.status}</span>
            <small>{task.dueDate}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    marginTop: "18px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "14px",
    background: "#ffffff",
  },
  taskRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f0f0f0",
    padding: "10px 0",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  badge: {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "999px",
    background: "#eef2ff",
    color: "#3730a3",
  },
  meta: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },
};

export default CollaborationPanel;
