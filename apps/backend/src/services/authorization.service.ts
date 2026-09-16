import { AppError } from "../utils/app-error";
import * as projectMemberRepo
  from "../repositories/project-member.repository";

export const requireProjectRole = async (
  userId: number,
  projectId: number,
  roles: string[]
) => {
  const member =
    await projectMemberRepo.findProjectMember(
      projectId,
      userId
    );

  if (!member) {
    throw new AppError(
      "You are not a member of this project",
      403
    );
  }

  if (!roles.includes(member.role)) {
    throw new AppError(
      "You do not have permission to perform this action",
      403
    );
  }

  return member;
};