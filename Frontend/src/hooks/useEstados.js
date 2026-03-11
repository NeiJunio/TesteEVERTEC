import { useState, useCallback } from "react";

import * as estadoService from "../services/estados.service";

export const useEstados = () => {
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEstados = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await estadoService.getAllEstados();
            setEstados(data);
            console.log("Estados carregados:", data); // Log para verificar os dados recebidos
        } catch (err) {
            setError(err.message || "Erro ao carregar estados");
        } finally {
            setLoading(false);
        }   
    }, []);

    return { estados, loading, error, fetchEstados };
}