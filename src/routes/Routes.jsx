import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
