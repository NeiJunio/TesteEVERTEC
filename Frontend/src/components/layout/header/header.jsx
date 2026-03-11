// src/components/layout/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Map, PlusCircle, List } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Map size={24} />
          <span>TurismoExplorer</span>
        </Link>

        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
          >
            <List size={20} />
            <span>Listagem</span>
          </Link>
          <Link 
            to="/register" 
            className={`${styles.link} ${location.pathname.includes('/register') || location.pathname.includes('/edit') ? styles.active : ''}`}
          >
            <PlusCircle size={20} />
            <span>Cadastrar</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}