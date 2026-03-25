import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logout1 from './logout/Logout1';
import Logout2 from './logout/Logout2';
import Logout3 from './logout/Logout3';
import Logout4 from './logout/Logout4';
import Logout5 from './logout/Logout5';
import Logout6 from './logout/Logout6';
import Logout7 from './logout/Logout7';
import Logout8 from './logout/Logout8';
import Logout9 from './logout/Logout9';
import Logout10 from './logout/Logout10';
import Logout11 from './logout/Logout11';
import Logout12 from './logout/Logout12';
import Logout13 from './logout/Logout13';
import Logout14 from './logout/Logout14';
import Logout15 from './logout/Logout15';
import Logout16 from './logout/Logout16';
import Logout17 from './logout/Logout17';
import './LogoutShowcase.css';

const screens = [
  { id: 1, label: 'Monitor CRT',   desc: 'Pantalla que se apaga como TV vieja',       component: Logout1 },
  { id: 2, label: 'Desintegrar',   desc: 'Avatar que explota en partículas',           component: Logout2 },
  { id: 3, label: 'Puerta',        desc: 'Dos paneles que se cierran como puerta',     component: Logout3 },
  { id: 4, label: 'Cuenta regresiva', desc: 'Anillo que se vacía, cancelable',         component: Logout4 },
  { id: 5,  label: 'Tiles',          desc: 'Pantalla que se rompe en mosaicos',       component: Logout5 },
  { id: 6,  label: 'Glitch',          desc: 'Pantalla que se corrompe y glitchea',     component: Logout6 },
  { id: 7,  label: 'Blob líquido',    desc: 'Ola cyan que absorbe toda la pantalla',   component: Logout7 },
  { id: 8,  label: 'Warp espacial',   desc: 'Zoom out al espacio con velocidad warp',  component: Logout8 },
  { id: 9,  label: 'Lluvia',          desc: 'Cortina de gotas que borra la pantalla',  component: Logout9 },
  { id: 10, label: 'Papel',           desc: 'Tarjeta que se dobla y desaparece',       component: Logout10 },
  { id: 11, label: 'Persianas',       desc: 'Tiras verticales que caen como persianas', component: Logout11 },
  { id: 12, label: 'Reloj',           desc: 'Reloj que gira y explota en confetti',     component: Logout12 },
  { id: 13, label: 'Teletransporte',  desc: 'Píxeles que se dispersan al salir',        component: Logout13 },
  { id: 14, label: 'Espiral',         desc: 'Vórtice que se traga la pantalla',         component: Logout14 },
  { id: 15, label: 'Despegue',        desc: 'Tarjeta lanzada al espacio',               component: Logout15 },
  { id: 16, label: 'Hielo',           desc: 'Copo de nieve + cristales que se expanden', component: Logout16 },
  { id: 17, label: 'Agua',            desc: 'Tarjeta que se hunde con ondas',           component: Logout17 },
];

export default function LogoutShowcase() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  if (active !== null) {
    const Screen = screens[active].component;
    return (
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        >
          <Screen onBack={() => setActive(null)} />
          <div className="lsc-back-pill" onClick={() => setActive(null)}>
            ← Volver
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="lsc-wrapper">
      <motion.div className="lsc-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        <button className="lsc-nav-btn" onClick={() => navigate('/')}>← Inicio</button>
        <h1>Logout Screens</h1>
        <p>5 animaciones de cierre de sesión</p>
      </motion.div>

      <motion.div className="lsc-grid"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {screens.map((s, i) => (
          <motion.div key={s.id} className="lsc-card"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(i)}
          >
            <div className="lsc-number">0{s.id}</div>
            <div className="lsc-label">{s.label}</div>
            <div className="lsc-desc">{s.desc}</div>
            <div className="lsc-arrow">→</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
