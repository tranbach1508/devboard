import * as projectRepo from '../repositories/project.repository';
import * as projectMemRepo from '../repositories/project-member.repository';
import { AppError } from '../utils/app-error';

export const getProject = async (id: number) => {
    const project = await projectRepo.getById(id);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    return project;
};

export const getProjectMembers = async (id: number) => {
    const project = await projectRepo.getById(id);
    if (!project) {
        throw new AppError('Project not found', 404);
    }
    const members = await projectMemRepo.getMembersByProjectId(id);
    return members;
};
