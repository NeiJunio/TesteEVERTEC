import { MapPin, Trash2, Pencil, Info } from 'lucide-react';
import styles from './Card.module.css'; // Usando CSS Modules conforme conversamos

export const Card = ({ ponto, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{ponto.nome}</h3>
        <span className={styles.badge}>{ponto.estado}</span>
      </div>
      
      <div className={styles.content}>
        <p className={styles.description}>
          <Info size={16} className={styles.infoIcon} />
          {ponto.descricao}
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.location}>
          <MapPin size={16} />
          <span>{ponto.cidade}</span>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.editBtn} 
            onClick={() => onEdit(ponto)} 
            title="Editar"
          >
            <Pencil size={18} />
          </button>
          <button 
            className={styles.deleteBtn} 
            onClick={() => onDelete(ponto.id)} 
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};