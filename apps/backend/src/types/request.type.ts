// ==================== AUTH ====================

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ==================== USER ====================

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  teamId?: number | null;
  role?: "ADMIN" | "MANAGER" | "MEMBER";
}

// ==================== TEAM ====================

export interface CreateTeamRequest {
  name: string;
  description: string;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
}

// ==================== PROJECT ====================

export interface CreateProjectRequest {
  name: string;
  description: string;
  teamId: number;
  status?: "PLANNING" | "ACTIVE" | "COMPLETED";
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  teamId?: number;
  status?: "PLANNING" | "ACTIVE" | "COMPLETED";
}

// ==================== PROJECT MEMBER ====================

export interface AddProjectMemberRequest {
  userId: number;
}

// ==================== TASK ====================

export interface CreateTaskRequest {
  title: string;
  description: string;
  assigneeId?: number | null;
  status?: "TODO" | "IN_PROGRESS" | "READY_FOR_REVIEW" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  assigneeId?: number | null;
  status?: "TODO" | "IN_PROGRESS" | "READY_FOR_REVIEW" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
}

// ==================== COMMENT ====================

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// ==================== QUERY ====================

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface TaskFilterQuery extends PaginationQuery {
  status?: "TODO" | "IN_PROGRESS" | "READY_FOR_REVIEW" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  assigneeId?: number;
}

export interface ProjectFilterQuery extends PaginationQuery {
  status?: "PLANNING" | "ACTIVE" | "COMPLETED";
  teamId?: number;
}
