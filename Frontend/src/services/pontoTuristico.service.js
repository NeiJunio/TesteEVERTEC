import api from "./api";

// Buscar listagem com filtros e paginação
export async function getAllPontos(termo = '', pagina = 1, itensPorPagina = 6) {
    const response = await api.get("/PontosTuristicos", {
        params: { termo, pagina, itensPorPagina }
    });
    return response.data;
}

// Buscar um único ponto por ID
export async function getPontoById(id) {
    const response = await api.get(`/PontosTuristicos/${id}`);
    return response.data;
}

// Criar novo registro
export async function createPonto(data) {
    const response = await api.post('/PontosTuristicos', data);
    return response.data;
}

// Atualizar registro existente
export async function updatePonto(id, data) {
    const response = await api.put(`/PontosTuristicos/${id}`, data);
    return response.data;
}

// Deletar registro
export async function deletePonto(id) {
    const response = await api.delete(`/PontosTuristicos/${id}`);
    return response.data;
}