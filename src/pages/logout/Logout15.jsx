import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout15.css';

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.6 + 0.1,
  dur: Math.random() * 3 + 2, delay: Math.random() * 3,
}));

export default function Logout15({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1800);
  };

  return (
    <div className="lo15-root">
      {STARS.map(s => (
        <motion.div key={s.id} className="lo15-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo15-card"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ y: -800, opacity: 0, scale: 0.3, rotate: 5, transition: { duration: 0.7, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.5 }}
          >
            {/* Estela al salir */}
            <motion.div className="lo15-icon">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs><linearGradient id="g15" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#a3e635" /><stop offset="100%" stopColor="#65a30d" /></linearGradient></defs>
                {/* Flecha hacia arriba */}
                <motion.path d="M24 40 L24 12" stroke="url(#g15)" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }} />
                <motion.path d="M14 22 L24 12 L34 22" stroke="url(#g15)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
                <motion.path d="M18 36 L24 40 L30 36" stroke="url(#g15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.7 }} />
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>¿Listo para despegar de tu cuenta?</p>
            <div className="lo15-actions">
              <motion.button className="lo15-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo15-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Despegar</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo15-done"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
            >
              <defs><linearGradient id="g15d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a3e635" /><stop offset="100%" stopColor="#65a30d" /></linearGradient></defs>
              <motion.circle cx="40" cy="40" r="34" fill="rgba(163,230,53,0.06)" stroke="url(#g15d)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
              <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g15d)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>Despegaste exitosamente.</motion.p>
            <motion.button className="lo15-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
