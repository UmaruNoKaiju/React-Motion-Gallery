import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Logout5.css';

const COLS = 8;
const ROWS = 6;
const TILES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    id: i, col, row,
    delay: (col * 0.04) + (row * 0.06) + Math.random() * 0.1,
    rotateX: (Math.random() - 0.5) * 60,
    rotateZ: (Math.random() - 0.5) * 30,
    fallY: 300 + Math.random() * 200,
  };
});

export default function Logout5({ onBack }) {
  const [phase, setPhase] = useState(0);

  const handleLogout = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 2200);
  };

  return (
    <div className="lo5-root">
      {/* Tiles que se rompen */}
      <AnimatePresence>
        {phase === 1 && (
          <div className="lo5-tiles-grid">
            {TILES.map(t => (
              <motion.div key={t.id} className="lo5-tile"
                style={{
                  gridColumn: t.col + 1,
                  gridRow: t.row + 1,
                }}
                initial={{ y: 0, rotateX: 0, rotateZ: 0, opacity: 1 }}
                animate={{ y: t.fallY, rotateX: t.rotateX, rotateZ: t.rotateZ, opacity: 0 }}
                transition={{ duration: 0.7, delay: t.delay, ease: [0.4, 0, 1, 1] }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="confirm" className="lo5-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5 }}
          >
            {/* Ícono lock SVG */}
            <motion.div className="lo5-icon"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
                <defs>
                  <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>
                <rect x="10" y="22" width="28" height="20" rx="4" fill="rgba(56,189,248,0.1)" stroke="url(#lockGrad)" strokeWidth="2" />
                <motion.path d="M16 22 L16 16 A8 8 0 0 1 32 16 L32 22"
                  stroke="url(#lockGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <circle cx="24" cy="32" r="3" fill="url(#lockGrad)" />
                <motion.line x1="24" y1="35" x2="24" y2="38"
                  stroke="url(#lockGrad)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
              </svg>
            </motion.div>

            <h2>Cerrar sesión</h2>
            <p>¿Deseas cerrar tu sesión actual?<br />Podrás volver a ingresar cuando quieras.</p>

            <div className="lo5-actions">
              <motion.button className="lo5-cancel"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Cancelar
              </motion.button>
              <motion.button className="lo5-confirm"
                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(56,189,248,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
              >
                Cerrar sesión
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div key="done" className="lo5-done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="lo5-done-lock"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 160, delay: 0.2 }}
            >
              <svg viewBox="0 0 64 64" width="72" height="72" fill="none">
                <rect x="12" y="30" width="40" height="28" rx="6"
                  fill="rgba(56,189,248,0.08)" stroke="#38bdf8" strokeWidth="2" />
                <path d="M20 30 L20 22 A12 12 0 0 1 44 22 L44 30"
                  stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <motion.circle cx="32" cy="44" r="4" fill="#38bdf8"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.6 }}
                />
                <motion.line x1="32" y1="48" x2="32" y2="52"
                  stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.8 }}
                />
              </svg>
            </motion.div>

            {'Sesión cerrada'.split('').map((char, i) => (
              <div key={i} className="lo5-char-overflow">
                <motion.span className="lo5-char"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char === ' ' ? '\u00a0' : char}
                </motion.span>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            >
              Tu sesión ha sido cerrada correctamente.
            </motion.p>

            <motion.button className="lo5-back"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56,189,248,0.4)' }}
              whileTap={{ scale: 0.95 }}
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
