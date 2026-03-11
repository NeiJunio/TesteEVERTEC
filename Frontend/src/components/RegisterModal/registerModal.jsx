import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePontoTuristico } from '../../hooks/usePontoTuristico';
import PontoTuristicoForm from '../form/pontoTuristicoForm';
import Swal from 'sweetalert2';
import styles from './registerModal.module.css';

export default function RegisterModal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    
    const { ponto, fetchPontoById, loading, savePonto, editPonto } = usePontoTuristico();

    useEffect(() => {
        if (isEditing) fetchPontoById(id);
    }, [id, isEditing, fetchPontoById]);

    // Lógica para Salvar
    const handleSave = async (data) => {
        const confirmacao = await Swal.fire({
            title: isEditing ? 'Confirmar alteração?' : 'Confirmar registro?',
            text: isEditing 
                ? "Deseja salvar as alterações feitas neste ponto turístico?" 
                : "Deseja cadastrar este novo ponto turístico no sistema?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981', // Verde
            cancelButtonColor: '#64748b',  // Cinza (para não confundir com o Cancelar crítico)
            confirmButtonText: 'Sim, confirmar!',
            cancelButtonText: 'Revisar dados',
            reverseButtons: true
        });

        if (!confirmacao.isConfirmed) return;

        const result = isEditing 
            ? await editPonto(id, data) 
            : await savePonto(data);

        if (result.success) {
            Swal.fire({
                title: isEditing ? 'Atualizado!' : 'Registrado!',
                text: 'As informações foram salvas com sucesso.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/', { replace: true });
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: result.error || 'Ocorreu um erro ao salvar.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Tentar novamente'
            });
        }
    };

    const handleCancel = async () => {
        const confirmacao = await Swal.fire({
            title: 'Deseja cancelar?',
            text: "Todas as informações preenchidas serão perdidas. Tem certeza?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', 
            cancelButtonColor: '#64748b',  
            confirmButtonText: 'Sim, sair e perder dados',
            cancelButtonText: 'Continuar editando',
            reverseButtons: true
        });

        if (confirmacao.isConfirmed) {
            navigate('/');
        }
    };

    if (isEditing && loading) {
        return (
            <div className={styles.overlay}>
                <div className={styles.loaderArea}>Carregando...</div>
            </div>
        );
    }

    return (
        <div className={styles.overlay} onClick={handleCancel}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <PontoTuristicoForm 
                    initialData={isEditing ? ponto : null}
                    isEditing={isEditing}
                    onSubmit={handleSave}
                    onCancel={handleCancel} 
                />
            </div>
        </div>
    );
}