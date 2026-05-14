import { Request, Response, NextFunction } from "express";
import { CheckoutService } from "../services/checkout.service";
export const CheckoutController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try { res.json({ items: CheckoutService.getAll(req.query) }); } catch (e) { next(e); }
  },
  getById: (req: Request, res: Response, next: NextFunction) => {
    try { res.json(CheckoutService.getById(req.params.id)); } catch (e) { next(e); }
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(CheckoutService.create(req.body)); } catch (e) { next(e); }
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    try { res.json(CheckoutService.update(req.params.id, req.body)); } catch (e) { next(e); }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try { CheckoutService.delete(req.params.id); res.status(204).send(); } catch (e) { next(e); }
  }
};