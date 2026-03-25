import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout17.css';

export default function Logout17({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2000);
  };

  return (
    <div className="lo17-root">
      {/* Ondas de agua */}
      <div className="lo17-water">
        {[0,1,2].map(i => (
          <motion.div key={i} className="lo17-wave"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </div>

      <AnimatePresence>
        {phase === 1 && [0,1,2].map(i => (
          <motion.div key={i} className="lo17-ripple"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4 + i, opacity: 0 }}
            transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="c" className="lo17-card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ y: 300, scale: 0.3, opacity: 0, rotateX: 40, transition: { duration: 0.8, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo17-icon">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs><linearGradient id="g17" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#059669" /></linearGradient></defs>
                {/* Ancla */}
                <motion.circle cx="24" cy="12" r="5" fill="none" stroke="url(#g17)" strokeWidth="2.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
                <motion.line x1="24" y1="17" x2="24" y2="40" stroke="url(#g17)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.4 }} />
                <motion.path d="M14 26 Q14 40 24 40 Q34 40 34 26" stroke="url(#g17)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                <motion.line x1="14" y1="22" x2="34" y2="22" stroke="url(#g17)" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.7 }} />
              </svg>
            </motion.div>
            <h2>Cerrar sesión</h2>
            <p>¿Deseas anclar tu sesión y salir?</p>
            <div className="lo17-actions">
              <motion.button className="lo17-cancel" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onBack}>Cancelar</motion.button>
              <motion.button className="lo17-confirm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout}>Salir</motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="d" className="lo17-done"
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          >
            <motion.svg viewBox="0 0 80 80" width="80" height="80" fill="none"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
            >
              <defs><linearGradient id="g17d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#059669" /></linearGradient></defs>
              <circle cx="40" cy="40" r="34" fill="rgba(52,211,153,0.06)" stroke="url(#g17d)" strokeWidth="2" />
              <motion.path d="M24 40 L34 50 L56 28" stroke="url(#g17d)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
            </motion.svg>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>Sesión cerrada</motion.h3>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Hasta pronto.</motion.p>
            <motion.button className="lo17-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onBack}>Volver al inicio</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
