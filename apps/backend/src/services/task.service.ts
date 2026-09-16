import * as taskRepo from '../repositories/task.repository';
import * as projectRepo from '../repositories/project.repository';
import { getPriority } from '../utils/priority';
import { AppError } from '../utils/app-error';
import {cacheService} from '../shared/cache/cache.service';
import { Task } from '../generated/prisma/client';

export const createTask = async (projectId: number,assigneeId: number,title: string,description: string,priority: string,dueDate: Date,createdBy: number) => {
    const _priority = getPriority(priority);
    const task = await taskRepo.add(projectId,assigneeId,title,description,_priority,new Date(dueDate),createdBy);
    return task;
}

export const getTaskById = async (projectId: number,id: number) => {
    const project = await projectRepo.getById(projectId);
    if(!project){
        throw new AppError("Project not found",404)
    }
    const cacheTask = await cacheService.get<Task>(
    `task:${id}`
    );
    if(cacheTask){
        return cacheTask;
    }
    const task = await taskRepo.getById(id);
    if(!task){
        throw new AppError("Task not found",404)
    }
    await cacheService.set<Task>(
        `task:${id}`,
        task,
        60
    );
    return task;
}

export const getTasksByProjectId = async (projectId: number) => {
    const project = await projectRepo.getById(projectId);
    if(!project){
        throw new AppError("Project not found",404)
    }
    const tasks = await taskRepo.getByProjectId(projectId);
    return tasks;
}