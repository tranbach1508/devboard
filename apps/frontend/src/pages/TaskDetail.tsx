import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../config/env";
import "./TaskDetail.css";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  assignee: User | null;
  memberCreated: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
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

export default function TaskDetail() {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("devBoardAccessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Không thể tải thông tin task");
        return res.json();
      })
      .then((data) => setTask(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate, projectId, taskId]);

  if (loading) return <div className="detail-loading">Đang tải...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!task) return <div className="detail-error">Không tìm thấy task</div>;

  return (
    <div className="task-detail-container">
      <div className="task-detail-nav">
        <Link to={`/projects/${projectId}/tasks`} className="btn-back">
          ← Quay lại
        </Link>
      </div>

      <div className="task-detail-card">
        <div className="task-detail-header">
          <h1>{task.title}</h1>
          <div className="task-detail-badges">
            <span
              className="badge-status"
              style={{ background: STATUS_COLORS[task.status] }}
            >
              {STATUS_LABELS[task.status]}
            </span>
            <span
              className="badge-priority"
              style={{ borderColor: PRIORITY_COLORS[task.priority], color: PRIORITY_COLORS[task.priority] }}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
        </div>

        <p className="task-detail-description">{task.description}</p>

        <div className="task-detail-info">
          <div className="info-row">
            <span className="info-label">Người tạo</span>
            <span className="info-value">{task.memberCreated.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Người thực hiện</span>
            <span className="info-value">
              {task.assignee ? task.assignee.name : "Chưa giao"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Hạn chót</span>
            <span className="info-value">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("vi-VN")
                : "Không có"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Ngày tạo</span>
            <span className="info-value">
              {new Date(task.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Cập nhật</span>
            <span className="info-value">
              {new Date(task.updatedAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      <div className="task-comments-section">
        <h2>Bình luận ({task.comments.length})</h2>

        {task.comments.length === 0 ? (
          <p className="comments-empty">Chưa có bình luận nào</p>
        ) : (
          <div className="comments-list">
            {task.comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-avatar">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="comment-meta">
                    <span className="comment-author">{comment.user.name}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
