import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout1.css';

export default function Logout1({ onBack }) {
  const [phase, setPhase] = useState(0);
  // 0: confirmación, 1: apagando, 2: apagado

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1800);
  };

  return (
    <div className="lo1-root">
      {/* Scanlines de monitor */}
      <div className="lo1-scanlines" />

      {/* Efecto CRT apagándose */}
      <AnimatePresence>
        {phase === 1 && (
          <>
            <motion.div className="lo1-crt-h"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0.004 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 1, 1] }}
            />
            <motion.div className="lo1-crt-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo1-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5 }}
          >
            {/* Icono de power SVG */}
            <motion.div className="lo1-power-icon"
              animate={{ boxShadow: ['0 0 0px rgba(239,68,68,0)', '0 0 30px rgba(239,68,68,0.4)', '0 0 0px rgba(239,68,68,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <motion.path d="M24 8 L24 24" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <motion.path d="M16 12.5 A14 14 0 1 0 32 12.5" stroke="#ef4444" strokeWidth="3.5"
                  strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <h2>¿Cerrar sesión?</h2>
            <p>Tu sesión actual será terminada.<br />Tendrás que volver a iniciar sesión.</p>

            <div className="lo1-actions">
              <motion.button className="lo1-btn-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo1-btn-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(239,68,68,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo1-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="lo1-done-icon"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="#64748b" strokeWidth="2" />
                <motion.path d="M16 24 L22 30 L32 18" stroke="#64748b" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
              </svg>
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Hasta pronto.
            </motion.p>
            <motion.button className="lo1-btn-back"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={onBack}
            >
              Volver al inicio
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
