import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./database";
import cors from "cors";
import limiter from "./middleware/ratelimiter";
import routes from "./routes";
import { logger, errorResponder, invalidPathHandler } from "./middleware";
import LinkService from "./services/link.service";
import AppError from "./utils/error";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

dotenv.config();
const port = process.env.PORT || 8000;
const app: Express = express();
//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use(cors());
app.use(express.json({ extended: false } as any));
app.use(limiter());
app.use(logger);

//connect to db
connectDB(() => console.log("check anything"));
//these are our routes
app.use("/api/v1", routes);
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from express + ts");
});

app.get("/:slug", async (_req: Request, res: Response, next: NextFunction) => {
  const { slug } = _req.params;
  try {
    const link = await LinkService.findOne({ slug });
    if (!link) throw new AppError(404, "link record not found");
    return res.redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
});

app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
