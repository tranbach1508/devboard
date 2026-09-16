import { Request, Response } from "express";
import * as teamSrv from "../services/team.service";

export const getTeamById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const team = await teamSrv.getTeamById(id);
    res.status(200).json({
        sucess: true,
        data: team
    })
}

export const getTeams = async (req: Request, res: Response) => {
    const page = Number(req.query.page);
    const perPage = Number(req.query.per_page);
    const teams = await teamSrv.getTeams(page, perPage);
    res.status(200).json({
        sucess: true,
        data: teams
    })
}