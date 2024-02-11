import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="min-h-screen flex items-center justify-center -m-10 ">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl  shadow-lg rounded-lg p-8 transform duration-200 ease-in-out">
        <div className="flex justify-center -mt-12">
          {
            // user profile image
            user?.photoURL ? (
              <>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                  className="w-96 h-96 p-11 object-cover rounded-full cursor-pointer"
                ></motion.img>
              </>
            ) : (
              <p className="text-xl text-white font-semibold capitalize">
                {user?.email[0]}
              </p>
            )
          }
        </div>
        <div>
          <div className="text-center px-8">
            <div className="flex items-center justify-center px-3 -mt-2 gap-3 ">
              <p className="text-white text-4xl">
                {user?.displayName
                  ? user?.displayName
                  : `${user?.email.split("@")[0]}`}
              </p>
            </div>
            <div className="flex items-center justify-center p-3 gap-3 ">
              <p className="text-gray-500 text-3xl">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
