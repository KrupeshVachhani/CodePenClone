import React from 'react';
import { motion } from 'framer-motion';
import { slideUpOut } from '../Aminations';

const Alert = ({status,alertMessage}) => {
  return (
    <motion.div {...slideUpOut} className=' fixed top-24 right-12 z-10'>
      {status === "Success" && (
        <div className="bg-emerald-400 shadow-md shadow-emerald-500  p-3 rounded-md">
          <p className='text-lg text-primary'> {alertMessage}</p>
        </div>
      )}
    </motion.div>
  );
}

export default Alert