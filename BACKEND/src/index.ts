import express from "express";
import apiRoutes from "./routes/api.routes";
import { requestLogger } from "./middlewares/logger.middleware";
import { errorHandler, ApiError } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);
app.use("/api", apiRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "NOT_FOUND", `Route ${req.method} ${req.url} not found`));
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API Server started on http://localhost:${PORT}`);
  });
}

export default app;