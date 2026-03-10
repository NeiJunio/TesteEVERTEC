namespace PontosTuristicos.Domain.DTOs;
public class PontoTuristicoDetailsDTO
{
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public string Localizacao { get; set; } = null!;
    public string? Referencia { get; set; }
    public string Cidade { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public DateTime DataInclusao { get; set; }
}
