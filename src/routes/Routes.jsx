import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import Colleges from "../pages/colleges/Colleges";
import CollegeDetails from "../pages/colleges/CollegeDetails";
import PrivateRoute from "./PrivateRoute";
import MyCollege from "../pages/myCollege/MyCollege";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/NotFound";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import AdmissionForm from "../pages/admission/AdmissionForm";
import AdmissionCollegeList from "../pages/admission/AdmissionCollegeList";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/admission" element={<AdmissionCollegeList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}

        <Route
          path="/admission/:collegeId"
          element={
            <PrivateRoute>
              <AdmissionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/college/:id"
          element={
            <PrivateRoute>
              <CollegeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-college"
          element={
            <PrivateRoute>
              <MyCollege />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
