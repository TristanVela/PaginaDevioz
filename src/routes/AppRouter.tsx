import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { PrivateRouter } from ".";
import { PrivateRoute } from "./PrivateRoute";
import { useDevioz } from "../hooks";
import { Loader } from "../components";

const LazyHome = lazy(() => import("../pages/Home"));
const LazyAbout = lazy(() => import("../pages/user/About_us"));
const LazyNosotros = lazy(() => import("../pages/user/Nosotros"));
const LazyContact = lazy(() => import("../pages/user/Contact"));
const LazyService = lazy(() => import("../pages/user/Services"));
const LazyProducts = lazy(() => import("../pages/user/Products"));
const LazyProductDetail = lazy(() => import("../pages/user/ProductDetail"));




export const AppRouter = () => {
  const { dataPage, handleGetData } = useDevioz();

  const onGetData = async () => {
    await handleGetData();
  };

  useEffect(() => {
    onGetData();
  }, []);

  /*if (dataPage.sections === undefined) {
    return <Loader />;
  }*/

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<Loader />}>
              <LazyAbout />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={true}>
              <PrivateRouter />
            </PrivateRoute>
          }
        />
        <Route
          path="/nosotros"
          element={
            <Suspense fallback={<Loader />}>
              <LazyNosotros />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <LazyContact />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Loader />}>
              <LazyProducts />
            </Suspense>
          }
        />
        <Route
          path="/productsdetails/:productId"
          element={
            <Suspense fallback={<Loader />}>
              <LazyProducts />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<Loader />}>
              <LazyService />
            </Suspense>
          }
        />
        <Route
          path="/productdetail"
          element={
            <Suspense fallback={<Loader />}>
              <LazyProductDetail />
            </Suspense>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
