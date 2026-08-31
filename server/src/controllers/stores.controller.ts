import { type Request, type Response } from "express";
import { z } from "zod";
import {
  searchStores,
  getStoreById,
  createStore as createStoreService,
} from "../services/stores.service.js";

const getStoresQuerySchema = z.object({
  city: z.string().min(1, "City is required"),
  street: z.string().optional(),
});

const getStoreParamsSchema = z.object({
  id: z.coerce.number().int().positive("Invalid store ID"),
});

const createStoreSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  type: z.string().optional(),
  content: z.string().optional(),
});

export async function getStores(req: Request, res: Response) {
  const result = getStoresQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: result.error.issues[0]?.message ?? "Invalid input" });
  }

  const { city, street } = result.data;
  const stores = await searchStores(city, street);
  res.json(stores);
}

export async function getStoreByIdHandler(req: Request, res: Response) {
  const result = getStoreParamsSchema.safeParse(req.params);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: result.error.issues[0]?.message ?? "Invalid input" });
  }

  const store = await getStoreById(result.data.id);
  if (!store) {
    return res.status(404).json({ error: "Store not found" });
  }

  res.json(store);
}

export async function createStoreHandler(req: Request, res: Response) {
  const result = createStoreSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: result.error.issues[0]?.message ?? "Invalid input" });
  }

  const newStore = await createStoreService(result.data);
  res.status(201).json(newStore);
}
