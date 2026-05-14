import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
export const UserController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try { res.json({ items: UserService.getAll() }); } catch (e) { next(e); }
  },
  getById: (req: Request, res: Response, next: NextFunction) => {
    try { res.json(UserService.getById(req.params.id)); } catch (e) { next(e); }
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(UserService.create(req.body)); } catch (e) { next(e); }
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    try { res.json(UserService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try { UserService.delete(req.params.id); res.status(204).send(); } catch (e) { next(e); }
  }
};