import {env} from "../src/config/env"
import bcrypt from 'bcrypt';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, ProjectStatus, TaskStatus, Priority } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: env.databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Xóa dữ liệu cũ
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();

  // ==================== TEAMS ====================
  const teams = await Promise.all([
    prisma.team.create({ data: { name: "Frontend Team", description: "Team phát triển giao diện người dùng" } }),
    prisma.team.create({ data: { name: "Backend Team", description: "Team phát triển hệ thống backend" } }),
    prisma.team.create({ data: { name: "DevOps Team", description: "Team quản lý hạ tầng và CI/CD" } }),
    prisma.team.create({ data: { name: "QA Team", description: "Team kiểm thử chất lượng phần mềm" } }),
    prisma.team.create({ data: { name: "Design Team", description: "Team thiết kế UI/UX" } }),
  ]);

  const [teamFE, teamBE, teamDevOps, teamQA, teamDesign] = teams;

  // ==================== USERS ====================
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const users = await Promise.all([
    // Admin & Managers
    prisma.user.create({ data: { name: "Nguyễn Văn Admin", email: "admin@example.com", passwordHash, role: Role.ADMIN, teamId: teamFE.id } }),
    prisma.user.create({ data: { name: "Trần Thị Manager", email: "manager1@example.com", passwordHash, role: Role.MANAGER, teamId: teamFE.id } }),
    prisma.user.create({ data: { name: "Lê Hoàng Manager", email: "manager2@example.com", passwordHash, role: Role.MANAGER, teamId: teamBE.id } }),
    prisma.user.create({ data: { name: "Phạm Minh Lead", email: "lead1@example.com", passwordHash, role: Role.MANAGER, teamId: teamDevOps.id } }),

    // Frontend Members
    prisma.user.create({ data: { name: "Hoàng Văn React", email: "react.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamFE.id } }),
    prisma.user.create({ data: { name: "Đỗ Thị Vue", email: "vue.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamFE.id } }),
    prisma.user.create({ data: { name: "Ngô Bá Angular", email: "angular.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamFE.id } }),
    prisma.user.create({ data: { name: "Vũ Thị CSS", email: "css.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamFE.id } }),

    // Backend Members
    prisma.user.create({ data: { name: "Đinh Văn Node", email: "node.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamBE.id } }),
    prisma.user.create({ data: { name: "Bùi Thị Python", email: "python.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamBE.id } }),
    prisma.user.create({ data: { name: "Lý Văn Go", email: "go.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamBE.id } }),
    prisma.user.create({ data: { name: "Mai Thị Java", email: "java.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamBE.id } }),

    // DevOps Members
    prisma.user.create({ data: { name: "Trịnh Văn Docker", email: "docker.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamDevOps.id } }),
    prisma.user.create({ data: { name: "Hồ Thị K8s", email: "k8s.dev@example.com", passwordHash, role: Role.MEMBER, teamId: teamDevOps.id } }),

    // QA Members
    prisma.user.create({ data: { name: "Đặng Văn Test", email: "qa1@example.com", passwordHash, role: Role.MEMBER, teamId: teamQA.id } }),
    prisma.user.create({ data: { name: "Nguyễn Thị QA", email: "qa2@example.com", passwordHash, role: Role.MEMBER, teamId: teamQA.id } }),

    // Design Members
    prisma.user.create({ data: { name: "Lê Văn Figma", email: "design1@example.com", passwordHash, role: Role.MEMBER, teamId: teamDesign.id } }),
    prisma.user.create({ data: { name: "Phạm Thị UI", email: "design2@example.com", passwordHash, role: Role.MEMBER, teamId: teamDesign.id } }),
  ]);

  const [admin, manager1, manager2, lead1, reactDev, vueDev, angularDev, cssDev, nodeDev, pythonDev, goDev, javaDev, dockerDev, k8sDev, qa1, qa2, designer1, designer2] = users;

  // ==================== PROJECTS ====================
  const projects = await Promise.all([
    prisma.project.create({ data: { name: "Website E-commerce", description: "Xây dựng website bán hàng online với React", status: ProjectStatus.ACTIVE, teamId: teamFE.id, createdBy: admin.id } }),
    prisma.project.create({ data: { name: "Mobile App", description: "Phát triển ứng dụng di động cross-platform", status: ProjectStatus.ACTIVE, teamId: teamFE.id, createdBy: manager1.id } }),
    prisma.project.create({ data: { name: "API Gateway", description: "Xây dựng API Gateway cho microservices", status: ProjectStatus.ACTIVE, teamId: teamBE.id, createdBy: manager2.id } }),
    prisma.project.create({ data: { name: "Auth Service", description: "Dịch vụ xác thực và phân quyền tập trung", status: ProjectStatus.PLANNING, teamId: teamBE.id, createdBy: manager2.id } }),
    prisma.project.create({ data: { name: "Notification System", description: "Hệ thống thông báo real-time", status: ProjectStatus.PLANNING, teamId: teamBE.id, createdBy: lead1.id } }),
    prisma.project.create({ data: { name: "CI/CD Pipeline", description: "Thiết lập pipeline CI/CD cho toàn bộ dự án", status: ProjectStatus.ACTIVE, teamId: teamDevOps.id, createdBy: lead1.id } }),
    prisma.project.create({ data: { name: "Monitoring Dashboard", description: "Dashboard giám sát hệ thống", status: ProjectStatus.COMPLETED, teamId: teamDevOps.id, createdBy: admin.id } }),
    prisma.project.create({ data: { name: "Design System", description: "Xây dựng hệ thống thiết kế thống nhất", status: ProjectStatus.ACTIVE, teamId: teamDesign.id, createdBy: manager1.id } }),
  ]);

  const [projEcom, projMobile, projGateway, projAuth, projNotif, projCICD, projMonitor, projDesign] = projects;

  // ==================== PROJECT MEMBERS ====================
  await prisma.projectMember.createMany({
    data: [
      // E-commerce
      { projectId: projEcom.id, userId: admin.id },
      { projectId: projEcom.id, userId: manager1.id },
      { projectId: projEcom.id, userId: reactDev.id },
      { projectId: projEcom.id, userId: vueDev.id },
      { projectId: projEcom.id, userId: cssDev.id },
      { projectId: projEcom.id, userId: nodeDev.id },
      { projectId: projEcom.id, userId: designer1.id },

      // Mobile App
      { projectId: projMobile.id, userId: manager1.id },
      { projectId: projMobile.id, userId: reactDev.id },
      { projectId: projMobile.id, userId: angularDev.id },
      { projectId: projMobile.id, userId: designer2.id },

      // API Gateway
      { projectId: projGateway.id, userId: manager2.id },
      { projectId: projGateway.id, userId: nodeDev.id },
      { projectId: projGateway.id, userId: goDev.id },
      { projectId: projGateway.id, userId: javaDev.id },

      // Auth Service
      { projectId: projAuth.id, userId: manager2.id },
      { projectId: projAuth.id, userId: nodeDev.id },
      { projectId: projAuth.id, userId: pythonDev.id },

      // Notification System
      { projectId: projNotif.id, userId: lead1.id },
      { projectId: projNotif.id, userId: goDev.id },
      { projectId: projNotif.id, userId: javaDev.id },

      // CI/CD Pipeline
      { projectId: projCICD.id, userId: lead1.id },
      { projectId: projCICD.id, userId: dockerDev.id },
      { projectId: projCICD.id, userId: k8sDev.id },

      // Monitoring Dashboard
      { projectId: projMonitor.id, userId: admin.id },
      { projectId: projMonitor.id, userId: lead1.id },
      { projectId: projMonitor.id, userId: dockerDev.id },
      { projectId: projMonitor.id, userId: reactDev.id },

      // Design System
      { projectId: projDesign.id, userId: manager1.id },
      { projectId: projDesign.id, userId: designer1.id },
      { projectId: projDesign.id, userId: designer2.id },
      { projectId: projDesign.id, userId: cssDev.id },
    ],
  });

  // ==================== TASKS ====================
  const tasks = await Promise.all([
    // E-commerce Tasks
    prisma.task.create({ data: { title: "Thiết kế trang chủ", description: "Thiết kế giao diện trang chủ với banner, sản phẩm nổi bật", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-15"), projectId: projEcom.id, createdBy: admin.id, assigneeId: reactDev.id } }),
    prisma.task.create({ data: { title: "Tạo component Header", description: "Phát triển component header responsive với navigation", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-10"), projectId: projEcom.id, createdBy: manager1.id, assigneeId: cssDev.id } }),
    prisma.task.create({ data: { title: "Tích hợp thanh toán VNPay", description: "Tích hợp cổng thanh toán VNPay cho giỏ hàng", status: TaskStatus.TODO, priority: Priority.HIGH, dueDate: new Date("2025-09-20"), projectId: projEcom.id, createdBy: admin.id, assigneeId: nodeDev.id } }),
    prisma.task.create({ data: { title: "Thiết kế trang sản phẩm", description: "Layout trang chi tiết sản phẩm với gallery ảnh", status: TaskStatus.IN_PROGRESS, priority: Priority.MEDIUM, dueDate: new Date("2025-09-12"), projectId: projEcom.id, createdBy: designer1.id, assigneeId: vueDev.id } }),
    prisma.task.create({ data: { title: "API quản lý đơn hàng", description: "Xây dựng RESTful API cho CRUD đơn hàng", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-09-01"), projectId: projEcom.id, createdBy: manager1.id, assigneeId: nodeDev.id } }),
    prisma.task.create({ data: { title: "Tối ưu SEO", description: "Thêm meta tags, structured data, sitemap", status: TaskStatus.TODO, priority: Priority.LOW, projectId: projEcom.id, createdBy: admin.id, assigneeId: reactDev.id } }),

    // Mobile App Tasks
    prisma.task.create({ data: { title: "Setup React Native project", description: "Khởi tạo project React Native với Expo", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-25"), projectId: projMobile.id, createdBy: manager1.id, assigneeId: reactDev.id } }),
    prisma.task.create({ data: { title: "Thiết kế màn hình Login", description: "UI/UX cho màn hình đăng nhập và đăng ký", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-08"), projectId: projMobile.id, createdBy: designer2.id, assigneeId: angularDev.id } }),
    prisma.task.create({ data: { title: "Push Notification", description: "Tích hợp Firebase Cloud Messaging", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-25"), projectId: projMobile.id, createdBy: manager1.id, assigneeId: reactDev.id } }),
    prisma.task.create({ data: { title: "Offline mode", description: "Hỗ trợ xem dữ liệu khi mất kết nối", status: TaskStatus.TODO, priority: Priority.LOW, projectId: projMobile.id, createdBy: manager1.id, assigneeId: angularDev.id } }),

    // API Gateway Tasks
    prisma.task.create({ data: { title: "Thiết kế kiến trúc Gateway", description: "Thiết kế kiến trúc microservices gateway với rate limiting", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-28"), projectId: projGateway.id, createdBy: manager2.id, assigneeId: goDev.id } }),
    prisma.task.create({ data: { title: "Implement rate limiter", description: "Triển khai rate limiting với sliding window algorithm", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-10"), projectId: projGateway.id, createdBy: manager2.id, assigneeId: goDev.id } }),
    prisma.task.create({ data: { title: "Service discovery", description: "Tích hợp Consul cho service discovery", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-18"), projectId: projGateway.id, createdBy: manager2.id, assigneeId: javaDev.id } }),
    prisma.task.create({ data: { title: "Load balancing", description: "Cấu hình load balancing với round-robin", status: TaskStatus.TODO, priority: Priority.MEDIUM, projectId: projGateway.id, createdBy: manager2.id, assigneeId: nodeDev.id } }),

    // Auth Service Tasks
    prisma.task.create({ data: { title: "Thiết kế database schema", description: "Thiết kế schema cho hệ thống quản lý users và roles", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-30"), projectId: projAuth.id, createdBy: manager2.id, assigneeId: pythonDev.id } }),
    prisma.task.create({ data: { title: "API xác thực người dùng", description: "Xây dựng API login, register, logout với JWT", status: TaskStatus.READY_FOR_REVIEW, priority: Priority.HIGH, dueDate: new Date("2025-09-05"), projectId: projAuth.id, createdBy: nodeDev.id, assigneeId: pythonDev.id } }),
    prisma.task.create({ data: { title: "OAuth2 integration", description: "Hỗ trợ đăng nhập bằng Google, GitHub", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-20"), projectId: projAuth.id, createdBy: manager2.id, assigneeId: nodeDev.id } }),
    prisma.task.create({ data: { title: "Refresh token mechanism", description: "Triển khai refresh token rotation", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-12"), projectId: projAuth.id, createdBy: manager2.id, assigneeId: nodeDev.id } }),

    // Notification System Tasks
    prisma.task.create({ data: { title: "Thiết kế message queue", description: "Thiết kế hệ thống message queue với RabbitMQ", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-09-01"), projectId: projNotif.id, createdBy: lead1.id, assigneeId: goDev.id } }),
    prisma.task.create({ data: { title: "WebSocket server", description: "Xây dựng WebSocket server cho real-time notifications", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-15"), projectId: projNotif.id, createdBy: lead1.id, assigneeId: javaDev.id } }),
    prisma.task.create({ data: { title: "Email notification service", description: "Tích hợp gửi email thông báo qua SMTP", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-22"), projectId: projNotif.id, createdBy: lead1.id, assigneeId: goDev.id } }),

    // CI/CD Pipeline Tasks
    prisma.task.create({ data: { title: "Setup GitHub Actions", description: "Cấu hình GitHub Actions cho CI pipeline", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-20"), projectId: projCICD.id, createdBy: lead1.id, assigneeId: dockerDev.id } }),
    prisma.task.create({ data: { title: "Docker containerization", description: "Tạo Dockerfile cho tất cả services", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-25"), projectId: projCICD.id, createdBy: lead1.id, assigneeId: dockerDev.id } }),
    prisma.task.create({ data: { title: "Kubernetes deployment", description: "Viết K8s manifests cho production deployment", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-10"), projectId: projCICD.id, createdBy: lead1.id, assigneeId: k8sDev.id } }),
    prisma.task.create({ data: { title: "Helm charts", description: "Tạo Helm charts cho easier deployment", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-20"), projectId: projCICD.id, createdBy: lead1.id, assigneeId: k8sDev.id } }),

    // Monitoring Dashboard Tasks
    prisma.task.create({ data: { title: "Setup Grafana", description: "Cài đặt và cấu hình Grafana dashboard", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-15"), projectId: projMonitor.id, createdBy: admin.id, assigneeId: dockerDev.id } }),
    prisma.task.create({ data: { title: "Prometheus metrics", description: "Tích hợp Prometheus cho thu thập metrics", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-18"), projectId: projMonitor.id, createdBy: lead1.id, assigneeId: dockerDev.id } }),
    prisma.task.create({ data: { title: "Custom dashboard UI", description: "Xây dựng dashboard UI với React", status: TaskStatus.DONE, priority: Priority.MEDIUM, dueDate: new Date("2025-08-25"), projectId: projMonitor.id, createdBy: admin.id, assigneeId: reactDev.id } }),

    // Design System Tasks
    prisma.task.create({ data: { title: "Define color palette", description: "Định nghĩa bảng màu chính cho hệ thống", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-20"), projectId: projDesign.id, createdBy: manager1.id, assigneeId: designer1.id } }),
    prisma.task.create({ data: { title: "Typography system", description: "Thiết kế hệ thống typography thống nhất", status: TaskStatus.DONE, priority: Priority.HIGH, dueDate: new Date("2025-08-22"), projectId: projDesign.id, createdBy: manager1.id, assigneeId: designer2.id } }),
    prisma.task.create({ data: { title: "Component library", description: "Xây dựng thư viện component với Storybook", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, dueDate: new Date("2025-09-15"), projectId: projDesign.id, createdBy: manager1.id, assigneeId: cssDev.id } }),
    prisma.task.create({ data: { title: "Icon set", description: "Thiết kế bộ icon thống nhất", status: TaskStatus.TODO, priority: Priority.MEDIUM, dueDate: new Date("2025-09-20"), projectId: projDesign.id, createdBy: designer1.id, assigneeId: designer2.id } }),
    prisma.task.create({ data: { title: "Dark mode support", description: "Hỗ trợ dark mode cho toàn bộ component", status: TaskStatus.TODO, priority: Priority.LOW, projectId: projDesign.id, createdBy: manager1.id, assigneeId: cssDev.id } }),
  ]);

  // ==================== COMMENTS ====================
  await prisma.comment.createMany({
    data: [
      // Comments cho E-commerce tasks
      { taskId: tasks[0].id, userId: admin.id, content: "Banner nên sử dụng hình ảnh có kích thước 1920x600" },
      { taskId: tasks[0].id, userId: reactDev.id, content: "Đã hoàn thành phần layout, đang chờ design assets" },
      { taskId: tasks[0].id, userId: designer1.id, content: "Design assets đã upload lên Figma, anh check giúp em" },
      { taskId: tasks[2].id, userId: nodeDev.id, content: "VNPay sandbox đã setup xong, cần merchant info từ admin" },
      { taskId: tasks[2].id, userId: admin.id, content: "Đã gửi merchant info qua email, check giúp anh" },
      { taskId: tasks[3].id, userId: vueDev.id, content: "Gallery ảnh đang dùng react-image-gallery, cần custom lại CSS" },
      { taskId: tasks[4].id, userId: nodeDev.id, content: "API đã hoàn thành, docs tại /api-docs" },
      { taskId: tasks[4].id, userId: manager1.id, content: "Đã review, approve. Merge vào develop nhé" },

      // Comments cho Mobile App tasks
      { taskId: tasks[6].id, userId: reactDev.id, content: "Expo SDK 50 đã setup, chạy ổn định trên cả iOS và Android" },
      { taskId: tasks[7].id, userId: designer2.id, content: "Design login screen đã xong, có 2 вариations: light và dark" },
      { taskId: tasks[7].id, userId: angularDev.id, content: "Đã implement xong UI, đang tích hợp API" },

      // Comments cho API Gateway tasks
      { taskId: tasks[10].id, userId: goDev.id, content: "Kiến trúc đã review với team, mọi người đồng ý" },
      { taskId: tasks[11].id, userId: goDev.id, content: "Sliding window algorithm implement xong, đang viết benchmark" },
      { taskId: tasks[11].id, userId: manager2.id, content: "Benchmark results looks good, 10k req/s với latency < 5ms" },

      // Comments cho Auth Service tasks
      { taskId: tasks[14].id, userId: pythonDev.id, content: "Schema đã được approve, có thể bắt đầu implement" },
      { taskId: tasks[15].id, userId: pythonDev.id, content: "Đã implement xong JWT, cần review lại phần refresh token" },
      { taskId: tasks[15].id, userId: nodeDev.id, content: "Code review: nên thêm rate limiting cho API login" },
      { taskId: tasks[15].id, userId: pythonDev.id, content: "Đã thêm rate limiting: 5 attempts per 15 minutes" },
      { taskId: tasks[17].id, userId: nodeDev.id, content: "Refresh token rotation đã implement, đang viết test" },

      // Comments cho Notification tasks
      { taskId: tasks[18].id, userId: goDev.id, content: "RabbitMQ cluster đã setup với 3 nodes" },
      { taskId: tasks[19].id, userId: javaDev.id, content: "WebSocket server chạy ổn với 10k concurrent connections" },
      { taskId: tasks[19].id, userId: lead1.id, content: "Tuyệt vời! Chuẩn bị cho load testing nhé" },

      // Comments cho CI/CD tasks
      { taskId: tasks[21].id, userId: dockerDev.id, content: "GitHub Actions workflow đã push, chạy test tự động mỗi PR" },
      { taskId: tasks[22].id, userId: dockerDev.id, content: "Dockerfile cho tất cả 5 services đã tạo xong" },
      { taskId: tasks[22].id, userId: k8sDev.id, content: "Image size đã optimize, giảm 40% nhờ multi-stage build" },
      { taskId: tasks[23].id, userId: k8sDev.id, content: "K8s manifests đang viết, namespace đã tạo cho dev/staging/prod" },

      // Comments cho Design System tasks
      { taskId: tasks[27].id, userId: designer1.id, content: "Color palette đã define: primary, secondary, neutral, semantic colors" },
      { taskId: tasks[27].id, userId: manager1.id, content: "Màu primary nên có thêm shade 50-900 cho flexibility" },
      { taskId: tasks[29].id, userId: cssDev.id, content: "Đã tạo 15 components cơ bản trong Storybook" },
      { taskId: tasks[29].id, userId: designer2.id, content: "Button variants cần thêm size: xs, sm, md, lg, xl" },
      { taskId: tasks[29].id, userId: cssDev.id, content: "Đã thêm đầy đủ size variants, check lại giúp em" },
    ],
  });

  console.log("Seed data created successfully!");
  console.log({
    teams: teams.length,
    users: users.length,
    projects: projects.length,
    projectMembers: 32,
    tasks: tasks.length,
    comments: 30,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
