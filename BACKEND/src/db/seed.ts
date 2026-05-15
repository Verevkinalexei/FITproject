import { run } from "./dbClient";
import { migrate } from "./migrate";

async function seed() {
  await migrate(); // Гарантуємо, що таблиці є
  const now = new Date().toISOString();

  console.log("Заповнюємо базу тестовими даними...");

  // INSERT OR IGNORE ігнорує помилку, якщо такий запис вже є
  await run(`INSERT OR IGNORE INTO Users (id, email, name, createdAt) VALUES (1, 'student@knu.ua', 'Студент', '${now}');`);
  await run(`INSERT OR IGNORE INTO Equipment (id, itemCode, name, createdAt) VALUES (1, 'MAC-01', 'MacBook Pro M1', '${now}');`);
  
  await run(`
    INSERT OR IGNORE INTO CheckoutRequests (id, userId, equipmentId, dateFrom, dateTo, status, comment, createdAt) 
    VALUES (1, 1, 1, '2026-05-15', '2026-05-20', 'New', 'Лаба 3', '${now}');
  `);

  console.log("Готово! База заповнена.");
}

seed().catch(err => {
  console.error("Помилка сідеру:", err);
  process.exit(1);
});