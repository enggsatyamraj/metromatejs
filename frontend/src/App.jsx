import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from './Pages/HomePage.tsx'
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import RoutePage from "./Pages/RoutePage.jsx";
import Profile from "./Pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import History from "./Pages/History.jsx";
import HelpConnect from "./Pages/HelpConnect.jsx";
import AdditionalDetails from './Pages/AdditionalDetails.jsx'
import ProfileUpdate from "./Pages/ProfileUpdate.jsx";
import Footer from "./components/Footer.jsx";

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/helpandcontact" element={<HelpConnect />} />
          <Route
            path="/routes"
            element={
              <PrivateRoute>
                <RoutePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/additionalDetails"
            element={
              <PrivateRoute>
                <AdditionalDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="profileUpdate"
            element={
              <PrivateRoute>
                <ProfileUpdate />
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
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
