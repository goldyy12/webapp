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
    onError: (error) => {
      console.error("ADD STORE ERROR:", error);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !address || !city || !type) return;
    mutation.mutate({ name, address, city, type, content });
  }

  return (
    <div>
      <h1 className="form-title">Add Store</h1>
      <form className="store-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street / address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
          placeholder="Store type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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
