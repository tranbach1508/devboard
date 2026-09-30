export interface TaskCreatedEvent {
  eventId: string;
  eventType: "task.created";
  occurredAt: string;
  payload: {
    taskId: number;
    assigneeId: number | null;
    title: string;
  };
}