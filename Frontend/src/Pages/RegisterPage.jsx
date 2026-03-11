// src/pages/RegisterPage.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePontoTuristico } from '../hooks/usePontoTuristico';
import PontoTuristicoForm from '../components/form/pontoTuristicoForm';
import { X } from 'lucide-react';
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

    const handleCancel = async () => {
        const confirmacao = await Swal.fire({
            title: 'Deseja cancelar?',
            text: "Todas as informações preenchidas serão perdidas. Tem certeza?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // Vermelho para ação destrutiva
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sim, sair e perder dados',
            cancelButtonText: 'Continuar editando',
            reverseButtons: true
        });

        if (confirmacao.isConfirmed) {
            navigate('/');
        }
    };

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
            navigate('/');
        } else {
            Swal.fire('Erro!', result.error, 'error');
        }
    };

    if (isEditing && loading) return <div className={styles.loader}>Carregando dados...</div>;

    return (
        <main className={styles.pageContainer}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <div className={styles.headerTitleRow}>
                        <h2>{isEditing ? `Editando: ${ponto?.nome}` : 'Novo Ponto Turístico'}</h2>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={styles.closeBtn}
                            aria-label="Fechar"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p>Preencha os campos abaixo para {isEditing ? 'atualizar' : 'cadastrar'} o local.</p>
                </header>

                <PontoTuristicoForm
                    initialData={isEditing ? ponto : null}
                    isEditing={isEditing}
                    onSubmit={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        </main>
    );
}