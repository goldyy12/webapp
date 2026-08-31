export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  content?: string;
}
