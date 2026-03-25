import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout6.css';

const GLITCH_BARS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  height: Math.random() * 8 + 2,
  delay: Math.random() * 0.4,
  x: (Math.random() - 0.5) * 40,
  duration: 0.08 + Math.random() * 0.1,
}));

export default function Logout6({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo6-root">
      <div className="lo6-noise" />

      {/* Barras de glitch */}
      <AnimatePresence>
        {phase === 1 && GLITCH_BARS.map(b => (
          <motion.div key={b.id} className="lo6-glitch-bar"
            style={{ top: `${b.top}%`, height: b.height }}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [0, b.x, -b.x, b.x * 0.5, 0], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: b.duration, delay: b.delay, repeat: 6, repeatType: 'mirror' }}
          />
        ))}
      </AnimatePresence>

      {/* Flash de color */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div className="lo6-color-flash"
            animate={{ opacity: [0, 0.3, 0, 0.5, 0, 0.2, 0] }}
            transition={{ duration: 1.5, times: [0, 0.1, 0.2, 0.5, 0.7, 0.9, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo6-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: [-4, 8, -8, 4, 0], opacity: 0, filter: 'blur(4px)', transition: { duration: 0.4 } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo6-icon"
              animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs>
                  <linearGradient id="lo6grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <rect x="6" y="6" width="36" height="36" rx="8"
                  fill="rgba(168,85,247,0.08)" stroke="url(#lo6grad)" strokeWidth="2" />
                <motion.path d="M16 24 L22 30 L32 18"
                  stroke="url(#lo6grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <motion.line x1="24" y1="8" x2="24" y2="12"
                  stroke="url(#lo6grad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
                <motion.line x1="24" y1="36" x2="24" y2="40"
                  stroke="url(#lo6grad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                />
                <motion.line x1="8" y1="24" x2="12" y2="24"
                  stroke="url(#lo6grad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                />
                <motion.line x1="36" y1="24" x2="40" y2="24"
                  stroke="url(#lo6grad)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                />
              </svg>
            </motion.div>

            <h2>¿Cerrar sesión?</h2>
            <p>Tu sesión será terminada en este dispositivo.</p>

            <div className="lo6-actions">
              <motion.button className="lo6-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo6-confirm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Salir
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo6-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo6-done-ring"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, delay: 0.2 }}
            >
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                <defs>
                  <linearGradient id="lo6doneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <motion.circle cx="40" cy="40" r="34"
                  fill="none" stroke="url(#lo6doneGrad)" strokeWidth="2.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.path d="M26 40 L36 50 L54 30"
                  stroke="url(#lo6doneGrad)" strokeWidth="4"
                  strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <motion.h3
              className="lo6-done-title"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Hasta pronto.
            </motion.p>
            <motion.button className="lo6-back"
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
