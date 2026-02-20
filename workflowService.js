import { collaborationTasks, teamMembers, workflowSteps } from "./collaborationData";

export const getOwnerName = (ownerId) => {
  const owner = teamMembers.find((member) => member.id === ownerId);
  return owner ? owner.name : "Unassigned";
};

export const getOpenTaskCount = () =>
  collaborationTasks.filter((task) => task.status !== "Done").length;

export const getCompletedWorkflowCount = () =>
  workflowSteps.filter((step) => step.completed).length;

export const getWorkflowProgressLabel = () => {
  const completed = getCompletedWorkflowCount();
  return `${completed}/${workflowSteps.length} steps completed`;
};
