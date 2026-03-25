import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen4.css';

const SPARKS = Array.from({ length: 40 }, (_, i) => {
  const angle = (i / 40) * Math.PI * 2;
  const dist = 120 + Math.random() * 100;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 3 + Math.random() * 5,
    color: ['#38bdf8', '#7dd3fc', '#fff', '#bae6fd', '#0ea5e9'][i % 5],
    delay: Math.random() * 0.3,
    duration: 0.6 + Math.random() * 0.4,
  };
});

const MINI_SPARKS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  return {
    id: i,
    x: Math.cos(angle) * (60 + Math.random() * 40),
    y: Math.sin(angle) * (60 + Math.random() * 40),
    delay: 0.1 + Math.random() * 0.2,
  };
});

export default function Screen4({ onBack }) {
  const [phase, setPhase] = useState(0);
  // 0: círculo pulsando, 1: morphing, 2: explosión, 3: texto

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="sc4-root">
      {/* Fondo con gradiente que cambia */}
      <motion.div className="sc4-bg"
        animate={{
          background: phase >= 3
            ? 'radial-gradient(ellipse at center, #0c2d52 0%, #030b15 70%)'
            : 'radial-gradient(ellipse at center, #051525 0%, #030b15 70%)',
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Grid de puntos */}
      <div className="sc4-dot-grid" />

      <div className="sc4-stage">
        {/* Chispas de explosión */}
        <AnimatePresence>
          {phase === 2 && (
            <>
              {SPARKS.map((s) => (
                <motion.div key={s.id} className="sc4-spark"
                  style={{ width: s.size, height: s.size, background: s.color }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: s.x, y: s.y, opacity: 0, scale: 0 }}
                  transition={{ duration: s.duration, delay: s.delay, ease: 'easeOut' }}
                />
              ))}
              {MINI_SPARKS.map((s) => (
                <motion.div key={`m${s.id}`} className="sc4-spark sc4-spark-line"
                  style={{ rotate: Math.atan2(s.y, s.x) * (180 / Math.PI) }}
                  initial={{ x: 0, y: 0, opacity: 1, scaleX: 1 }}
                  animate={{ x: s.x, y: s.y, opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.5, delay: s.delay, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Círculo / morphing */}
        <AnimatePresence>
          {phase < 3 && (
            <motion.div className="sc4-morph-wrap" exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}>
              <svg viewBox="0 0 120 120" width="160" height="160">
                {/* Anillos orbitando */}
                {phase === 0 && [0, 1].map((i) => (
                  <motion.circle key={i} cx="60" cy="60" r={38 + i * 12}
                    fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1"
                    strokeDasharray="6 4"
                    animate={{ rotate: i === 0 ? 360 : -360 }}
                    style={{ transformOrigin: '60px 60px' }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
                  />
                ))}

                {/* Círculo principal que pulsa */}
                <motion.circle cx="60" cy="60" r="36"
                  fill="rgba(56,189,248,0.05)"
                  stroke="#38bdf8" strokeWidth="2.5"
                  animate={phase === 0
                    ? { r: [36, 40, 36], opacity: [1, 0.6, 1] }
                    : { r: 36, opacity: 1 }}
                  transition={phase === 0
                    ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                    : {}}
                />

                {/* Check que aparece en morphing */}
                {phase >= 1 && (
                  <motion.path d="M34 62 l16 16 l36 -34"
                    fill="none" stroke="#38bdf8" strokeWidth="5"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}
              </svg>

              {/* Pulso de fondo */}
              {phase === 0 && [0, 1, 2].map((i) => (
                <motion.div key={i} className="sc4-pulse-ring"
                  animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                  transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flash */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div className="sc4-flash"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Check final grande */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div className="sc4-final-check"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              <svg viewBox="0 0 120 120" width="140" height="140">
                <motion.circle cx="60" cy="60" r="52"
                  fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path d="M32 63 l18 18 l38 -36"
                  fill="none" stroke="#38bdf8" strokeWidth="6"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Texto final */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div className="sc4-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div className="sc4-badge"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.7 }}
            >
              ✦ KIT DE PARTES
            </motion.div>
            <h1>
              {'Registro Completado'.split('').map((char, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.03 }}
                >
                  {char === ' ' ? '\u00a0' : char}
                </motion.span>
              ))}
            </h1>
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: 'spring' }}
            >
              Exitosamente
            </motion.h2>
            <motion.button className="sc4-btn"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }}
              whileTap={{ scale: 0.94 }}
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
