import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStores } from "../api/stores";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const CITIES = ["Prishtina", "Ferizaj", "Gjilan", "Prizren", "Peja"];

export default function Home() {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();

  const {
    data: stores = [],
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stores", city, street],
    queryFn: () => fetchStores(city, street),
    enabled: false,
  });

  function handleSearch() {
    setSearchTriggered(true);
    if (!city) return;
    refetch();
  }

  function handleClick(id: number) {
    navigate(`/store/${id}`);
  }

  return (
    <div>
      <h1 className="home-title">Store Locator</h1>

      <div className="search-bar">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search street name (optional)"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {!city && searchTriggered && (
        <p className="form-message error">Select a city to search.</p>
      )}
      {isFetching && <p className="status-text">Loading...</p>}
      {error && (
        <p className="form-message error">Something went wrong. Try again.</p>
      )}

      <ul className="store-list">
        {stores.map((store) => (
          <li
            key={store.id}
            className="store-card"
            onClick={() => handleClick(store.id)}
          >
            <span className="store-name">{store.name}</span>
            <span className="store-meta">
              Rruga {store.address}, {store.city}
              {store.type ? ` · ${store.type}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
