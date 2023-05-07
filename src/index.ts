import "module-alias/register";
import { checkEnvVars } from "@/utils/checkEnvVars";
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(router);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
