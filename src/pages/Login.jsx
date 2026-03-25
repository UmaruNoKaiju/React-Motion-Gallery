import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageWrapper from '../components/PageWrapper';
import './Auth.css';

const fieldVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.15 + 0.3 } }),
};

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Completa todos los campos');
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1200));
    login(form.email, form.email.split('@')[0]);
    navigate('/dashboard');
  };

  return (
    <PageWrapper>
      <div className="auth-page">
        <div className="auth-left">
          <motion.div
            className="auth-brand"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="brand-icon">✦</span>
            <h2>Nexus</h2>
            <p>Inicia sesión y continúa tu experiencia.</p>
          </motion.div>
          <div className="auth-circles">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="auth-circle"
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                style={{ '--ci': i }}
              />
            ))}
          </div>
        </div>

        <div className="auth-right">
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Iniciar Sesión</h1>
            <p className="subtitle">¿No tienes cuenta? <span onClick={() => navigate('/register')}>Regístrate</span></p>

            <form onSubmit={handleSubmit}>
              {['email', 'password'].map((field, i) => (
                <motion.div key={field} className="field" custom={i} variants={fieldVariants} initial="hidden" animate="visible">
                  <label>{field === 'email' ? 'Correo electrónico' : 'Contraseña'}</label>
                  <input
                    type={field === 'password' ? 'password' : 'email'}
                    placeholder={field === 'email' ? 'tu@correo.com' : '••••••••'}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
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
                {loading ? <span className="spinner" /> : 'Entrar'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
