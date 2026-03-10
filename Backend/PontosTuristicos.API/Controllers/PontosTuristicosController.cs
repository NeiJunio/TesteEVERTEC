using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Data;
using PontosTuristicos.Domain.DTOs;
using PontosTuristicos.Domain.Entities;

namespace PontosTuristicos.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PontosTuristicosController : ControllerBase
{
    private readonly AppDbContext _context;

    public PontosTuristicosController(AppDbContext appDbContext)
    {
        _context = appDbContext;

    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
       [FromQuery] string? termo,
       [FromQuery] int pagina = 1,
       [FromQuery] int itensPorPagina = 10)
    {
        var query = _context.PontosTuristicos.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(termo))
        {
            termo = termo.ToLower();

            query = query.Where(p =>
            p.Nome.Contains(termo) ||
            p.Descricao.Contains(termo) ||
            p.Localizacao.Contains(termo) ||
            (p.Referencia ?? "").Contains(termo) ||
            p.Cidade.Contains(termo) ||
            p.Estado.Contains(termo)
            );
        }

        var totalItems = await query.CountAsync();

        query = query.OrderByDescending(p => p.DataInclusao);

        var itens = await query
            .Skip((pagina - 1) * itensPorPagina)
            .Take(itensPorPagina)
             .Select(p => new
             {
                 p.Id,
                 p.Nome,
                 p.Descricao,
                 p.Localizacao,
                 p.Cidade,
                 p.Estado,
                 Referencia = p.Referencia ?? "",
                 p.DataInclusao
             })
            .ToListAsync();

        return Ok(new
        {
            Total = totalItems,
            PaginaAtual = pagina,
            Item = itens
        });
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PontoTuristicoDetailsDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PontoTuristicoDetailsDTO>> GetById(int id)
    {
        var ponto = await _context.PontosTuristicos
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new PontoTuristicoDetailsDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Localizacao = p.Localizacao,
                Cidade = p.Cidade,
                Estado = p.Estado,
                Referencia = p.Referencia ?? "",
                DataInclusao = p.DataInclusao
            })
            .FirstOrDefaultAsync();

        if (ponto is null)
        {
            return NotFound(new { mensagem = "Ponto turístico não encontrado." });
        }

        return Ok(ponto);
    }
}
