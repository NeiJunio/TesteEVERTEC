import { useState, useEffect, useRef } from 'react';
import { usePontosTuristicos } from '../hooks/usePontosTuristicos';
import Input from '../components/ui/input/input';
import { Card } from '../components/card/card';
import { Pagination } from '../components/ui/pagination/pagination';
import { PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Home.module.css';

export default function Home() {
    const {
        pontosTuristicos,
        loading,
        page,
        totalPages,
        fetchPontosTuristicos,
    } = usePontosTuristicos();

    const [searchTerm, setSearchTerm] = useState("");
    const isMounted = useRef(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    // 1. Efeito de sincronização com a URL:
    // Sempre que voltamos para a raiz "/", atualizamos a lista.
    // Isso substitui a necessidade de dar reload na página inteira.
    useEffect(() => {
        if (location.pathname === '/') {
            // Se houver um searchTerm, mantemos o filtro ao atualizar
            fetchPontosTuristicos(searchTerm, page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]); 

    // 2. Efeito de Debounce para a Pesquisa:
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchPontosTuristicos(searchTerm, 1); // Ao pesquisar, volta para pág 1
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchPontosTuristicos]);

    const handlePageChange = (newPage) => {
        fetchPontosTuristicos(searchTerm, newPage);
    };

    const handleCreate = () => {
        // Importante: passamos o state background para o modal saber o que renderizar no fundo
        navigate('/register', { state: { background: location } });
    };

    return (
        <div className={styles['main-wrapper']}>
            <div className={styles.container}>
                <h1 className={styles.title}>Pontos Turísticos</h1>

                <div className={styles['search-area']}>
                    <div className={styles['search-input-container']}>
                        <Input
                            label="Pesquisar"
                            placeholder="Pesquise por nome, cidade ou estado..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className={styles['add-button']} onClick={handleCreate}>
                        <PlusCircle size={20} />
                        <span>Adicionar Novo</span>
                    </button>
                </div>

                <div className={styles['content-area']}>
                    {/* Feedback visual de loading pode entrar aqui */}
                    {loading && pontosTuristicos.length === 0 ? (
                         <div className={styles.loaderArea}>Carregando...</div>
                    ) : (
                        <div className={styles.grid}>
                            {pontosTuristicos.map((ponto) => (
                                <Card key={ponto.id} ponto={ponto} />
                            ))}
                        </div>
                    )}
                </div>

                {!loading && pontosTuristicos.length > 0 && (
                    <div className={styles['pagination-wrapper']}>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}