import { Router } from "express";
import {
  createStoreHandler,
  getStoreByIdHandler,
  getStores,
} from "../controllers/stores.controller.js";

const router = Router();
router.get("/", getStores);
router.get("/:id", getStoreByIdHandler);
router.post("/add", createStoreHandler);

export default router;
