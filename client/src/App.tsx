import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddStore from "./pages/AddStore";
import StoreDetails from "./pages/StoreDetails";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Search
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Store
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStore />} />
        <Route path="/store/:id" element={<StoreDetails />} />
      </Routes>
    </div>
  );
}
