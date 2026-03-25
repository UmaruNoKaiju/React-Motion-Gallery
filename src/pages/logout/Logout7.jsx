import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout7.css';

export default function Logout7({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1600);
  };

  return (
    <div className="lo7-root">
      {/* Blob que crece */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div className="lo7-blob"
            initial={{ scale: 0, borderRadius: '50%' }}
            animate={{ scale: 25, borderRadius: ['50%', '45% 55% 60% 40%', '50%'] }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo7-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 160 }}
          >
            {/* SVG wave icon */}
            <motion.div className="lo7-icon">
              <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                <defs>
                  <linearGradient id="lo7grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M4 24 Q10 16 16 24 Q22 32 28 24 Q34 16 40 24 Q46 32 52 24"
                  stroke="url(#lo7grad)" strokeWidth="3" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.path
                  d="M4 32 Q10 24 16 32 Q22 40 28 32 Q34 24 40 32"
                  stroke="url(#lo7grad)" strokeWidth="2" strokeLinecap="round" fill="none"
                  opacity="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <h2>Cerrar sesión</h2>
            <p>¿Deseas salir de tu cuenta actual?</p>

            <div className="lo7-actions">
              <motion.button className="lo7-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo7-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(6,182,212,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Salir
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo7-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg viewBox="0 0 100 100" width="100" height="100" fill="none"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.1 }}
            >
              <defs>
                <linearGradient id="lo7doneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                </linearGradient>
              </defs>
              <motion.circle cx="50" cy="50" r="44"
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.path d="M28 52 l14 14 l30 -28"
                stroke="url(#lo7doneGrad)" strokeWidth="5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </motion.svg>

            {['Sesión', 'cerrada'].map((w, i) => (
              <div key={w} className="lo7-overflow">
                <motion.span className="lo7-word"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </div>
            ))}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              Hasta pronto.
            </motion.p>

            <motion.button className="lo7-back"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
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
