import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout14.css';

const RINGS = Array.from({ length: 8 }, (_, i) => ({ id: i, delay: i * 0.06 }));

export default function Logout14({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2200);
  };

  return (
    <div className="lo14-root">
      <AnimatePresence>
        {phase === 1 && (
          <div className="lo14-spiral-wrap">
            {RINGS.map(r => (
              <motion.div key={r.id} className="lo14-ring"
                style={{ width: `${100 - r.id * 10}vmin`, height: `${100 - r.id * 10}vmin` }}
                initial={{ scale: 1, rotate: 0, opacity: 0.6 }}
                animate={{ scale: 0, rotate: r.id % 2 === 0 ? 540 : -540, opacity: 0 }}
                transition={{ duration: 0.8, delay: r.delay, ease: [0.4, 0, 1, 1] }}
              />
            ))}
            <motion.div className="lo14-vortex"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo14-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 0, rotate: 180, opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo14-icon">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs><linearGradient id="g14" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fb7185" /><stop offset="100%" stopColor="#e11d48" /></linearGradient></defs>
                <motion.path d="M24 8 A16 16 0 1 1 8 24 A8 8 0 1 0 16 24 A4 4 0 1 1 20 24"
                  stroke="url(#g14)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.2 }} />
                <circle cx="24" cy="24" r="3" fill="url(#g14)" />
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>¿Confirmas el cierre de sesión?</p>
            <div className="lo14-actions">
              <motion.button className="lo14-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo14-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Salir</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo14-done"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(251,113,133,0.2)" strokeWidth="1" strokeDasharray="4 3" />
            </motion.svg>
            <div className="lo14-done-inner">
              <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                <defs><linearGradient id="g14d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fb7185" /><stop offset="100%" stopColor="#e11d48" /></linearGradient></defs>
                <circle cx="30" cy="30" r="26" fill="rgba(251,113,133,0.08)" stroke="url(#g14d)" strokeWidth="2" />
                <motion.path d="M18 30 L26 38 L42 22" stroke="url(#g14d)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }} />
              </svg>
            </div>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Hasta pronto.</motion.p>
            <motion.button className="lo14-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
