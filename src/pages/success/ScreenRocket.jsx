import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './ScreenRocket.css';

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.6 + 0.2,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}));

const SMOKE = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 40,
  delay: i * 0.15,
  size: 20 + Math.random() * 30,
}));

function RocketSVG() {
  return (
    <svg viewBox="0 0 80 160" width="80" height="160" xmlns="http://www.w3.org/2000/svg">
      {/* Cuerpo principal */}
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e4976" />
          <stop offset="40%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#1e4976" />
        </linearGradient>
        <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0369a1" />
          <stop offset="50%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="30%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="flame2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Aletas izquierda */}
      <path d="M22 110 L4 140 L22 130 Z" fill="url(#wingGrad)" opacity="0.9" />
      {/* Aletas derecha */}
      <path d="M58 110 L76 140 L58 130 Z" fill="url(#wingGrad)" opacity="0.9" />

      {/* Cuerpo */}
      <rect x="22" y="50" width="36" height="90" rx="4" fill="url(#bodyGrad)" />

      {/* Nariz */}
      <path d="M22 50 Q40 0 58 50 Z" fill="url(#noseGrad)" />

      {/* Ventana */}
      <circle cx="40" cy="80" r="10" fill="#0a1628" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="40" cy="80" r="6" fill="#0c2d52" />
      <circle cx="37" cy="77" r="2" fill="rgba(56,189,248,0.5)" />

      {/* Detalle horizontal */}
      <rect x="22" y="100" width="36" height="3" rx="1.5" fill="rgba(56,189,248,0.3)" />
      <rect x="22" y="108" width="36" height="2" rx="1" fill="rgba(56,189,248,0.2)" />

      {/* Boquilla del motor */}
      <path d="M28 140 L52 140 L56 148 L24 148 Z" fill="#0c2d52" stroke="#1e4976" strokeWidth="1" />
    </svg>
  );
}

function FlameSVG({ scale = 1 }) {
  return (
    <svg viewBox="0 0 60 80" width={60 * scale} height={80 * scale} xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'url(#glowFilter)' }}>
      <defs>
        <filter id="flameGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Llama exterior */}
      <path d="M30 0 Q50 20 45 50 Q40 70 30 80 Q20 70 15 50 Q10 20 30 0 Z"
        fill="url(#flameGrad)" filter="url(#flameGlow)" opacity="0.9" />
      {/* Llama interior */}
      <path d="M30 10 Q42 28 38 52 Q35 65 30 72 Q25 65 22 52 Q18 28 30 10 Z"
        fill="url(#flame2Grad)" opacity="0.8" />
      {/* Núcleo blanco */}
      <ellipse cx="30" cy="18" rx="6" ry="10" fill="white" opacity="0.9" />
    </svg>
  );
}

export default function ScreenRocket({ onBack }) {
  const [phase, setPhase] = useState(0);
  // 0: en plataforma, 1: despegando, 2: volando, 3: éxito

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(() => setPhase(3), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="sr-root">
      {/* Estrellas */}
      {STARS.map(s => (
        <motion.div key={s.id} className="sr-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}

      {/* Estela del cohete */}
      <AnimatePresence>
        {phase >= 2 && phase < 3 && (
          <motion.div className="sr-trail"
            initial={{ height: 0, opacity: 0.8 }}
            animate={{ height: 300, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Plataforma de lanzamiento */}
      <AnimatePresence>
        {phase <= 1 && (
          <motion.div className="sr-platform"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="sr-platform-arm sr-arm-left" />
            <div className="sr-platform-arm sr-arm-right" />
            <div className="sr-platform-base" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Humo de lanzamiento */}
      <AnimatePresence>
        {phase === 1 && (
          <div className="sr-smoke-container">
            {SMOKE.map(s => (
              <motion.div key={s.id} className="sr-smoke-puff"
                style={{ width: s.size, height: s.size, left: `calc(50% + ${s.x}px)` }}
                initial={{ y: 0, opacity: 0.7, scale: 0.3 }}
                animate={{ y: [0, -30, -80], opacity: [0.7, 0.4, 0], scale: [0.3, 1, 1.8] }}
                transition={{ duration: 1.5, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Cohete */}
      <AnimatePresence>
        {phase < 3 && (
          <motion.div className="sr-rocket-wrap"
            animate={
              phase === 0 ? { y: 0 } :
              phase === 1 ? { y: [0, 10, -20], transition: { duration: 0.8, times: [0, 0.3, 1] } } :
              { y: -800, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }
            }
          >
            {/* Llamas animadas */}
            <div className="sr-flames">
              <motion.div className="sr-flame-main"
                animate={phase >= 1
                  ? { scaleY: [1, 1.4, 0.8, 1.2, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }
                  : { scaleY: 0.3, scaleX: 0.3, opacity: 0 }}
                transition={{ duration: 0.15, repeat: Infinity }}
              >
                <FlameSVG scale={1} />
              </motion.div>
              <motion.div className="sr-flame-secondary"
                animate={phase >= 1
                  ? { scaleY: [0.7, 1.1, 0.6, 0.9, 0.7], scaleX: [0.6, 0.8, 0.5, 0.7, 0.6], opacity: [0.6, 0.9, 0.5, 0.8, 0.6] }
                  : { scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.12, repeat: Infinity, delay: 0.05 }}
              >
                <FlameSVG scale={0.7} />
              </motion.div>
            </div>

            <RocketSVG />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje de éxito */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div className="sr-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Check SVG */}
            <motion.div className="sr-check-wrap"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
            >
              <svg viewBox="0 0 120 120" width="120" height="120">
                <defs>
                  <linearGradient id="checkCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <filter id="checkGlow">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Anillos decorativos */}
                <motion.circle cx="60" cy="60" r="56"
                  fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1"
                  strokeDasharray="5 4"
                  animate={{ rotate: 360 }}
                  style={{ transformOrigin: '60px 60px' }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                {/* Círculo principal */}
                <motion.circle cx="60" cy="60" r="46"
                  fill="rgba(56,189,248,0.07)"
                  stroke="url(#checkCircleGrad)" strokeWidth="2.5"
                  filter="url(#checkGlow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Check */}
                <motion.path d="M34 62 l18 18 l34 -34"
                  fill="none" stroke="url(#checkCircleGrad)" strokeWidth="5.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  filter="url(#checkGlow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </svg>
              {/* Pulsos */}
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="sr-pulse"
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.5 + i * 0.35, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.8 }}
                />
              ))}
            </motion.div>

            {/* Texto */}
            <div className="sr-text">
              <motion.span className="sr-eyebrow"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                KIT DE PARTES · AUTOPARTES
              </motion.span>

              {['Registro', 'Completado', 'Exitosamente'].map((w, i) => (
                <div key={w} className="sr-overflow">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={`sr-word sr-w${i}`}>{w}</span>
                  </motion.div>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                El kit fue guardado exitosamente en el sistema de inventario.
              </motion.p>

              <motion.button className="sr-btn"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
              >
                Ver inventario
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
