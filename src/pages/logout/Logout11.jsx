import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout11.css';

const BLINDS = Array.from({ length: 12 }, (_, i) => ({
  id: i, delay: i * 0.05,
}));

export default function Logout11({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1800);
  };

  return (
    <div className="lo11-root">
      <AnimatePresence>
        {phase === 1 && BLINDS.map(b => (
          <motion.div key={b.id} className="lo11-blind"
            style={{ left: `${(b.id / 12) * 100}%`, width: `${100 / 12}%` }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: b.delay, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo11-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo11-icon"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs>
                  <linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#a21caf" />
                  </linearGradient>
                </defs>
                {[0,1,2,3].map(i => (
                  <motion.rect key={i} x="8" y={10 + i * 8} width="32" height="4" rx="2"
                    fill="url(#g11)" opacity={1 - i * 0.2}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    style={{ transformOrigin: 'left' }}
                  />
                ))}
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>¿Deseas salir de tu cuenta?</p>
            <div className="lo11-actions">
              <motion.button className="lo11-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo11-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Salir</motion.button>
            </div>
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div key="d" className="lo11-done"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <circle cx="40" cy="40" r="34" fill="none" stroke="url(#g11done)" strokeWidth="2" />
              <defs><linearGradient id="g11done" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#a21caf" /></linearGradient></defs>
              <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g11done)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Hasta pronto.</motion.p>
            <motion.button className="lo11-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
