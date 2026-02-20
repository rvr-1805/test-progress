export const teamMembers = [
  { id: 1, name: "Aarav", role: "Admin" },
  { id: 2, name: "Nisha", role: "Coordinator" },
  { id: 3, name: "Vikram", role: "Trainer" },
];

export const collaborationTasks = [
  {
    id: "COL-101",
    title: "Review monthly fee follow-ups",
    ownerId: 2,
    status: "In Progress",
    dueDate: "2026-02-25",
  },
  {
    id: "COL-102",
    title: "Approve trainer attendance report",
    ownerId: 1,
    status: "Pending",
    dueDate: "2026-02-23",
  },
  {
    id: "COL-103",
    title: "Publish batch update notes",
    ownerId: 3,
    status: "Done",
    dueDate: "2026-02-20",
  },
];

export const workflowSteps = [
  { id: "W1", name: "Plan", completed: true },
  { id: "W2", name: "Assign", completed: true },
  { id: "W3", name: "Execute", completed: false },
  { id: "W4", name: "Review", completed: false },
];
