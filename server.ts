import express, { Request } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { confirmRedisConnection } from "./utils/redis";
import { apiRouter } from "./routers/api.route";
import { createAdmin } from "./services/admin.service";

//Env configuration
config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1", apiRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to the API");
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  // await confirmRedisConnection();
  await createAdmin();
});
