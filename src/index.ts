import "module-alias/register";
import express from "express";
import cors from "cors";
import contestsRouter from "./routes/contestRoutes";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/contests", contestsRouter);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
