import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swaggerConfig.js";
import mongoose from "mongoose";
import AuthRouter from "./routes/authRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";
import webhookRouter from "./routes/webhook.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth/", AuthRouter);
app.use("/api/webhook/", webhookRouter);
app.use("/api/orders/", ordersRouter);

const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.DATABASE_URL;
mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`can\'t connet to Database due to err say ${err}`);
  });
