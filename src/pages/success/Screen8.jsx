import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './Screen8.css';

const MATRIX_CHARS = '01アイウエオカキクケコ∑∆∏√∞≠≈';

function MatrixColumn({ x, delay }) {
  const chars = Array.from({ length: 16 }, () =>
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  );
  return (
    <motion.div className="sc8-matrix-col" style={{ left: x }}
      initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
    >
      {chars.map((c, i) => (
        <motion.span key={i} className="sc8-matrix-char"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, delay: i * 0.1 + delay, repeat: Infinity, repeatDelay: 2 }}
        >
          {c}
        </motion.span>
      ))}
    </motion.div>
  );
}

const MATRIX_COLS = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: `${i * 4.8}%`, delay: Math.random() * 2,
}));

export default function Screen8({ onBack }) {
  const [phase, setPhase] = useState(0);
  // 0: matrix cayendo, 1: cortinas abriéndose, 2: contenido

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500);
    const t2 = setTimeout(() => setPhase(2), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="sc8-root">

      {/* Matrix de fondo */}
      <div className="sc8-matrix">
        {MATRIX_COLS.map(c => <MatrixColumn key={c.id} x={c.x} delay={c.delay} />)}
      </div>

      {/* Cortinas */}
      <AnimatePresence>
        {phase <= 1 && (
          <>
            <motion.div className="sc8-curtain sc8-curtain-left"
              animate={phase === 1 ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="sc8-curtain-content">
                <motion.div className="sc8-curtain-icon"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >⚙️</motion.div>
                <span>Procesando...</span>
              </div>
            </motion.div>
            <motion.div className="sc8-curtain sc8-curtain-right"
              animate={phase === 1 ? { x: '100%' } : { x: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="sc8-curtain-content sc8-curtain-content-right">
                <motion.div className="sc8-curtain-icon"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >🔩</motion.div>
                <span>Verificando...</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div className="sc8-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Neon check */}
            <motion.div className="sc8-neon-wrap"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            >
              <div className="sc8-neon-ring">
                <svg viewBox="0 0 100 100" width="120" height="120">
                  <defs>
                    <filter id="neon">
                      <feGaussianBlur stdDeviation="4" result="b1" />
                      <feGaussianBlur stdDeviation="8" result="b2" />
                      <feMerge>
                        <feMergeNode in="b2" />
                        <feMergeNode in="b1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.circle cx="50" cy="50" r="44"
                    fill="none" stroke="#38bdf8" strokeWidth="2"
                    filter="url(#neon)"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.path d="M28 52 l14 14 l30 -28"
                    fill="none" stroke="#38bdf8" strokeWidth="5"
                    strokeLinecap="round" strokeLinejoin="round"
                    filter="url(#neon)"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </svg>
              </div>
              <motion.div className="sc8-neon-pulse"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Texto con línea de reveal */}
            <div className="sc8-text">
              {['Registro', 'Completado', 'Exitosamente'].map((word, i) => (
                <div key={word} className="sc8-word-wrap">
                  <motion.div className="sc8-word-reveal"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span className={`sc8-word sc8-word-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Tarjeta de datos */}
            <motion.div className="sc8-data-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="sc8-data-row">
                <span className="sc8-data-key">ID</span>
                <span className="sc8-data-val">KIT-2024-0847</span>
              </div>
              <div className="sc8-data-divider" />
              <div className="sc8-data-row">
                <span className="sc8-data-key">Partes</span>
                <span className="sc8-data-val">12 componentes</span>
              </div>
              <div className="sc8-data-divider" />
              <div className="sc8-data-row">
                <span className="sc8-data-key">Estado</span>
                <motion.span className="sc8-data-status"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ● ACTIVO
                </motion.span>
              </div>
            </motion.div>

            <motion.button className="sc8-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(56,189,248,0.6)' }}
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
