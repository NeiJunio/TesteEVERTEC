import axios from "axios";

// Buscar estados
export async function getAllEstados() {
    const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    return response.data;
}