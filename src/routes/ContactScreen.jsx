import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from '../ContactScreen.module.css';

// Iconos Lucide React (instalar: npm install lucide-react)
import { Mail, Phone, Clock, Leaf, Sparkles, Heart, Send } from 'lucide-react';

// Animaciones contemplativas - mantiene la lentitud y respiración
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const ContactScreen = () => {
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <motion.div 
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.content}>
        
        {/* HERO - Minimal, calmado, editorial */}
        <motion.div className={styles.hero} variants={itemVariants}>
          <span className={styles.badge}>Laksya</span>
          <h1 className={styles.title}>
            Volver al
            <br />
            equilibrio.
          </h1>
          <p className={styles.subtitle}>
            Ayurveda contemporáneo para una vida en balance.
          </p>
          <div className={styles.signatureLine}>
            medicina ancestral · cuidado presente
          </div>
        </motion.div>

        {/* IMAGEN EDITORIAL - Reemplaza las imágenes artesanales */}
        <motion.div 
          className={styles.imageSection}
          variants={itemVariants}
        >
          <div className={styles.imagePlaceholder}>
            {/* Aquí va una imagen editorial wellness premium */}
            <div className={styles.imageOverlay} />
          </div>
        </motion.div>

        {/* DESCRIPCIÓN - Limpia, premium, silenciosa */}
        <motion.div 
          className={styles.description}
          variants={itemVariants}
        >
          <p>
            En Laksya creemos que el bienestar no se trata de hacer más,
            sino de volver al equilibrio natural del cuerpo y la mente.
          </p>
          <p>
            Acompañamos tu proceso con terapias ayurvédicas, rituales conscientes
            y un espacio diseñado para el encuentro contigo mismo.
          </p>
        </motion.div>

        {/* VALORES - Íconos lineales, sin emojis */}
        <motion.div 
          className={styles.values}
          variants={itemVariants}
        >
          <div className={styles.valueItem}>
            <Leaf size={24} strokeWidth={1.2} />
            <span>Ayurveda</span>
          </div>
          <div className={styles.valueItem}>
            <Heart size={24} strokeWidth={1.2} />
            <span>Cuidado</span>
          </div>
          <div className={styles.valueItem}>
            <Clock size={24} strokeWidth={1.2} />
            <span>Sin prisa</span>
          </div>
          <div className={styles.valueItem}>
            <Sparkles size={24} strokeWidth={1.2} />
            <span>Presencia</span>
          </div>
        </motion.div>

        {/* FORMULARIO DE CONTACTO - Limpio, minimal */}
        <motion.div 
          className={styles.card}
          variants={itemVariants}
        >
          <h2 className={styles.cardTitle}>Conversemos</h2>
          <p className={styles.cardSubtitle}>
            Si tienes preguntas sobre nuestras terapias o acompañamiento,
            escríbenos. Respondemos en menos de 24 horas.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="María González"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="maria@ejemplo.cl"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono (opcional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos qué necesitas saber..."
                rows="4"
                required
                disabled={isSubmitting}
              />
            </div>

            <motion.button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
              whileHover={{ letterSpacing: "0.02em" }}
              transition={{ duration: 0.25 }}
            >
              <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
              <Send size={16} strokeWidth={1.5} />
            </motion.button>

            {submitStatus === 'success' && (
              <p className={styles.successMessage}>
                ✦ Mensaje enviado. Te contactaremos pronto.
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className={styles.errorMessage}>
                ✦ Hubo un error. Por favor, intenta nuevamente.
              </p>
            )}
          </form>
        </motion.div>

        {/* CONTACTO DIRECTO */}
        <motion.div 
          className={styles.contactDirect}
          variants={itemVariants}
        >
          <a href="mailto:hola@laksya.cl" className={styles.contactLink}>
            <Mail size={18} strokeWidth={1.2} />
            <span>hola@laksya.cl</span>
          </a>
          <a href="https://wa.me/569XXXXXXXX" className={styles.contactLink}>
            <Phone size={18} strokeWidth={1.2} />
            <span>+56 9 1234 5678</span>
          </a>
        </motion.div>

        {/* CIERRE - Frase calmada */}
        <motion.div 
          className={styles.closing}
          variants={fadeVariants}
        >
          <p className={styles.quote}>
            El equilibrio no es un destino,
            <br />
            es una práctica diaria.
          </p>
          <div className={styles.signature}>
            <span>Laksya · Bienestar integral</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};