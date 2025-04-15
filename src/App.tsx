import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MapPage from "./pages/MapPage";
import Top from "./pages/Top";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Top />}
        />
        <Route
          path="/map"
          element={<MapPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
