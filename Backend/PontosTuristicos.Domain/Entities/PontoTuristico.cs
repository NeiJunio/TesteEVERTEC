using System.ComponentModel.DataAnnotations;

namespace PontosTuristicos.Domain.Entities;
public class PontoTuristico
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Campo Nome é obrigatório")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Descrição é obrigatório")]
    [StringLength(100)]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Localização é obrigatório")]
    public string Localizacao { get; set; } = string.Empty;

    public string? Referencia { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Cidade é obrigatório")]
    public string Cidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Estado é obrigatório")]
    [StringLength(2)]
    public string Estado { get; set; } = string.Empty;

    [Required]
    public DateTime DataInclusao { get; set; } = DateTime.Now;
}
