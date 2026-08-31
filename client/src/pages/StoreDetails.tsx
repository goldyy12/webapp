import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreById } from "../api/stores";
import "./StoreDetails.css";

export default function StoreDetails() {
  const { id } = useParams();
  const storeId = id ? Number(id) : undefined;

  const {
    data: store,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => fetchStoreById(storeId!),
    enabled: !!storeId,
  });

  if (isLoading) return <p className="status-text">Loading...</p>;
  if (error || !store)
    return <p className="form-message error">Store not found.</p>;

  return (
    <div className="details-card">
      <h1 className="details-title">{store.name}</h1>
      <p className="details-meta">
        Rruga {store.address}, {store.city}
      </p>
      {store.type && <span className="details-type">{store.type}</span>}
      {store.content && <p className="details-content">{store.content}</p>}
    </div>
  );
}
