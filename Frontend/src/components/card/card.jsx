// import { MapPin, Trash2, Pencil, Info } from 'lucide-react';
// import styles from './Card.module.css'; // Usando CSS Modules conforme conversamos

// export const Card = ({ ponto, onEdit, onDelete }) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <h3 className={styles.title}>{ponto.nome}</h3>
//         <span className={styles.badge}>{ponto.estado}</span>
//       </div>

//       <div className={styles.content}>
//         <p className={styles.description}>
//           <Info size={16} className={styles.infoIcon} />
//           {ponto.descricao}
//         </p>
//       </div>

//       <div className={styles.footer}>
//         <div className={styles.location}>
//           <MapPin size={16} />
//           <span>{ponto.cidade}</span>
//         </div>

//         <div className={styles.actions}>
//           <button 
//             className={styles.editBtn} 
//             onClick={() => onEdit(ponto)} 
//             title="Editar"
//           >
//             <Pencil size={18} />
//           </button>
//           <button 
//             className={styles.deleteBtn} 
//             onClick={() => onDelete(ponto.id)} 
//             title="Excluir"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { MapPin, Trash2, Pencil, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { useNavigate, useLocation } from 'react-router-dom';


export const Card = ({ ponto, onEdit, onDelete, onViewDetails }) => {
    // ... dentro do seu componente Card
    const navigate = useNavigate();
    const location = useLocation();

    const handleViewDetails = () => {
        // Navegamos para a rota, mas avisamos: "Guarde a minha posição atual como fundo"
        navigate(`/details/${ponto.id}`, { state: { background: location } });
    };

    return (
        <div className={styles.card} onClick={() => onViewDetails(ponto.id)}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <h3 className={styles.title}>{ponto.nome}</h3>
                    <div className={styles.locationSummary}>
                        <MapPin size={14} />
                        <span>{ponto.cidade} - {ponto.estado}</span>
                    </div>
                </div>
                <span className={styles.badge}>{ponto.estado}</span>
            </div>

            <div className={styles.content}>
                <p className={styles.description}>
                    {ponto.descricao}
                </p>
            </div>

            <div className={styles.footer}>
                <button className={styles.detailsLink} onClick={handleViewDetails}>
                    Ver detalhes 
                </button>

                <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                    <button
                        className={styles.editBtn}
                        onClick={() => onEdit(ponto)}
                        title="Editar"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(ponto.id)}
                        title="Excluir"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};