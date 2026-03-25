import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import './Dashboard.css';

const stats = [
  { label: 'Proyectos', value: '12', icon: '📁', color: '#7c3aed' },
  { label: 'Tareas', value: '48', icon: '✅', color: '#2563eb' },
  { label: 'Mensajes', value: '7', icon: '💬', color: '#db2777' },
  { label: 'Notificaciones', value: '3', icon: '🔔', color: '#059669' },
];

const activities = [
  { text: 'Completaste el módulo de diseño', time: 'Hace 2h', icon: '🎨' },
  { text: 'Nuevo mensaje de Ana García', time: 'Hace 4h', icon: '💬' },
  { text: 'Proyecto "Alpha" actualizado', time: 'Ayer', icon: '📁' },
  { text: 'Reunión programada para mañana', time: 'Ayer', icon: '📅' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="dashboard">
        <motion.nav
          className="dash-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="nav-brand">✦ Nexus</div>
          <div className="nav-actions">
            <motion.button
              className="nav-profile"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/profile')}
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </motion.button>
          </div>
        </motion.nav>

        <div className="dash-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dash-header"
          >
            <h1>Hola, <span>{user?.name || 'Usuario'}</span> 👋</h1>
            <p>Aquí está tu resumen de hoy.</p>
          </motion.div>

          <motion.div
            className="stats-grid"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {stats.map((s) => (
              <motion.div key={s.label} className="stat-card" variants={item} whileHover={{ y: -5, scale: 1.02 }}>
                <div className="stat-icon" style={{ background: s.color + '22', color: s.color }}>{s.icon}</div>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="activity-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2>Actividad reciente</h2>
            <div className="activity-list">
              {activities.map((a, i) => (
                <motion.div
                  key={i}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="act-icon">{a.icon}</span>
                  <div>
                    <p>{a.text}</p>
                    <small>{a.time}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
