import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout13.css';

const PIXELS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 16 + 4,
  delay: Math.random() * 0.8,
  color: ['#22d3ee','#06b6d4','#0891b2','#fff','#a5f3fc'][i % 5],
}));

export default function Logout13({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo13-root">
      <div className="lo13-scanline" />

      <AnimatePresence>
        {phase === 1 && PIXELS.map(p => (
          <motion.div key={p.id} className="lo13-pixel"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0], y: [0, -20, -60] }}
            transition={{ duration: 0.6, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo13-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{
              filter: ['blur(0px)', 'blur(2px)', 'blur(8px)'],
              opacity: [1, 0.8, 0],
              scale: [1, 1.02, 0.95],
              transition: { duration: 0.5 }
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo13-icon">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs><linearGradient id="g13" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#0891b2" /></linearGradient></defs>
                {/* Ícono de teletransporte / señal */}
                <motion.circle cx="24" cy="24" r="8" fill="rgba(34,211,238,0.1)" stroke="url(#g13)" strokeWidth="2"
                  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <motion.circle cx="24" cy="24" r="16" fill="none" stroke="url(#g13)" strokeWidth="1.5" opacity="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
                <motion.circle cx="24" cy="24" r="22" fill="none" stroke="url(#g13)" strokeWidth="1" opacity="0.25"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                <circle cx="24" cy="24" r="3" fill="url(#g13)" />
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>Serás teletransportado fuera de tu cuenta.</p>
            <div className="lo13-actions">
              <motion.button className="lo13-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo13-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Teletransportar</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo13-done"
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <defs><linearGradient id="g13d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#0891b2" /></linearGradient></defs>
              <motion.circle cx="40" cy="40" r="34" fill="none" stroke="url(#g13d)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
              <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g13d)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>Teletransportación completada.</motion.p>
            <motion.button className="lo13-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
