import React from 'react';
import {motion} from 'framer-motion';
import '../styles/loader.css';

const backdropVariants = {
    visible: {opacity: 1}
}

const loaderVariants = {
    visible: {rotate: 360}
}

const Loader = () => {
    return (
        <motion.div 
        variants={backdropVariants}
        initial="hidden"
        animate="visible">
            <h1 className="loader-title pt-4">Loading...</h1>
            <ul className="loader-container">
                <motion.li 
                className="loader_circle circle-1"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, ease:'easeInOut'}}
                ></motion.li>
            </ul>
            <ul className="loader-container">
                <motion.li 
                className="loader_circle circle-2"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, delay: 0.1, ease:'easeInOut'}}
                ></motion.li>
            </ul>
            <ul className="loader-container">
                <motion.li 
                className="loader_circle  circle-3"
                variants={loaderVariants}
                transition={{duration: 1, loop: Infinity, delay: 0.2, ease:'easeInOut'}}
                ></motion.li>
            </ul>
           
        </motion.div>
    )
}

export default Loader;