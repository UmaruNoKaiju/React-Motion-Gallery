import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Logout12.css';

const CONFETTI = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 500,
  y: Math.random() * -400 - 50,
  rotate: Math.random() * 720,
  color: ['#fbbf24','#f59e0b','#fcd34d','#fff','#fde68a'][i % 5],
  size: Math.random() * 10 + 5,
  delay: Math.random() * 0.3,
}));

function ClockSVG({ spinning }) {
  return (
    <svg viewBox="0 0 100 100" width="120" height="120" fill="none">
      <defs>
        <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="rgba(251,191,36,0.06)" stroke="url(#g12)" strokeWidth="2.5" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={50 + Math.cos(a) * 36} y1={50 + Math.sin(a) * 36}
          x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40}
          stroke="rgba(251,191,36,0.4)" strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* Manecilla de minutos */}
      <motion.line x1="50" y1="50" x2="50" y2="16"
        stroke="url(#g12)" strokeWidth="3" strokeLinecap="round"
        animate={spinning ? { rotate: [0, 360 * 3] } : { rotate: 0 }}
        style={{ transformOrigin: '50px 50px' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Manecilla de horas */}
      <motion.line x1="50" y1="50" x2="50" y2="24"
        stroke="url(#g12)" strokeWidth="4" strokeLinecap="round"
        animate={spinning ? { rotate: [0, 360] } : { rotate: 0 }}
        style={{ transformOrigin: '50px 50px' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <circle cx="50" cy="50" r="4" fill="url(#g12)" />
    </svg>
  );
}

export default function Logout12({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2200);
  };

  return (
    <div className="lo12-root">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo12-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
          >
            <div className="lo12-clock-wrap">
              <ClockSVG spinning={false} />
            </div>
            <h2>Cerrar sesión</h2>
            <p>Es hora de salir. ¿Confirmas?</p>
            <div className="lo12-actions">
              <motion.button className="lo12-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo12-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Salir</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="spin" className="lo12-spinning"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
          >
            <div className="lo12-confetti-origin">
              {CONFETTI.map(c => (
                <motion.div key={c.id} className="lo12-piece"
                  style={{ background: c.color, width: c.size, height: c.size * 0.5 }}
                  initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                  animate={{ x: c.x, y: c.y, opacity: [0, 1, 0], rotate: c.rotate }}
                  transition={{ duration: 1.2, delay: 1.5 + c.delay, ease: 'easeOut' }}
                />
              ))}
            </div>
            <ClockSVG spinning={true} />
            <motion.p className="lo12-spin-label"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              Cerrando sesión...
            </motion.p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo12-done"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo12-done-icon"
              initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
            >
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                <circle cx="40" cy="40" r="34" fill="rgba(251,191,36,0.08)" stroke="url(#g12done)" strokeWidth="2" />
                <defs><linearGradient id="g12done" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#d97706" /></linearGradient></defs>
                <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g12done)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }} />
              </svg>
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Hasta pronto.</motion.p>
            <motion.button className="lo12-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
