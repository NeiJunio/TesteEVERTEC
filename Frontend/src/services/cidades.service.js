
import axios from "axios";

export async function getCidadesByUF(uf) {
    if (!uf) return [];
    // API do IBGE para municípios por UF
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`);
    return response.data;
}