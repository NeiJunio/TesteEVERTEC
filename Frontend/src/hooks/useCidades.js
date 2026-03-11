// src/hooks/useCidades.js
import { useState, useCallback } from "react";
import { getCidadesByUF } from "../services/cidades.service";

export const useCidades = () => {
    const [cidades, setCidades] = useState([]);
    const [loadingCidades, setLoading] = useState(false);

    const fetchCidades = useCallback(async (uf) => {
        if (!uf) {
            setCidades([]);
            return;
        }
        setLoading(true);
        try {
            const data = await getCidadesByUF(uf);
            setCidades(data);
        } catch (err) {
            console.error("Erro ao carregar cidades:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { cidades, loadingCidades, fetchCidades };
};