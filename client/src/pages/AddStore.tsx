import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStore } from "../api/stores.js";
import "./AddStore.css";

const CITIES = ["Prishtina", "Ferizaj", "Gjilan", "Prizren", "Peja"];

export default function AddStore() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      setName("");
      setAddress("");
      setCity("");
      setType("");
      setContent("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !address || !city) return;
    mutation.mutate({ name, address, city, type, content });
  }

  return (
    <div className="form-card">
      <h1 className="form-title">Add Store</h1>
      <form className="store-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Store name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="address">Street / address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select a city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="type">Store type</label>
          <input
            id="type"
            type="text"
            placeholder="e.g. Berber, Pharmacy"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="content">Description (optional)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding..." : "Add Store"}
        </button>

        {mutation.isSuccess && (
          <p className="form-message success">Store added.</p>
        )}
        {mutation.isError && (
          <p className="form-message error">Failed to add store.</p>
        )}
      </form>
    </div>
  );
}
