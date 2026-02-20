import React from "react";
import { workflowSteps } from "./collaborationData";
import {
  getOpenTaskCount,
  getWorkflowProgressLabel,
} from "./workflowService";

const WorkflowTracker = () => {
  return (
    <div style={styles.card}>
      <h3>Workflow Progress</h3>
      <p style={styles.summary}>{getWorkflowProgressLabel()}</p>
      <p style={styles.summary}>Open tasks: {getOpenTaskCount()}</p>

      <div style={styles.stepsContainer}>
        {workflowSteps.map((step) => (
          <div key={step.id} style={styles.stepRow}>
            <span>{step.name}</span>
            <span style={{ color: step.completed ? "green" : "#b45309" }}>
              {step.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>
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
  summary: {
    margin: "6px 0",
    color: "#374151",
  },
  stepsContainer: {
    marginTop: "10px",
  },
  stepRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f3f4f6",
    padding: "8px 0",
  },
};

export default WorkflowTracker;
