import { checkEnvVars } from "./utils/checkEnvVars";
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
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(router);

// test
app.get("/test", function (req, res) {
  res.send("Hello from Contests!");
});

// Execute the main function if this file is run directly
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// Export the handler for Lambda function
export const handler = serverlessExpress({ app });
