import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import './Auth.css';

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.12 + 0.3 } }),
};

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const fields = [
    { key: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
    { key: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
    { key: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••' },
    { key: 'confirm', label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v)) return setError('Completa todos los campos');
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden');
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1200));
    login(form.email, form.name);
    navigate('/dashboard');
  };

  return (
    <PageWrapper>
      <div className="auth-page register-page">
        <div className="auth-right" style={{ flex: 1 }}>
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="brand-top">
              <span className="brand-icon">✦</span> Nexus
            </div>
            <h1>Crear Cuenta</h1>
            <p className="subtitle">¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span></p>

            <form onSubmit={handleSubmit}>
              {fields.map(({ key, label, type, placeholder }, i) => (
                <motion.div key={key} className="field" custom={i} variants={fieldVariants} initial="hidden" animate="visible">
                  <label>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </motion.div>
              ))}

              {error && <motion.p className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}

              <motion.button
                type="submit"
                className="btn-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : 'Registrarse'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="auth-left register-left">
          <motion.div
            className="auth-brand"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Únete hoy</h2>
            <p>Crea tu cuenta y descubre todo lo que Nexus tiene para ti.</p>
          </motion.div>
          <div className="auth-circles">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="auth-circle"
                animate={{ rotate: -360 }}
                transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                style={{ '--ci': i }}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
