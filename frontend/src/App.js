import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  About,
  ContactUs,
  ActivationPage,
  HomePage,
  SearchResults,
  PropertyDetails,
  PaymentPage,
  PropertyAddPage,
  PartnerActivationPage,
  PropertyLogin,
  PaymentSuccess,
  MapPage,
  Invoice,
} from "./routes/Routes.js";
import {
  PartnerDashboardPage,
  PartnerCreateProperty,
  PartnerListedProperties,
  PartnerAllBookingsPage,
  PartnerWithdrawalPage,
  PartnerCoversationPage,
} from "./routes/PartnerRoutes";
import {
  AdminLogin,
  AdminDashboard,
  AdminUsersManagement,
  AdminPartnersManagement,
  AdminListedProperties,
  AdminAddCoupon,
  AmenitiesManagement,
  DestinationManagementPage,
  CategoriesManagementPage,
  BookingManagementPage,
  AdminWithdrawMoneyPage,
  BannerManagementPage,
} from "./routes/AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadPartner, loadUser } from "./redux/actions/user";
import Store from "./redux/store";
import { PartnerHomePage } from "./PartnerRoutes.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import PartnerProtectedRoute from "./routes/PartnerProtectedRoute";
// import { useSelector } from "react-redux";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadPartner());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:a" element={<About />} />
          <Route path="/contact/:b" element={<ContactUs />} />
          <Route path="/navigation/:lat/:lng" element={<MapPage />} />
          <Route path="/Search-Results/:searchs" element={<SearchResults />} />
          <Route path="/Property-Details/:name" element={<PropertyDetails />} />
          <Route
            path="/Payment-Page/:name"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />

          {/* partner routes */}
          <Route path="/login-partner" element={<PropertyLogin />} />
          <Route
            path="/partner/activation/:activation_token"
            element={<PartnerActivationPage />}
          />
          <Route path="/add-property" element={<PropertyAddPage />} />
          <Route
            path="/partner/:id"
            element={
              <PartnerProtectedRoute>
                <PartnerHomePage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PartnerProtectedRoute>
                <PartnerDashboardPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-all-bookings"
            element={
              <PartnerProtectedRoute>
                <PartnerAllBookingsPage />
              </PartnerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-create-property"
            element={
              <PartnerProtectedRoute>
                <PartnerCreateProperty />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-get-all-properties"
            element={
              <PartnerProtectedRoute>
                <PartnerListedProperties />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <PartnerProtectedRoute>
                <PartnerWithdrawalPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <PartnerProtectedRoute>
                <PartnerCoversationPage />
              </PartnerProtectedRoute>
            }
          />

          {/* admin routes */}

          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-users-management"
            element={
              <AdminProtectedRoute>
                <AdminUsersManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-partners-management"
            element={
              <AdminProtectedRoute>
                <AdminPartnersManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-listed-properties"
            element={
              <AdminProtectedRoute>
                <AdminListedProperties />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-coupon-management"
            element={
              <AdminProtectedRoute>
                <AdminAddCoupon />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-amenities-management"
            element={
              <AdminProtectedRoute>
                <AmenitiesManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-destination-management"
            element={
              <AdminProtectedRoute>
                <DestinationManagementPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-categories-management"
            element={
              <AdminProtectedRoute>
                <CategoriesManagementPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-booking-management"
            element={
              <AdminProtectedRoute>
                <BookingManagementPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-withdraw-money"
            element={
              <AdminProtectedRoute>
                <AdminWithdrawMoneyPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-banner-management"
            element={
              <AdminProtectedRoute>
                <BannerManagementPage />
              </AdminProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer
          className="mt-20"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
