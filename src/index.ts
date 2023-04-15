import "module-alias/register";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(router);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
