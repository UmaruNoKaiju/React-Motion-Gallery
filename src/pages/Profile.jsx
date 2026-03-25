import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise((r) => setTimeout(r, 1000));
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: '👤', label: 'Editar perfil' },
    { icon: '🔒', label: 'Seguridad' },
    { icon: '🔔', label: 'Notificaciones' },
    { icon: '🎨', label: 'Apariencia' },
    { icon: '❓', label: 'Ayuda' },
  ];

  return (
    <PageWrapper>
      <div className="profile-page">
        <motion.nav
          className="dash-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            className="back-btn"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
          >
            ← Dashboard
          </motion.button>
          <div className="nav-brand">✦ Nexus</div>
          <div style={{ width: 100 }} />
        </motion.nav>

        <div className="profile-content">
          <motion.div
            className="profile-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="avatar"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </motion.div>
            <h1>{user?.name || 'Usuario'}</h1>
            <p>{user?.email || 'usuario@correo.com'}</p>
            <div className="badge">✦ Miembro activo</div>
          </motion.div>

          <motion.div
            className="menu-list"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
          >
            {menuItems.map((m) => (
              <motion.div
                key={m.label}
                className="menu-item"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ x: 6, backgroundColor: '#1f2937' }}
              >
                <span className="menu-icon">{m.icon}</span>
                <span>{m.label}</span>
                <span className="menu-arrow">›</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="logout-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowConfirm(true)}
          >
            🚪 Cerrar Sesión
          </motion.button>
        </div>

        <AnimatePresence>
          {showConfirm && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loggingOut && setShowConfirm(false)}
            >
              <motion.div
                className="modal"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-icon">🚪</div>
                <h2>¿Cerrar sesión?</h2>
                <p>Se cerrará tu sesión actual en Nexus.</p>
                <div className="modal-actions">
                  <motion.button
                    className="btn-cancel"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowConfirm(false)}
                    disabled={loggingOut}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    className="btn-confirm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    {loggingOut ? <span className="spinner" /> : 'Sí, salir'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
