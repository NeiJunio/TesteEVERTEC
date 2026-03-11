import { useState, useCallback } from "react";
// Importamos as funções individuais do service
import * as pontoService from "../services/pontoTuristico.service";

export const usePontoTuristico = () => {
    const [ponto, setPonto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPontoById = useCallback(async (id) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await pontoService.getPontoById(id);
            setPonto(data);
        } catch (err) {
            setError(err.message || "Erro ao carregar detalhes");
        } finally {
            setLoading(false);
        }
    }, []);

    const savePonto = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await pontoService.createPonto(data);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const editPonto = async (id, data) => {
        setLoading(true);
        setError(null);
        try {
            await pontoService.updatePonto(id, data);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const removePonto = async (id) => {
        setLoading(true);
        try {
            await pontoService.deletePonto(id);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        ponto,
        loading,
        error,
        fetchPontoById,
        savePonto,
        editPonto,
        removePonto
    };
};