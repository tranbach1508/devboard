import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../config/env";
import "./ListTask.css";

interface Assignee {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  assignee: Assignee | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  READY_FOR_REVIEW: "Review",
  DONE: "Done",
};

const STATUS_COLORS: Record<string, string> = {
  TODO: "#6b7280",
  IN_PROGRESS: "#3b82f6",
  READY_FOR_REVIEW: "#f59e0b",
  DONE: "#10b981",
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Thấp",
  MEDIUM: "Trung bình",
  HIGH: "Cao",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#6b7280",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
};

export default function ListTask() {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("devBoardAccessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(`${API_URL}/projects/${projectId}/tasks`)

    fetch(`${API_URL}/projects/${projectId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Không thể tải danh sách task");
        return res.json();
      })
      .then((data) => setTasks(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate, projectId]);

  if (loading) return <div className="task-loading">Đang tải...</div>;
  if (error) return <div className="task-error">{error}</div>;

  return (
    <div className="list-task-container">
      <div className="list-task-header">
        <h1>Danh sách Task</h1>
        <Link to={`/projects/${projectId}/tasks/create`} className="btn-create">
          + Tạo Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="task-empty">
          <p>Chưa có task nào</p>
          <Link to={`/projects/${projectId}/tasks/create`} className="btn-create">
            Tạo task đầu tiên
          </Link>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <h3>{task.title}</h3>
                <span
                  className="task-status"
                  style={{ background: STATUS_COLORS[task.status] }}
                >
                  {STATUS_LABELS[task.status]}
                </span>
              </div>

              <p className="task-description">{task.description}</p>

              <div className="task-meta">
                <span
                  className="task-priority"
                  style={{ color: PRIORITY_COLORS[task.priority] }}
                >
                  {PRIORITY_LABELS[task.priority]}
                </span>

                {task.assignee && (
                  <span className="task-assignee">
                    {task.assignee.name}
                  </span>
                )}

                {task.dueDate && (
                  <span className="task-due">
                    {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
