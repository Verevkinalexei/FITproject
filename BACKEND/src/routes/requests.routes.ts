import express from "express";
import * as repo from "../repositories/requestsRepo";

const router = express.Router();

// GET /api/checkout-requests (Список або Пошук)
router.get("/", async (req, res, next) => {
  try {
    if (req.query.search) {
      // Якщо є параметр ?search=..., викликаємо вразливий пошук
      res.json({ data: await repo.searchDangerous(String(req.query.search)) });
      return;
    }
    res.json({ data: await repo.getAllRequests() });
  } catch (err) { next(err); }
});

// GET /api/checkout-requests/stats (Статистика)
router.get("/stats", async (req, res, next) => {
  try {
    res.json({ data: await repo.getStats() });
  } catch (err) { next(err); }
});

// POST /api/checkout-requests (Створення)
router.post("/", async (req, res, next) => {
  try {
    const { userId, equipmentId, dateFrom, dateTo, status, comment } = req.body;
    
    // Мінімальна валідація
    if (!userId || !equipmentId || !status) {
      return res.status(400).json({ error: "Обов'язкові поля відсутні" });
    }
    
    const created = await repo.createRequest(userId, equipmentId, dateFrom, dateTo, status, comment || "");
    res.status(201).json({ data: created });
  } catch (err) { next(err); } // UNIQUE конфлікти зловить errorHandler
});

export default router;