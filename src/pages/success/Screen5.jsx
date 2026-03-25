import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen5.css';

const FLOATERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  icon: ['⚙️','🔩','🔧','🪛','🔑','⛽','🛞','🔌'][i % 8],
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.2 + Math.random() * 1.2,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
  opacity: 0.08 + Math.random() * 0.12,
}));

const STEPS = [
  { icon: '📋', label: 'Datos del kit',      done: true },
  { icon: '🔩', label: 'Partes registradas', done: true },
  { icon: '✅', label: 'Sistema actualizado', done: true },
];

export default function Screen5({ onBack }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sc5-root">
      {/* Iconos flotantes de fondo */}
      {FLOATERS.map((f) => (
        <motion.div key={f.id} className="sc5-floater"
          style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: `${f.size}rem`, opacity: f.opacity }}
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {f.icon}
        </motion.div>
      ))}

      {/* Tarjeta con flip 3D */}
      <motion.div className="sc5-card-scene"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frente: cargando */}
        <div className="sc5-face sc5-front">
          <motion.div className="sc5-gear-wrap"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ⚙️
          </motion.div>
          <h3>Registrando kit...</h3>
          <div className="sc5-front-steps">
            {STEPS.map((s, i) => (
              <motion.div key={s.label} className="sc5-front-step"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
              >
                <motion.span className="sc5-step-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.4 + 0.2, type: 'spring' }}
                >
                  {s.icon}
                </motion.span>
                <span>{s.label}</span>
                <motion.span className="sc5-step-check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.4 + 0.5, type: 'spring' }}
                >
                  ✓
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reverso: éxito */}
        <div className="sc5-face sc5-back">
          <motion.div className="sc5-back-icon"
            initial={{ scale: 0 }}
            animate={flipped ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          >
            <span>🏆</span>
            <motion.div className="sc5-icon-glow"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div className="sc5-back-text"
            initial={{ opacity: 0, y: 20 }}
            animate={flipped ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <span className="sc5-back-eyebrow">KIT DE PARTES</span>
            <h2>Registro Completado<br />Exitosamente</h2>
            <p>Todas las partes han sido guardadas y verificadas en el sistema.</p>
          </motion.div>

          <motion.div className="sc5-back-stats"
            initial={{ opacity: 0 }}
            animate={flipped ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            {[['12', 'Partes'], ['3', 'Ensambles'], ['100%', 'Verificado']].map(([v, l]) => (
              <div key={l} className="sc5-stat">
                <strong>{v}</strong>
                <span>{l}</span>
              </div>
            ))}
          </motion.div>

          <motion.button className="sc5-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={flipped ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
          >
            Ver inventario
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
