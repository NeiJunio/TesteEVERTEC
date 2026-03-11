// src/pages/RegisterPage.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePontoTuristico } from '../hooks/usePontoTuristico';
import PontoTuristicoForm from '../components/form/pontoTuristicoForm';
import Swal from 'sweetalert2';
import styles from './registerPage.module.css';

export default function RegisterPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    
    const { ponto, fetchPontoById, loading, savePonto, editPonto } = usePontoTuristico();

    useEffect(() => {
        if (isEditing) fetchPontoById(id);
    }, [id, isEditing, fetchPontoById]);

    const handleSave = async (data) => {
        const confirmacao = await Swal.fire({
            title: isEditing ? 'Confirmar alteração?' : 'Confirmar registro?',
            text: "Deseja salvar as informações no sistema?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sim, salvar',
            cancelButtonText: 'Revisar',
            reverseButtons: true
        });

        if (!confirmacao.isConfirmed) return;

        const result = isEditing ? await editPonto(id, data) : await savePonto(data);

        if (result.success) {
            await Swal.fire({
                title: 'Sucesso!',
                text: 'Dados gravados com sucesso.',
                icon: 'success',
                confirmButtonColor: '#10b981'
            });
            navigate('/'); // Volta para a listagem
        } else {
            Swal.fire('Erro!', result.error, 'error');
        }
    };

    if (isEditing && loading) return <div className={styles.loader}>Carregando dados...</div>;

    return (
        <main className={styles.pageContainer}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <h2>{isEditing ? `Editando: ${ponto?.nome}` : 'Novo Ponto Turístico'}</h2>
                    <p>Preencha os campos abaixo para {isEditing ? 'atualizar' : 'cadastrar'} o local.</p>
                </header>
                
                <PontoTuristicoForm 
                    initialData={isEditing ? ponto : null}
                    isEditing={isEditing}
                    onSubmit={handleSave}
                    onCancel={() => navigate('/')}
                />
            </div>
        </main>
    );
}