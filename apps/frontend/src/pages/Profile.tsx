import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/env";
import "./Profile.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  teamId: number | null;
  createdAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("devBoardAccessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("devBoardAccessToken");
            navigate("/login");
            return;
          }
          throw new Error("Không thể tải thông tin");
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data.data.user);
      })
      .catch((err) => setError(err.message));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("devBoardAccessToken");
    navigate("/login");
  };

  if (error) return <div className="profile-error">{error}</div>;
  if (!user) return <div className="profile-loading">Đang tải...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1>{user.name}</h1>
        <span className={`profile-role role-${user.role.toLowerCase()}`}>
          {user.role}
        </span>

        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">User ID</span>
            <span className="profile-value">#{user.id}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Team ID</span>
            <span className="profile-value">{user.teamId ?? "Chưa có"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Ngày tạo</span>
            <span className="profile-value">
              {new Date(user.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>

        <button className="profile-logout" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
