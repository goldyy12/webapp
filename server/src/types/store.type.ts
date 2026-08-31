export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  type?: string;
  content?: string;
  latitude?: number;
  longitude?: number;
}

export type CreateStoreInput = Omit<Store, "id" | "createdAt">;
