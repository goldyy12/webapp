import prisma from "../../db.js";
import { type Store, type CreateStoreInput } from "../types/store.type.js";

export async function searchStores(city: string, street?: string) {
  return prisma.store.findMany({
    where: {
      city: { equals: city, mode: "insensitive" },
      ...(street ? { address: { contains: street, mode: "insensitive" } } : {}),
    },
  });
}

export async function getStoreById(id: number) {
  return prisma.store.findUnique({
    where: { id },
  });
}

export async function createStore(data: CreateStoreInput) {
  return prisma.store.create({
    data,
  });
}
