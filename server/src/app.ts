import express from "express";
import cors from "cors";
import storesRouter from "./routes/stores.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/stores", storesRouter);

export default app;
