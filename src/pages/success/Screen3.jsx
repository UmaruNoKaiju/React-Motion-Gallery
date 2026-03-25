import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen3.css';

function CountUp({ target, duration, delay }) {
  const val = useMotionValue(0);
  const display = useTransform(val, (v) => Math.round(v));
  useEffect(() => {
    const c = animate(val, target, { duration, delay, ease: 'easeOut' });
    return c.stop;
  }, []);
  return <motion.span>{display}</motion.span>;
}

const BARS = [
  { label: 'Partes verificadas', pct: 100, delay: 0.2 },
  { label: 'Datos guardados',    pct: 100, delay: 0.5 },
  { label: 'Sistema actualizado',pct: 100, delay: 0.8 },
];

export default function Screen3({ onBack }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sc3-root">
      {/* Scanline animado de fondo */}
      <motion.div className="sc3-scanline"
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="loading" className="sc3-loading"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
          >
            {/* Número grande */}
            <div className="sc3-big-pct">
              <CountUp target={100} duration={2.4} delay={0.2} />
              <span className="sc3-pct-sign">%</span>
            </div>
            <p className="sc3-loading-label">Procesando registro...</p>

            {/* Barras */}
            <div className="sc3-bars">
              {BARS.map((b) => (
                <div key={b.label} className="sc3-bar-row">
                  <div className="sc3-bar-info">
                    <span>{b.label}</span>
                    <span className="sc3-bar-pct"><CountUp target={b.pct} duration={1.8} delay={b.delay} />%</span>
                  </div>
                  <div className="sc3-bar-track">
                    <motion.div className="sc3-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${b.pct}%` }}
                      transition={{ duration: 1.8, delay: b.delay, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="success" className="sc3-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Círculo con checkmark que se dibuja */}
            <motion.div className="sc3-check-container"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            >
              <svg viewBox="0 0 120 120" width="120" height="120">
                {/* Círculo exterior giratorio */}
                <motion.circle cx="60" cy="60" r="54"
                  fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1"
                  strokeDasharray="8 4"
                  animate={{ rotate: 360 }}
                  style={{ transformOrigin: '60px 60px' }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                {/* Círculo principal */}
                <motion.circle cx="60" cy="60" r="46"
                  fill="rgba(56,189,248,0.06)" stroke="#38bdf8" strokeWidth="2.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                {/* Check */}
                <motion.path d="M36 62 l16 16 l32 -32"
                  fill="none" stroke="#38bdf8" strokeWidth="5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </svg>
              {/* Pulso */}
              {[0, 1].map((i) => (
                <motion.div key={i} className="sc3-pulse"
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.4, ease: 'easeOut' }}
                />
              ))}
            </motion.div>

            {/* Texto con reveal por línea */}
            <div className="sc3-text-block">
              {['Registro', 'Completado', 'Exitosamente'].map((word, i) => (
                <div key={word} className="sc3-overflow-hide">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={`sc3-word sc3-w${i}`}>{word}</span>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div className="sc3-line"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              El kit de partes fue guardado exitosamente en el sistema de inventario.
            </motion.p>

            <motion.button className="sc3-btn"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
            >
              Ver inventario →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
