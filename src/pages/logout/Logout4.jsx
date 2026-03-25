import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './Logout4.css';

const DURATION = 5;

export default function Logout4({ onBack }) {
  const [phase, setPhase] = useState(0);
  const [counting, setCounting] = useState(false);
  const [seconds, setSeconds] = useState(DURATION);
  const intervalRef = useRef(null);
  const progress = useMotionValue(1);

  const startCountdown = () => {
    setCounting(true);
    animate(progress, 0, { duration: DURATION, ease: 'linear' });
    let s = DURATION;
    intervalRef.current = setInterval(() => {
      s--;
      setSeconds(s);
      if (s <= 0) {
        clearInterval(intervalRef.current);
        setPhase(1);
        setTimeout(() => setPhase(2), 800);
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    clearInterval(intervalRef.current);
    setCounting(false);
    setSeconds(DURATION);
    animate(progress, 1, { duration: 0.3 });
    onBack();
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const strokeDash = useTransform(progress, [0, 1], [0, 283]);

  return (
    <div className="lo4-root">
      <div className="lo4-bg" />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="main" className="lo4-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5 }}
          >
            {/* Anillo de cuenta regresiva */}
            <div className="lo4-ring-wrap">
              <svg viewBox="0 0 100 100" width="140" height="140">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(239,68,68,0.1)" strokeWidth="4" />
                <motion.circle cx="50" cy="50" r="45"
                  fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  style={{ strokeDashoffset: strokeDash, rotate: -90, transformOrigin: '50px 50px' }}
                  filter="url(#redGlow)"
                />
                <defs>
                  <filter id="redGlow">
                    <feGaussianBlur stdDeviation="2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
              </svg>
              <div className="lo4-ring-center">
                <motion.span className="lo4-seconds"
                  key={seconds}
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {seconds}
                </motion.span>
                <span className="lo4-sec-label">{counting ? 'segundos' : ''}</span>
              </div>
            </div>

            <h2>Cerrar sesión</h2>
            <p>
              {counting
                ? `La sesión se cerrará automáticamente en ${seconds}s`
                : 'Presiona el botón para iniciar el cierre de sesión.'}
            </p>

            <div className="lo4-actions">
              {counting ? (
                <motion.button className="lo4-cancel"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={cancelCountdown}
                >
                  Cancelar
                </motion.button>
              ) : (
                <>
                  <motion.button className="lo4-stay"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={onBack}
                  >
                    Quedarme
                  </motion.button>
                  <motion.button className="lo4-start"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(239,68,68,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={startCountdown}
                  >
                    Cerrar sesión
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo4-done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, delay: 0.1 }}
            >
              <circle cx="40" cy="40" r="36" fill="none" stroke="#1e293b" strokeWidth="2" />
              <motion.path d="M26 40 L36 50 L54 30" stroke="#38bdf8" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Hasta pronto.
            </motion.p>
            <motion.button className="lo4-back"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
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
