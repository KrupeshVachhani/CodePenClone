import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, NewProject, NotValidScreen,Profile } from "./Container"; // Import the NotValidScreenSize component
import { auth, db } from "./config/firebase.config";
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import { SET_PROJECTS } from "./context/actions/projectActions";
import { onSnapshot } from "firebase/firestore";

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [validScreenSize, setValidScreenSize] = useState(true); // State to track screen size validity
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });

    // Cleanup the listener event
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "projects"),
      orderBy("id", "desc")
    );
    const unsubscribe = onSnapshot(projectQuery, (querySnap) => {
      const projectList = querySnap.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectList));
    });

    return () => unsubscribe();
  }, []);

  // Check window size on component mount and on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950 || window.innerHeight < 560) {
        setValidScreenSize(false);
      } else {
        setValidScreenSize(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check size on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : validScreenSize ? ( // Render NotValidScreenSize component if screen size is not valid
        <div className="w-screen h-screen flex item-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/NewProject" element={<NewProject />} />


            {/* Default path */}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      ) : (
        <NotValidScreen />
      )}
    </>
  );
};

export default App;
