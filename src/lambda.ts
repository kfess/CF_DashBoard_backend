import "module-alias/register";
import { checkEnvVars } from "@/utils/checkEnvVars";
import serverlessExpress from "@vendia/serverless-express";
import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";

checkEnvVars();

const app = express();

app.use(
  compression({
    level: 6,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://hj71unck7g.execute-api.ap-northeast-1.amazonaws.com/dev",
    credentials: true,
  })
);
app.use(router);

export const handler = serverlessExpress({ app });
