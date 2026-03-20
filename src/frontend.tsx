/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import AdDetail from "./pages/AdDetail";
import CreateAd from "./pages/CreateAd";
import Profile from "./pages/Profile";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import { AdsProvider } from "./context/AdsContext";
import { AuthProvider } from "./context/AuthContext";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <AuthProvider>
      <AdsProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/ad/:id" element={<AdDetail/>}></Route>
          <Route path="/create-ad" element={<CreateAd/>}></Route>
          <Route path="/profile/:author" element={<Profile/>}></Route>
          <Route path="/terms" element={<TermsAndConditions/>}></Route>
          <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        </Routes>
        </BrowserRouter>
      </AdsProvider>
    </AuthProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
