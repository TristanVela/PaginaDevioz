import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "../components";

const LazyDashboardLogin = lazy(() => import("../pages/admin/Login"));
const LazyDashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const LazyDashboardNavbar = lazy(
  () => import("../pages/admin/dashboard/DashboardNavbar")
);
const LazyDashboardHome = lazy(
  () => import("../pages/admin/dashboard/DashboardHome")
);

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route
        path="auth"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardLogin />
          </Suspense>
        }
      />

      <Route
        path="dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboard />
          </Suspense>
        }
      />
      <Route
        path="dashboard/navfooter"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardNavbar />
          </Suspense>
        }
      />
      <Route
        path="dashboard/inicio"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardHome />
          </Suspense>
        }
      />
      <Route
        path="dashboard/nosotros"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboard />
          </Suspense>
        }
      />
      <Route
        path="dashboard/productos"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboard />
          </Suspense>
        }
      />
      <Route
        path="dashboard/servicios"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboard />
          </Suspense>
        }
      />
      <Route
        path="dashboard/contacto"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboard />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/admin/auth" />} />
    </Routes>
  );
};
