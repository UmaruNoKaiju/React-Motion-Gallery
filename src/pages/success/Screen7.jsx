import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Screen7.css';

const ORBIT_ICONS = [
  { icon: '⚙️', radius: 110, speed: 6,  size: 1.6 },
  { icon: '🔩', radius: 140, speed: 9,  size: 1.3 },
  { icon: '🔧', radius: 90,  speed: 7,  size: 1.4 },
  { icon: '🛞', radius: 160, speed: 11, size: 1.2 },
  { icon: '🔑', radius: 120, speed: 8,  size: 1.3 },
  { icon: '⛽', radius: 100, speed: 10, size: 1.1 },
];

function OrbitalIcon({ icon, radius, speed, size, phase }) {
  return (
    <motion.div
      className="sc7-orbit-icon"
      style={{ fontSize: `${size}rem` }}
      animate={phase === 0 ? {
        rotate: [0, 360],
        x: [radius, 0, -radius, 0, radius],
        y: [0, -radius, 0, radius, 0],
      } : {
        scale: 0,
        opacity: 0,
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
      }}
      transition={phase === 0 ? {
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      } : {
        duration: 0.5,
        ease: 'easeIn',
      }}
    >
      {icon}
    </motion.div>
  );
}

function CountdownRing({ phase }) {
  const progress = useMotionValue(1);
  const strokeDash = useTransform(progress, [0, 1], [0, 283]);
  const countVal = useMotionValue(3);
  const countDisplay = useTransform(countVal, v => Math.ceil(v));

  useEffect(() => {
    if (phase !== 0) return;
    const c1 = animate(progress, 0, { duration: 3, ease: 'linear' });
    const c2 = animate(countVal, 0, { duration: 3, ease: 'linear' });
    return () => { c1.stop(); c2.stop(); };
  }, [phase]);

  return (
    <div className="sc7-ring-wrap">
      <svg viewBox="0 0 100 100" width="200" height="200">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="3" />
        <motion.circle
          cx="50" cy="50" r="45"
          fill="none" stroke="#38bdf8" strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="283"
          style={{ strokeDashoffset: strokeDash, rotate: -90, transformOrigin: '50px 50px' }}
          filter="url(#ringGlow)"
        />
        <defs>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
      <div className="sc7-count-center">
        <motion.span className="sc7-count-num">{countDisplay}</motion.span>
        <span className="sc7-count-label">procesando</span>
      </div>
    </div>
  );
}

export default function Screen7({ onBack }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3200);
    const t2 = setTimeout(() => setPhase(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="sc7-root">
      {/* Fondo con líneas de velocidad */}
      <div className="sc7-speed-lines">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div key={i} className="sc7-speed-line"
            style={{ top: `${5 + i * 4.5}%`, width: `${30 + Math.random() * 40}%`, left: `${Math.random() * 30}%` }}
            animate={{ x: ['0%', '120%'], opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.2 + Math.random(), delay: Math.random() * 2, repeat: Infinity, ease: 'easeIn' }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="countdown" className="sc7-countdown"
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="sc7-orbit-stage">
              {ORBIT_ICONS.map((o, i) => (
                <OrbitalIcon key={i} {...o} phase={phase} />
              ))}
              <CountdownRing phase={phase} />
            </div>
            <p className="sc7-processing">Registrando kit de partes...</p>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div key="burst" className="sc7-burst-stage"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="sc7-burst-circle" />
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="success" className="sc7-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icono central con múltiples anillos */}
            <div className="sc7-icon-stage">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="sc7-success-ring"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2.5 + i * 0.6, opacity: 0 }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
              <motion.div className="sc7-success-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12 }}
              >
                <svg viewBox="0 0 100 100" width="110" height="110">
                  <defs>
                    <radialGradient id="iconBg">
                      <stop offset="0%" stopColor="rgba(56,189,248,0.2)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </radialGradient>
                    <filter id="successGlow">
                      <feGaussianBlur stdDeviation="3" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="url(#iconBg)" stroke="#38bdf8" strokeWidth="2" filter="url(#successGlow)" />
                  <motion.path d="M28 52 l14 14 l30 -28"
                    fill="none" stroke="#38bdf8" strokeWidth="5.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    filter="url(#successGlow)"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Texto cinematográfico */}
            <div className="sc7-text">
              <motion.div className="sc7-line-wrap"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                <motion.div className="sc7-reveal-line"
                  initial={{ x: '-101%' }} animate={{ x: '101%' }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <span className="sc7-eyebrow">KIT DE PARTES · AUTOPARTES</span>
              </motion.div>

              {['Registro', 'Completado', 'Exitosamente'].map((w, i) => (
                <div key={w} className="sc7-overflow">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={`sc7-big-word sc7-bw${i}`}>{w}</span>
                  </motion.div>
                </div>
              ))}

              <motion.div className="sc7-meta"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="sc7-meta-item">📋 KIT-2024-0847</span>
                <span className="sc7-meta-dot">·</span>
                <span className="sc7-meta-item">🔩 12 partes</span>
                <span className="sc7-meta-dot">·</span>
                <span className="sc7-meta-item">✅ Verificado</span>
              </motion.div>

              <motion.button className="sc7-btn"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(56,189,248,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
              >
                <motion.span
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="sc7-btn-inner"
                >
                  Ver inventario
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
