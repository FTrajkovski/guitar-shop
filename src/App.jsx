import React from "react";
import "./App.css";
import BrandComponent from "./pages/BrandComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import BrandModelsComponent from "./pages/BrandModelsComponent";
import GuitarComponent from "./pages/GuitarComponent";
import Logo from "./assets/Logo.png";
function Brands() {
  return <BrandComponent />;
}

function GuitarModels() {
  return (
    <>
      <BrandModelsComponent />
    </>
  );
}

function GuitarDetails() {
  return <GuitarComponent />;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/brands">
          <img src={Logo} alt="Brand Logo" className="position-absolute logo" />
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/brands" replace />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:brandId" element={<GuitarModels />} />
        <Route
          path="/brands/:brandId/models/:modelId"
          element={<GuitarDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
