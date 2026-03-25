import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout3.css';

export default function Logout3({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1800);
  };

  return (
    <div className="lo3-root">
      {/* Puerta cerrándose */}
      <AnimatePresence>
        {phase === 1 && (
          <>
            <motion.div className="lo3-door lo3-door-left"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="lo3-door-detail" />
              <div className="lo3-door-handle lo3-handle-right" />
            </motion.div>
            <motion.div className="lo3-door lo3-door-right"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="lo3-door-detail" />
              <div className="lo3-door-handle lo3-handle-left" />
            </motion.div>
            {/* Luz que se apaga */}
            <motion.div className="lo3-light"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo3-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
          >
            {/* Ícono puerta SVG */}
            <motion.div className="lo3-icon"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
                <rect x="8" y="4" width="24" height="40" rx="2" stroke="#f59e0b" strokeWidth="2" fill="rgba(245,158,11,0.08)" />
                <circle cx="28" cy="24" r="2.5" fill="#f59e0b" />
                <motion.path d="M32 20 L42 24 L32 28" stroke="#f59e0b" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.line x1="32" y1="24" x2="42" y2="24" stroke="#f59e0b" strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              </svg>
            </motion.div>

            <h2>Cerrar sesión</h2>
            <p>¿Estás seguro que deseas salir<br />de tu cuenta?</p>

            <div className="lo3-actions">
              <motion.button className="lo3-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                No, quedarme
              </motion.button>
              <motion.button className="lo3-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(245,158,11,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Sí, salir
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo3-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.svg viewBox="0 0 48 48" width="56" height="56" fill="none"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <rect x="8" y="4" width="24" height="40" rx="2" stroke="#475569" strokeWidth="2" fill="rgba(71,85,105,0.1)" />
              <circle cx="28" cy="24" r="2.5" fill="#475569" />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              Hasta pronto
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              Tu sesión ha sido cerrada.
            </motion.p>
            <motion.button className="lo3-back"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
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
