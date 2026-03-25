import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout2.css';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 300,
  y: (Math.random() - 0.5) * 300,
  rotate: Math.random() * 720 - 360,
  size: Math.random() * 6 + 2,
  delay: Math.random() * 0.4,
  color: ['#38bdf8', '#7dd3fc', '#bfdbfe', '#0ea5e9', '#fff'][i % 5],
}));

export default function Logout2({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 1600);
  };

  return (
    <div className="lo2-root">
      <div className="lo2-bg-grid" />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo2-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4 }}
          >
            {/* Avatar SVG */}
            <div className="lo2-avatar-wrap">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="38" fill="url(#avatarGrad)" />
                <circle cx="40" cy="30" r="12" fill="rgba(255,255,255,0.9)" />
                <path d="M14 68 Q14 50 40 50 Q66 50 66 68" fill="rgba(255,255,255,0.9)" />
              </svg>
              <div className="lo2-avatar-ring" />
            </div>

            <h2>¿Salir de tu cuenta?</h2>
            <p>Se cerrará tu sesión en este dispositivo.</p>

            <div className="lo2-actions">
              <motion.button className="lo2-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Quedarme
              </motion.button>
              <motion.button className="lo2-confirm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Sí, salir
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="disintegrate" className="lo2-disintegrate"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            {/* Avatar desintegrándose */}
            <motion.div className="lo2-avatar-dissolve"
              animate={{ filter: ['blur(0px)', 'blur(8px)'], opacity: [1, 0], scale: [1, 1.1] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="38" fill="url(#avatarGrad)" />
                <circle cx="40" cy="30" r="12" fill="rgba(255,255,255,0.9)" />
                <path d="M14 68 Q14 50 40 50 Q66 50 66 68" fill="rgba(255,255,255,0.9)" />
              </svg>
            </motion.div>

            {/* Partículas */}
            {PARTICLES.map(p => (
              <motion.div key={p.id} className="lo2-particle"
                style={{ width: p.size, height: p.size, background: p.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0, rotate: p.rotate }}
                transition={{ duration: 0.8, delay: p.delay, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo2-done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg viewBox="0 0 80 80" width="70" height="70"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <circle cx="40" cy="40" r="36" fill="none" stroke="#1e293b" strokeWidth="2" />
              <motion.path d="M26 40 L36 50 L54 30" stroke="#38bdf8" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Tu sesión ha sido cerrada correctamente.
            </motion.p>
            <motion.button className="lo2-back"
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
