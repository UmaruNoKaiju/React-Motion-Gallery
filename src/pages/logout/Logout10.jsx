import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout10.css';

export default function Logout10({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1800);
  };

  return (
    <div className="lo10-root">
      <div className="lo10-bg-texture" />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo10-paper"
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{
              rotateX: [0, -20, 40, -60, 90],
              scaleX: [1, 0.9, 0.7, 0.4, 0],
              scaleY: [1, 1.05, 0.8, 0.5, 0],
              opacity: [1, 1, 0.8, 0.4, 0],
              y: [0, -10, -30, -60, -100],
              transition: { duration: 0.7, ease: [0.4, 0, 1, 1] }
            }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Líneas de papel */}
            <div className="lo10-paper-lines">
              {[0,1,2,3,4].map(i => <div key={i} className="lo10-line" />)}
            </div>

            <motion.div className="lo10-icon"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs>
                  <linearGradient id="lo10grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                {/* Documento */}
                <rect x="10" y="4" width="28" height="36" rx="3"
                  fill="rgba(249,115,22,0.08)" stroke="url(#lo10grad)" strokeWidth="2" />
                <motion.line x1="16" y1="14" x2="32" y2="14"
                  stroke="url(#lo10grad)" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
                <motion.line x1="16" y1="20" x2="32" y2="20"
                  stroke="url(#lo10grad)" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                />
                <motion.line x1="16" y1="26" x2="26" y2="26"
                  stroke="url(#lo10grad)" strokeWidth="1.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                />
                {/* X de cerrar */}
                <motion.path d="M28 32 L36 40 M36 32 L28 40"
                  stroke="url(#lo10grad)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                />
              </svg>
            </motion.div>

            <h2>Cerrar sesión</h2>
            <p>Tu sesión será cerrada en este dispositivo.</p>

            <div className="lo10-actions">
              <motion.button className="lo10-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo10-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo10-done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
            >
              <defs>
                <linearGradient id="lo10doneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              <motion.circle cx="40" cy="40" r="34"
                fill="rgba(249,115,22,0.06)" stroke="url(#lo10doneGrad)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.path d="M24 40 L34 50 L56 28"
                stroke="url(#lo10doneGrad)" strokeWidth="4.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </motion.svg>

            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Hasta pronto.
            </motion.p>
            <motion.button className="lo10-back"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
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
