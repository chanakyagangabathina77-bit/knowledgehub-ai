import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(cors());

app.use(helmet());

if (env.ENABLE_HTTP_LOGS) {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "KnowledgeHub AI Backend Running 🚀",
  });
});

app.use("/api", routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;