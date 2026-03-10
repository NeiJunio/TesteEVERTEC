import { useState, useCallback } from "react";
import api from "../services/api";

export const usePontosTuristicos = () => {
    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [error, setError] = useState(null);

    const fetchPontosTuristicos = useCallback(async (termo = '', pagina = 1, itensPorPagina = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/PontosTuristicos", {
                params: { termo, pagina, itensPorPagina }
            });
            // 1. Pegamos a lista que está dentro de 'item'
            setPontosTuristicos(response.data.item || []);

            // 2. Ajustamos a paginação com base nos nomes que vêm da sua API
            // Sua API manda 'total' e 'paginaAtual'
            const totalItens = response.data.total;
            setTotalPages(Math.ceil(totalItens / itensPorPagina));
            setPage(response.data.paginaAtual);

        } catch (err) {
            setError("Erro ao carregar pontos turísticos", err);
        } finally {
            setLoading(false);
        }

    }, []);

    return {
        pontosTuristicos,
        loading,
        page,
        totalPages,
        error,
        fetchPontosTuristicos,
    };
}