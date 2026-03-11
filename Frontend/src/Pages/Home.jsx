import { useState, useEffect, useRef } from 'react';
import { useLocation,Outlet } from 'react-router-dom';

import { usePontosTuristicos } from '../hooks/usePontosTuristicos';

import Pagination from '../components/ui/pagination/pagination';
import Card from '../components/card/card';
import Input from '../components/ui/input/input';

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

    // const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
        if (location.pathname === '/') {
            fetchPontosTuristicos(searchTerm, page);
        }

    }, [location.pathname, location.key, fetchPontosTuristicos]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchPontosTuristicos(searchTerm, 1); 
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchPontosTuristicos]);

    const handlePageChange = (newPage) => {
        fetchPontosTuristicos(searchTerm, newPage);
    };

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Pontos Turísticos</h1>

                <div className={styles.searchArea}>
                    <div className={styles.searchInputContainer}>
                        <Input
                            label="Pesquisar"
                            placeholder="Pesquise por nome, cidade ou estado..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.contentArea}>
                    {loading && pontosTuristicos.length === 0 ? (
                        <div className={styles.loaderArea}>Carregando...</div>
                    ) : (
                        <div className={styles.grid}>
                            {pontosTuristicos.map((ponto) => (
                                <Card 
                                    key={ponto.id} 
                                    ponto={ponto} 
                                    onDelete={() => fetchPontosTuristicos(searchTerm, page)} 
                                />
                            ))}
                        </div>
                    )}
                </div>

                {!loading && pontosTuristicos.length > 0 && (
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>

            <Outlet />
        </div>
    );
}