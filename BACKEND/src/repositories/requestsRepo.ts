import { all, get, run, escapeSqlString } from "../db/dbClient";

// 1. Отримання списку з JOIN (підтягуємо ім'я юзера і назву заліза)
export async function getAllRequests() {
  return await all(`
    SELECT r.id, r.dateFrom, r.dateTo, r.status, r.comment, r.createdAt,
           u.name AS userName, e.name AS equipmentName
    FROM CheckoutRequests r
    JOIN Users u ON u.id = r.userId
    JOIN Equipment e ON e.id = r.equipmentId
    ORDER BY r.id DESC;
  `);
}

// 2. Агрегація: рахуємо статистику по статусах
export async function getStats() {
  return await all(`
    SELECT status, COUNT(*) as total
    FROM CheckoutRequests
    GROUP BY status;
  `);
}

// 3. Створення нової заявки (сира конкатенація без параметрів)
export async function createRequest(userId: number, equipmentId: number, dateFrom: string, dateTo: string, status: string, comment: string) {
  const safeComment = escapeSqlString(comment);
  const now = new Date().toISOString();
  
  const result = await run(`
    INSERT INTO CheckoutRequests (userId, equipmentId, dateFrom, dateTo, status, comment, createdAt)
    VALUES (${Number(userId)}, ${Number(equipmentId)}, '${dateFrom}', '${dateTo}', '${status}', '${safeComment}', '${now}');
  `);
  
  return await get(`SELECT * FROM CheckoutRequests WHERE id = ${result.lastID};`);
}

// 4. Вразливий пошук (навмисно для демонстрації SQL-ін'єкцій)
export async function searchDangerous(query: string) {
  return await all(`
    SELECT * FROM CheckoutRequests
    WHERE comment LIKE '%${query}%'
    ORDER BY id DESC;
  `);
}