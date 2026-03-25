import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout9.css';

const DROPS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: 2.5 * i + Math.random() * 2,
  delay: Math.random() * 0.6,
  height: 60 + Math.random() * 80,
  duration: 0.4 + Math.random() * 0.3,
  opacity: 0.4 + Math.random() * 0.5,
}));

export default function Logout9({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo9-root">
      <div className="lo9-bg-lines" />

      {/* Cortina de lluvia */}
      <AnimatePresence>
        {phase === 1 && (
          <>
            {/* Cortina sólida que baja */}
            <motion.div className="lo9-curtain"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Gotas */}
            {DROPS.map(d => (
              <motion.div key={d.id} className="lo9-drop"
                style={{ left: `${d.x}%`, height: d.height, opacity: d.opacity }}
                initial={{ y: '-100vh' }}
                animate={{ y: '110vh' }}
                transition={{ duration: d.duration, delay: d.delay, ease: 'easeIn' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo9-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo9-icon">
              <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                <defs>
                  <linearGradient id="lo9grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                {/* Gota de agua */}
                <motion.path d="M24 6 Q36 18 36 28 A12 12 0 0 1 12 28 Q12 18 24 6 Z"
                  fill="rgba(52,211,153,0.1)" stroke="url(#lo9grad)" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.path d="M20 30 Q24 34 28 30"
                  stroke="url(#lo9grad)" strokeWidth="1.5" strokeLinecap="round" fill="none"
                  opacity="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                />
              </svg>
            </motion.div>

            <h2>Cerrar sesión</h2>
            <p>¿Deseas cerrar tu sesión actual?</p>

            <div className="lo9-actions">
              <motion.button className="lo9-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo9-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(52,211,153,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo9-done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <defs>
                <linearGradient id="lo9doneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <motion.circle cx="40" cy="40" r="34"
                fill="rgba(52,211,153,0.06)" stroke="url(#lo9doneGrad)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.path d="M24 40 L34 50 L56 28"
                stroke="url(#lo9doneGrad)" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </motion.svg>

            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Tu sesión ha sido cerrada correctamente.
            </motion.p>
            <motion.button className="lo9-back"
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
