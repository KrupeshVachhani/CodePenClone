import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { signInWithGoogle } from "../utils/helpers";
import { fadeInOut } from "../Aminations";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCred);
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("email-already-in-use")) {
          setAlertMessage("Email already in use");
          setAlertStatus(true);
          setTimeout(() => {
            setAlertStatus(false);
          }, 3000);
        } else if (error.message.includes("weak-password")) {
          setAlertMessage("Password should be at least 6 characters");
          setAlertStatus(true);
          setTimeout(() => {
            setAlertStatus(false);
          }, 3000);
        }
      }
    }
  };

  const loginWithEmailAndPassword = async () => {
    if (getEmailValidationStatus) {
      try {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCred);
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("invalid-credential")) {
          setAlertMessage("Invalid credentials");
          setAlertStatus(true);
          setTimeout(() => {
            setAlertStatus(false);
          }, 3000);
        }
      }
    }
  };

  return (
    <div className="w-full py-6">
      <div className="w-full flex flex-col items-center justify-center py-8">
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStatFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStatFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert sections */}
          <AnimatePresence>
            {alertStatus && (
              <motion.p {...fadeInOut} className="text-red-500">
                {alertMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600"
            >
              <p className="text-white text-lg">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailAndPassword}
              whileTap={{ scale: 0.9 }}
              className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600"
            >
              <p className="text-white text-lg">Login</p>
            </motion.div>
          )}

          <div className="w-full flex items-center justify-center gap-2">
            <p className="text-primaryText">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              <p className="text-emerald-500">
                {isLogin ? "Sign Up" : "Login"}
              </p>
            </motion.div>
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <p className="text-gray-400">or</p>
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>

          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-[rgba(256,256,256,0.3)] cursor-pointer bg-[rgba(256,256,256,0.2)]"
          >
            <FcGoogle className="text-lg pr-3 w-10 h-9" />
            <p className="text-white ">Sign up with Google</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
