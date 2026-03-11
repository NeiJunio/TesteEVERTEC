import { useState, useCallback } from "react";
import { getAllPontos } from "../services/pontoTuristico.service";

export const usePontosTuristicos = () => {
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Adicione os estados de paginação de volta
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPontosTuristicos = useCallback(async (termo = '', pagina = 1, itensPorPagina = 6) => {
        setLoading(true);
        try {
            const data = await getAllPontos(termo, pagina, itensPorPagina);
            
            // Atualiza a lista de itens
            setPontosTuristicos(data.item || []);
            
            // ATUALIZAÇÃO DA PAGINAÇÃO:
            // O Service retorna data.total e data.paginaAtual
            const totalItens = data.total || 0;
            setTotalPages(Math.ceil(totalItens / itensPorPagina));
            setPage(data.paginaAtual || pagina);

        } catch (err) {
            console.error("Erro ao buscar pontos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { 
        pontosTuristicos, 
        loading, 
        page,           // Exporte o estado atualizado
        totalPages,     // Exporte o estado atualizado
        fetchPontosTuristicos 
    };
};