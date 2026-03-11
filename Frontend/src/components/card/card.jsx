
import { MapPin, Trash2, Pencil, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { usePontoTuristico } from '../../hooks/usePontoTuristico';

import Swal from 'sweetalert2';

import styles from './Card.module.css';

export default function Card({ ponto, onDelete, onViewDetails }){
    // ... dentro do seu componente Card
    const navigate = useNavigate();
    const location = useLocation();

    const {removePonto} = usePontoTuristico();

    const handleViewDetails = () => {
        // Navegamos para a rota, mas avisamos: "Guarde a minha posição atual como fundo"
        navigate(`/details/${ponto.id}`, { state: { background: location } });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${ponto.id}`, { state: { background: location } });
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
    
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: `Você deseja excluir "${ponto.nome}"? Esta ação é irreversível.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981', 
            cancelButtonColor: '#ef4444',  
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });
    
        if (result.isConfirmed) {
            const deleteResult = await removePonto(ponto.id);
            
            if (deleteResult.success) {
                await Swal.fire({
                    title: 'Excluído!',
                    text: 'O registro foi removido com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#10b981',
                });
                
                if (onDelete) onDelete(); 
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: deleteResult.error || 'Não foi possível excluir.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
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
                        onClick={handleEdit}
                        title="Editar"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        title="Excluir"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};