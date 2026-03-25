import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen6.css';

const TYPED_TEXT = 'KIT-2024-0847';

export default function Screen6({ onBack }) {
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState(0);
  // 0: typing, 1: check aparece, 2: texto final

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(TYPED_TEXT.slice(0, i + 1));
      i++;
      if (i >= TYPED_TEXT.length) clearInterval(interval);
    }, 80);
    const t1 = setTimeout(() => setPhase(1), TYPED_TEXT.length * 80 + 400);
    const t2 = setTimeout(() => setPhase(2), TYPED_TEXT.length * 80 + 1200);
    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="sc6-root">
      {/* Aurora de fondo */}
      <div className="sc6-aurora">
        <motion.div className="sc6-aurora-1"
          animate={{ x: [-40, 40, -40], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="sc6-aurora-2"
          animate={{ x: [30, -30, 30], y: [20, -20, 20], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="sc6-aurora-3"
          animate={{ x: [-20, 20, -20], y: [30, -30, 30] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="sc6-content">
        {/* ID que se escribe */}
        <motion.div className="sc6-typing-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="sc6-typing-label">Número de registro</span>
          <div className="sc6-typing-box">
            <span className="sc6-typed">{typed}</span>
            <motion.span className="sc6-cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Check SVG con trazo de luz */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div className="sc6-check-wrap"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            >
              <svg viewBox="0 0 140 140" width="140" height="140">
                {/* Círculo con gradiente */}
                <defs>
                  <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <motion.circle cx="70" cy="70" r="58"
                  fill="rgba(56,189,248,0.06)" stroke="url(#checkGrad)" strokeWidth="2.5"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
                <motion.path d="M40 72 l20 20 l40 -38"
                  fill="none" stroke="url(#checkGrad)" strokeWidth="6"
                  strokeLinecap="round" strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </svg>
              {/* Destellos */}
              {[0,1,2,3,4,5].map((i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                  <motion.div key={i} className="sc6-sparkle"
                    style={{ rotate: `${angle * (180/Math.PI)}deg` }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1, 0], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.06 }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Texto final con glitch */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div className="sc6-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h1 className="sc6-glitch" data-text="Registro Completado"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Registro Completado
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Exitosamente
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                El kit de partes fue guardado en el sistema de inventario.
              </motion.p>
              <motion.button className="sc6-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
              >
                <span>Ver inventario</span>
                <motion.span className="sc6-btn-arrow"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
