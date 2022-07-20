import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Forgot from "./components/Auth/Forgot";
import Reset from "./components/Auth/Reset";
import Profile from "./components/Client/Profile";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import CoachMain from "./components/Coach/CoachMain";
import SearchMain from "./components/Search/SearchMain";
import Footer from "./components/Layout/Footer";
import ClientAppointments from "./components/Client/ClientAppointments";

import "./static/css/bootstrap.css";
import "./static/css/animate.css";
import "./static/css/bootstrap-datepicker.css";
import "./static/css/jquery.timepicker.css";
import "./static/css/nice-select.css";
import "./static/fonts/ionicons/css/ionicons.min.css";
import "./static/fonts/fontawesome/css/all.min.css";
import "./static/fonts/flaticon/font/flaticon.css";
import "./static/css/style.css";
import "./App.css";
import NotFound from "./components/Pages/NotFound";

function App() {
  const [updateApp, setUpdateApp] = useState(false);
  const [client, setClient] = useState({});
  const [login, setLogin] = useState(false);

  const updateMainComponent = () => {
    setUpdateApp(!updateApp);
  };

  //end
  useEffect(() => {
    var url;
    if (!!+process.env.REACT_APP_MODE) {
      url = `${process.env.REACT_APP_DEVELOPING_URL}api/clientUser`;
    } else {
      url = `${process.env.REACT_APP_PRODUCTION_URL}api/clientUser`;
    }

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((client) => {
        setClient(client);
      })
      .catch((error) => {
        console.log(error);
        setClient({});
      });
  }, [login]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar
          client={client}
          setClient={setClient}
          setLogin={() => setLogin(false)}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchMain />} />
          <Route
            path="/my-appointments"
            element={
              <ClientAppointments
                client={client}
                updateMainComponent={updateMainComponent}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login setClient={setClient} setLogin={() => setLogin(true)} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  client={client}
                  updateMainComponent={updateMainComponent}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coaches/:id"
            element={
              <CoachMain
                client={client}
                updateMainComponent={updateMainComponent}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
