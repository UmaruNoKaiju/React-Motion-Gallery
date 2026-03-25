import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen2.css';

// 7 hexágonos: 1 centro + 6 alrededor
const HEX_POSITIONS = [
  { id: 0, x: 0,    y: 0,    delay: 0.6 },
  { id: 1, x: 0,    y: -88,  delay: 0.1 },
  { id: 2, x: 76,   y: -44,  delay: 0.2 },
  { id: 3, x: 76,   y: 44,   delay: 0.3 },
  { id: 4, x: 0,    y: 88,   delay: 0.4 },
  { id: 5, x: -76,  y: 44,   delay: 0.5 },
  { id: 6, x: -76,  y: -44,  delay: 0.15 },
];

function Hexagon({ x, y, delay, phase, index }) {
  const fromX = (x === 0 ? (index % 2 === 0 ? -300 : 300) : x * 4);
  const fromY = (y === 0 ? -300 : y * 4);

  return (
    <motion.div
      className={`sc2-hex ${index === 0 ? 'sc2-hex-center' : ''}`}
      style={{ left: `calc(50% + ${x}px - 36px)`, top: `calc(50% + ${y}px - 40px)` }}
      initial={{ x: fromX, y: fromY, opacity: 0, scale: 0, rotate: -60 }}
      animate={
        phase === 0
          ? { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0,
              transition: { delay, duration: 0.6, type: 'spring', stiffness: 120 } }
          : phase === 1
          ? { x: fromX * 0.5, y: fromY * 0.5, opacity: 0, scale: 0, rotate: 60,
              transition: { delay: delay * 0.3, duration: 0.5, ease: 'easeIn' } }
          : { opacity: 0 }
      }
    >
      <svg viewBox="0 0 72 80" width="72" height="80">
        <polygon points="36,2 70,20 70,60 36,78 2,60 2,20"
          fill="none" stroke="#38bdf8" strokeWidth="1.5"
        />
        {index === 0 && (
          <motion.path d="M22 42 l10 10 l18 -20"
            fill="none" stroke="#38bdf8" strokeWidth="4"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={phase === 0 ? { pathLength: 1, transition: { delay: 1.2, duration: 0.5 } } : {}}
          />
        )}
      </svg>
    </motion.div>
  );
}

export default function Screen2({ onBack }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2400);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="sc2-root">
      <motion.div className="sc2-bg"
        animate={{ opacity: phase >= 2 ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Hexágonos */}
      <div className="sc2-stage">
        {HEX_POSITIONS.map((h) => (
          <Hexagon key={h.id} {...h} phase={phase} index={h.id} />
        ))}

        {/* Flash de explosión */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div className="sc2-burst"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Contenido final */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div className="sc2-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Icono central con rotación */}
            <motion.div className="sc2-icon-wrap"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            >
              <svg viewBox="0 0 72 80" width="90" height="100">
                <motion.polygon points="36,2 70,20 70,60 36,78 2,60 2,20"
                  fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path d="M22 42 l10 10 l18 -20"
                  fill="none" stroke="#38bdf8" strokeWidth="4"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
              </svg>
            </motion.div>

            {'Registro Completado Exitosamente'.split(' ').map((word, i) => (
              <motion.span key={word + i} className={`sc2-word sc2-word-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              El kit de partes fue guardado exitosamente.
            </motion.p>

            <motion.button className="sc2-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={onBack}
            >
              Continuar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
