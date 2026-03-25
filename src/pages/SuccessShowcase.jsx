import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Screen1 from './success/Screen1';
import Screen2 from './success/Screen2';
import Screen3 from './success/Screen3';
import Screen4 from './success/Screen4';
import Screen5 from './success/Screen5';
import Screen6 from './success/Screen6';
import Screen7 from './success/Screen7';
import Screen8 from './success/Screen8';
import ScreenRocket from './success/ScreenRocket';
import './SuccessShowcase.css';

const screens = [
  { id: 1, label: 'Partículas',  desc: 'Convergen y forman el check',    component: Screen1 },
  { id: 2, label: 'Hexágonos',   desc: 'Se ensamblan y explotan',         component: Screen2 },
  { id: 3, label: 'Contador',    desc: 'Barras de carga + reveal dramático', component: Screen3 },
  { id: 4, label: 'Chispas',     desc: 'Círculo que explota en fuegos artificiales', component: Screen4 },
  { id: 5, label: 'Flip 3D',     desc: 'Tarjeta que se voltea con iconos flotantes', component: Screen5 },
  { id: 6, label: 'Aurora',      desc: 'Typewriter + glitch + aurora de fondo', component: Screen6 },
  { id: 7, label: 'Orbital',     desc: 'Iconos orbitando + cuenta regresiva + burst', component: Screen7 },
  { id: 8, label: 'Cortinas',    desc: 'Matrix + cortinas que se abren + neon', component: Screen8 },
  { id: 9, label: 'Cohete',      desc: 'Cohete SVG despega con llamas y estela', component: ScreenRocket },
];

export default function SuccessShowcase() {
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
          <div className="sc-back-pill" onClick={() => setActive(null)}>
            ← Volver
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="sc-wrapper">
      <motion.div className="sc-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        <button className="sc-nav-btn" onClick={() => navigate('/')}>← Inicio</button>
        <h1>Success Screens</h1>
        <p>Selecciona una animación para previsualizarla</p>
      </motion.div>

      <motion.div className="sc-grid"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {screens.map((s, i) => (
          <motion.div key={s.id} className="sc-card"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(i)}
          >
            <div className="sc-number">0{s.id}</div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-desc">{s.desc}</div>
            <div className="sc-arrow">→</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
