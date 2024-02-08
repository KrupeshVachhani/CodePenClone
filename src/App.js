import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./Container";
import { auth } from "./config/firebase.config";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
      } else {
        navigate("/home/auth", { replace: true });
      }
    });
  });

  return (
    <div className="w-screen h-screen flex item-start justify-start overflow-hidden">
      <Routes>
        <Route path="/home/*" element={<Home />} />

        {/* default path */}
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  );
};

export default App;
