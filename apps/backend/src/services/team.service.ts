import * as teamRepo from '../repositories/team.repository';
import { AppError } from '../utils/app-error';

export const getTeamById = async (id: number) => {
    const team = await teamRepo.findTeamById(id);
    if(!team){
        throw new AppError("Team not found",404);
    }
    return team;
}

export const getTeams = async (page: number, perPage: number) => {
    const teams = await teamRepo.getTeams(page,perPage);
    if(!teams){
        throw new AppError("Teams not found",404);
    }
    return teams;
}