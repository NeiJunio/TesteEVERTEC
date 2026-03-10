using System.ComponentModel.DataAnnotations;

namespace PontosTuristicos.Domain.DTOs;
public class PontoTuristicoRegisterDTO
{
    [Required(ErrorMessage = "Campo Nome é obrigatório")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Descrição é obrigatório")]
    [StringLength(100, ErrorMessage = "Descrição deve ter no máximo 100 caracteres")]
    public string Descricao { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Localização é obrigatório")]
    public string Localizacao { get; set; } = string.Empty;
    public string? Referencia { get; set; }

    [Required(ErrorMessage = "Campo Cidade é obrigatório")]
    public string Cidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "Campo Estado é obrigatório")]
    [StringLength(2, MinimumLength = 2, ErrorMessage = "Estado deve conter a UF com 2 caracteres")]
    public string Estado { get; set; } = string.Empty;
}
