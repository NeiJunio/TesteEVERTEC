import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, PlusCircle, List, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path ? styles.active : '';

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <Map size={28} />
          <span>Turismo<span>Explorer</span></span>
        </Link>

        <button className={styles.menuIcon} onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={`${styles.link} ${isActive('/')}`} onClick={closeMenu}>
            <List size={20} />
            <span>Listagem</span>
          </Link>
          <Link 
            to="/register" 
            className={`${styles.link} ${location.pathname.includes('/register') ? styles.active : ''}`} 
            onClick={closeMenu}
          >
            <PlusCircle size={20} />
            <span>Cadastrar</span>
          </Link>
        </nav>
      </div>

      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </header>
  );
}