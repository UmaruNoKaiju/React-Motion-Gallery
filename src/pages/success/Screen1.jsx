import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen1.css';

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  const radius = 140 + (i % 3) * 30;
  return {
    id: i,
    startX: Math.cos(angle) * radius,
    startY: Math.sin(angle) * radius,
    size: 4 + (i % 4) * 2,
    color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#bfdbfe' : '#0ea5e9',
    delay: (i / 24) * 0.6,
  };
});

export default function Screen1({ onBack }) {
  const [phase, setPhase] = useState(0);
  // 0: partículas orbitando, 1: convergen, 2: checkmark + texto

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="sc1-root">
      {/* Fondo con gradiente radial animado */}
      <motion.div className="sc1-bg-glow"
        animate={{ scale: phase >= 2 ? [1, 1.4, 1] : 1, opacity: phase >= 2 ? [0.3, 0.8, 0.4] : 0.3 }}
        transition={{ duration: 0.8 }}
      />

      <div className="sc1-stage">
        {/* Partículas */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="sc1-particle"
            style={{ width: p.size, height: p.size, background: p.color }}
            initial={{ x: p.startX, y: p.startY, opacity: 0, scale: 0 }}
            animate={
              phase === 0
                ? { x: p.startX, y: p.startY, opacity: 1, scale: 1,
                    rotate: [0, 360],
                    transition: { rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                                  opacity: { duration: 0.4, delay: p.delay },
                                  scale: { duration: 0.4, delay: p.delay } } }
                : phase === 1
                ? { x: 0, y: 0, opacity: 0, scale: 0,
                    transition: { duration: 0.6, delay: p.delay * 0.4, ease: 'easeIn' } }
                : { x: p.startX * 2.5, y: p.startY * 2.5, opacity: 0, scale: 0,
                    transition: { duration: 0.5, delay: p.delay * 0.2 } }
            }
          />
        ))}

        {/* Flash de impacto */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div className="sc1-flash"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Checkmark SVG */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div className="sc1-check-wrap"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              <svg viewBox="0 0 100 100" width="100" height="100">
                <motion.circle cx="50" cy="50" r="44"
                  fill="none" stroke="#38bdf8" strokeWidth="3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
                <motion.path d="M28 52 l14 14 l30 -28"
                  fill="none" stroke="#38bdf8" strokeWidth="5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </svg>
              {/* Anillos de onda */}
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="sc1-ring"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Texto */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div className="sc1-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.span className="sc1-label"
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.18em' }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              KIT DE PARTES
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Registro Completado<br />Exitosamente
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Todas las partes han sido guardadas en el sistema.
            </motion.p>
            <motion.button className="sc1-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56,189,248,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
            >
              Ver inventario
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
