import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/env";
import "./CreateTask.css";

interface Member {
  id: number;
  role: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

interface TaskForm {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assigneeId: string;
  dueDate: string;
}

export default function CreateTask() {
  const { projectId } = useParams<{ projectId: string }>();
  const [form, setForm] = useState<TaskForm>({
    title: "",
    description: "",
    priority: "MEDIUM",
    assigneeId: "",
    dueDate: "",
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("devBoardAccessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/projects/${projectId}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Không thể tải danh sách thành viên");
        return res.json();
      })
      .then((data) => setMembers(data.data))
      .catch((err) => setError(err.message));
  }, [navigate, projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("devBoardAccessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          priority: form.priority,
          assigneeId: form.assigneeId ? Number(form.assigneeId) : null,
          dueDate: form.dueDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Tạo task thất bại");
      }

      alert("Tạo task thành công!");
      setForm({
        title: "",
        description: "",
        priority: "MEDIUM",
        assigneeId: "",
        dueDate: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-card">
        <h1>Tạo Task mới</h1>
        <p className="create-task-subtitle">Điền thông tin task bên dưới</p>

        {error && <div className="create-task-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề task"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết task"
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Ưu tiên</label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="LOW">Thấp</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HIGH">Cao</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="assigneeId">Người thực hiện</label>
              <select
                id="assigneeId"
                name="assigneeId"
                value={form.assigneeId}
                onChange={handleChange}
              >
                <option value="">-- Chọn người thực hiện --</option>
                {members.map((member) => (
                  <option key={member.user.id} value={member.user.id}>
                    {member.user.name} ({member.user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Hạn chót</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Hủy
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
