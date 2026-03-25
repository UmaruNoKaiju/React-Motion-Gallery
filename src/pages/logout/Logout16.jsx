import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout16.css';

const ICE_SHARDS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * 360;
  return { id: i, angle, delay: i * 0.04 };
});

export default function Logout16({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo16-root">
      <AnimatePresence>
        {phase === 1 && (
          <>
            <motion.div className="lo16-ice-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            {ICE_SHARDS.map(s => (
              <motion.div key={s.id} className="lo16-shard"
                style={{ rotate: s.angle }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0.9, 0.6, 0] }}
                transition={{ duration: 0.8, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
            <motion.div className="lo16-frost-ring"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo16-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ filter: 'blur(4px) brightness(2)', opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo16-icon">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs><linearGradient id="g16" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#38bdf8" /></linearGradient></defs>
                {/* Copo de nieve */}
                <motion.line x1="24" y1="6" x2="24" y2="42" stroke="url(#g16)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.2 }} />
                <motion.line x1="6" y1="24" x2="42" y2="24" stroke="url(#g16)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.3 }} />
                <motion.line x1="10" y1="10" x2="38" y2="38" stroke="url(#g16)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.4 }} />
                <motion.line x1="38" y1="10" x2="10" y2="38" stroke="url(#g16)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.5 }} />
                {[0,1,2,3,4,5,6,7].map(i => {
                  const a = (i / 8) * Math.PI * 2;
                  return <motion.circle key={i} cx={24 + Math.cos(a) * 14} cy={24 + Math.sin(a) * 14} r="2.5"
                    fill="url(#g16)" initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, type: 'spring' }} />;
                })}
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>Tu sesión quedará congelada hasta que vuelvas.</p>
            <div className="lo16-actions">
              <motion.button className="lo16-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo16-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Congelar sesión</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo16-done"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <defs><linearGradient id="g16d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#bae6fd" /><stop offset="100%" stopColor="#38bdf8" /></linearGradient></defs>
              <circle cx="40" cy="40" r="34" fill="rgba(186,230,253,0.06)" stroke="url(#g16d)" strokeWidth="2" />
              <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g16d)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Hasta pronto.</motion.p>
            <motion.button className="lo16-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
