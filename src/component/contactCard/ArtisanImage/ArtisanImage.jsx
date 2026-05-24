import React from 'react';
import { motion } from 'framer-motion';
import styles from './ArtisanImage.module.css';

export const ArtisanImage = ({ src, alt, badge, delay = 0 }) => {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.43, 0.13, 0.23, 0.96] // Curva artesanal
      }}
      whileHover={{ 
        scale: 1.02,
        rotate: -1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        className={styles.image}
        whileHover={{ 
          borderColor: "#b88a4b",
          boxShadow: "0 25px 35px -10px rgba(184,138,75,0.25)"
        }}
      />
      
      <motion.div 
        className={styles.badge}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: delay + 0.3 
        }}
        whileHover={{ 
          scale: 1.2,
          rotate: 10,
          backgroundColor: "#b88a4b",
          color: "white",
          transition: { duration: 0.2 }
        }}
      >
        {badge}
      </motion.div>
    </motion.div>
  );
};