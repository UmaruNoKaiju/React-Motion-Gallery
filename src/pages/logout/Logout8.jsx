import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout8.css';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.7 + 0.1,
}));

const WARP_STARS = Array.from({ length: 50 }, (_, i) => {
  const angle = (i / 50) * Math.PI * 2;
  return {
    id: i,
    angle,
    delay: Math.random() * 0.3,
  };
});

export default function Logout8({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo8-root">
      {/* Estrellas estáticas */}
      {STARS.map(s => (
        <div key={s.id} className="lo8-star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}

      {/* Warp speed */}
      <AnimatePresence>
        {phase === 1 && (
          <div className="lo8-warp">
            {WARP_STARS.map(s => (
              <motion.div key={s.id} className="lo8-warp-line"
                style={{ rotate: `${s.angle * (180 / Math.PI)}deg` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.6, delay: s.delay, repeat: 2, ease: 'easeIn' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo8-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 0.02, opacity: 0, y: -200, transition: { duration: 0.8, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo8-icon">
              <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                <defs>
                  <radialGradient id="lo8grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </radialGradient>
                </defs>
                {/* Planeta */}
                <circle cx="24" cy="24" r="14" fill="url(#lo8grad)" />
                {/* Anillo */}
                <motion.ellipse cx="24" cy="24" rx="20" ry="6"
                  fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.6"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                {/* Brillo */}
                <circle cx="19" cy="19" r="3" fill="rgba(255,255,255,0.3)" />
              </svg>
            </motion.div>

            <h2>¿Salir de la sesión?</h2>
            <p>Serás desconectado de tu cuenta.</p>

            <div className="lo8-actions">
              <motion.button className="lo8-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo8-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(129,140,248,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Salir
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo8-done"
            initial={{ opacity: 0, scale: 3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="1" strokeDasharray="4 3" />
            </motion.svg>

            <motion.div className="lo8-done-center"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.3 }}
            >
              <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                <circle cx="30" cy="30" r="26" fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="2" />
                <motion.path d="M18 30 L26 38 L42 22"
                  stroke="#818cf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Sesión cerrada
            </motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              Hasta pronto, viajero.
            </motion.p>
            <motion.button className="lo8-back"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
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
