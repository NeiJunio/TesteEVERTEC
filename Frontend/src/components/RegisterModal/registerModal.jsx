import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe, X, AlignLeft, MapPin } from 'lucide-react';
import styles from './registerModal.module.css';
import { usePontoTuristico } from '../../hooks/usePontoTuristico';
import PontoTuristicoForm from '../form/pontoTuristicoForm';


export default function RegisterModal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    
    // Pegamos as ações do hook
    const { ponto, getPontoById, loading, savePonto, updatePonto } = usePontoTuristico();

    useEffect(() => {
        if (isEditing) getPontoById(id);
    }, [id, isEditing, getPontoById]);

    const handleSave = async (data) => {
        // Chamada via Hook
        const result = isEditing 
            ? await updatePonto(id, data) 
            : await savePonto(data);

        if (result.success) {
            navigate('/', { replace: true });
            // Idealmente aqui você dispararia um refresh na lista da Home
            window.location.reload(); 
        } else {
            alert(`Erro: ${result.error}`);
        }
    };

    if (isEditing && loading) return <div className={styles.overlay}>Carregando...</div>;

    return (
        <div className={styles.overlay} onClick={() => navigate('/')}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <PontoTuristicoForm 
                    initialData={isEditing ? ponto : null}
                    isEditing={isEditing}
                    onSubmit={handleSave}
                    onCancel={() => navigate('/')}
                />
            </div>
        </div>
    );
}