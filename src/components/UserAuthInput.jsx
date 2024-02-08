import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const UserAuthInput = ({
  label,
  placeHolder,
  isPass,
  setStatFunction,
  Icon,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStatFunction(e.target.value);

    if (placeHolder === "Email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const status = emailRegex.test(e.target.value);
      setIsValidEmail(status);
      setGetEmailValidationStatus(status);
    }
    if (placeHolder === "Password") {
      console.log(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-1 w-full md:w-96">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`w-full h-12 flex items-center justify-center gap-3 rounded-md px-4 py-1 bg-gray-200 ${
          !isValidEmail && placeHolder === "Email" && value.length > 0
            ? "border-2 border-red-500"
            : ""
        }`}
      >
        <Icon className="text-2xl text-Text555" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeHolder}
          className="flex-1 w-full h-8 bg-gray-200 focus:outline-none focus:border-transparent text-Text555 text-lg"
          value={value}
          onChange={handleTextChange}
        />
        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <FaEye className="text-2xl text-Text555" />
            ) : (
              <FaEyeSlash className="text-2xl text-Text555" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
