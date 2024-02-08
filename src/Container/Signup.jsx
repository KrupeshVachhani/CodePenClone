import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaGithub, FaEnvelope, FaGoogle } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithGoogle } from "../utils/helpers";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="w-full py-6">
      <div className="w-full flex flex-col items-center justify-center py-8">
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            Key="Email"
            setStatFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            Key="Passwrord"
            setStatFunction={setPassword}
            Icon={MdPassword}
          />

          {/* alert section */}

          {/* login */}
          {!isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600"
            >
              <p className=" text-white text-lg">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-emerald-500 cursor-pointer bg-emerald-600"
            >
              <p className=" text-white text-lg">Login</p>
            </motion.div>
          )}

          {/* acc text section */}
          {!isLogin ? (
            <div className="w-full flex items-center justify-center gap-2">
              <p className="text-primaryText">Already have an account?</p>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                <p className="text-emerald-500">Login</p>
              </motion.div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center gap-2">
              <p className="text-primaryText">Don't have an account?</p>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                <p className="text-emerald-500">Sign Up</p>
              </motion.div>
            </div>
          )}

          {/* or selection */}
          <div className="w-full flex items-center justify-center gap-6">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <p className="text-gray-400">or</p>
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>

          {/* signinwith google */}
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-[rgba(256,256,256,0.3)] cursor-pointer bg-[rgba(256,256,256,0.2)]"
          >
            <FcGoogle className="text-lg pr-3 w-10 h-9" />
            <p className=" text-white ">Sign up with Google</p>
          </motion.div>

          {/* or section */}
          <div className="w-full flex items-center justify-center gap-6">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <p className="text-gray-400">or</p>
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>

          {/* signin with github */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-full flex items-center justify-center py-3 rounded-xl hover:bg-[rgba(256,256,256,0.3)] cursor-pointer bg-[rgba(256,256,256,0.2)]"
          >
            <FaGithub className=" text-white text-lg pr-3 w-10 h-9" />
            <p className=" text-white ">Sign up with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
