import axios from "axios";
import { type Store } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchStores(
  city: string,
  street?: string,
): Promise<Store[]> {
  const res = await axios.get<Store[]>(API_URL, {
    params: { city, street: street || undefined },
  });
  return res.data;
}

export async function createStore(store: {
  name: string;
  address: string;
  city: string;
  type?: string;
  content?: string;
}): Promise<Store> {
  const res = await axios.post<Store>(API_URL + "/add", store);
  return res.data;
}

export async function fetchStoreById(id: number): Promise<Store> {
  const res = await axios.get<Store>(`${API_URL}/${id}`);
  return res.data;
}
