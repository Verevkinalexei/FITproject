import express from "express";
import { migrate } from "./db/migrate";
import requestsRoutes from "./routes/requests.routes";
// ... імпорт роутів та errorHandler

const app = express();
app.use(express.json());
app.use("/api/checkout-requests", requestsRoutes);

// Підключення твоїх роутів
// app.use("/api/checkout-requests", requestsRoutes);

// app.use(errorHandler);

const PORT = 3000;

async function bootstrap() {
  await migrate(); 

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`API Server started on http://localhost:${PORT}`);
    });
  }
}

bootstrap().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});

export default app;