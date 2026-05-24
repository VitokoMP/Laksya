import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContactCard.module.css';

export const ContactCard = ({ icon, title, link, note, delay = 0 }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 15px 30px rgba(184,138,75,0.15)",
        borderColor: "#b88a4b",
        transition: { duration: 0.3 }
      }}
    >
      <motion.span 
        className={styles.icon}
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.span>
      
      <h3 className={styles.title}>{title}</h3>
      
      <motion.a 
        href={link} 
        className={styles.link}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {link.replace('mailto:', '').replace('https://wa.me/', '')}
      </motion.a>
      
      <p className={styles.note}>{note}</p>
    </motion.div>
  );
};