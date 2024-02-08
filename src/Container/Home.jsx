import React, { useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import { FaSearchengin } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Link, Routes, Route } from 'react-router-dom';
import logo from '../assets/logo.png';
import {Projects , Signup} from './index';

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <div className={`w-1 ${isSideMenuOpen ? "w-1" : "flex-[.1] xl:flex -[.1]"} min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start  gap-4 transition-all duration-200 ease-in-out `}>


        {/* anchor */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          className={`w-12 h-24 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-12 flex items-center justify-center cursor-pointer z-5 border border-gray-400 group-hover:border-gray-200`}
        >
          {isSideMenuOpen ? <HiChevronDoubleRight className='text-white text-2xl' /> : <HiChevronDoubleLeft className='text-white text-2xl' />}

        </motion.div>

        <div className='overflow-hidden w-full flex flex-col gap-4'>
          {/* logo */}
          <Link to={'/home'} className='object-contain w-full h-auto text-white text-2xl'><img src={logo} alt="logo" className='object-contain w-72 h-auto' /></Link>

          {/* Start New Project */}
          <Link to={'/startnewproject'}>
            <div className='px-6 py-3 flex items-center justify-center text-xs rounded-xl border border-gray-400 cursor-pointer group-hover:border-gray-200 text-white'>New Project</div>
          </Link>

          {/* Home nav */}
          {user && (
            <Link to={'/home/projects'} className='flex items-center justify-center gap-6'>
              <MdHome className='text-primaryText text-xl' />
              <p className='text-lg text-primaryText'>Home</p>
            </Link>
          )}
        </div>
      </div>

      <div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>

        {/* top section */}

        <div className='w-full flex items-center justify-between gap-3 px-5 '>
          {/* Search */}
          <div className='bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center' >
            <FaSearchengin className='text-xl text-primaryText' />
            <input type='text' placeholder='Search' className='w-full h-6 pl-4 rounded-md bg-secondary  focus:outline-none focus:ring-2 focus:ring-primaryText focus:border-transparent text-primaryText text-xl' />
          </div>

          {/* Profile */}
          {!user && (
            <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3'>
              <Link to={'/home/auth'} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-300 text-white rounded-md text-lg">SignUp</Link>
            </motion.div>
          )}

          {user && (
            <div className='flex items-center justify-center gap-3'></div>
          )}
        </div>

        {/* bottom section */}
        

                <div className='w-full '>
                  <Routes>
                    <Route path='/*' element={<Projects />}></Route>
                    <Route path='/auth' element={<Signup />}></Route>
                  </Routes>
                </div>
      </div>
    </>
  );
};

export default Home;
