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


    [HttpPost]
    [ProducesResponseType(typeof(PontoTuristicoResponseDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PontoTuristicoRegisterDTO>> Register([FromBody] PontoTuristicoRegisterDTO ponto)
    {

        var novoPonto = new PontoTuristico
        {
            Nome = ponto.Nome ?? string.Empty,
            Descricao = ponto.Descricao ?? string.Empty,
            Localizacao = ponto.Localizacao ?? string.Empty,
            Cidade = ponto.Cidade ?? string.Empty,
            Estado = ponto.Estado ?? string.Empty,
            Referencia = ponto.Referencia,
            DataInclusao = DateTime.UtcNow
        };

        _context.PontosTuristicos.Add(novoPonto);

        await _context.SaveChangesAsync();

        var response = new PontoTuristicoResponseDTO
        {
            Id = novoPonto.Id,
            Nome = novoPonto.Nome,
            Data = novoPonto.DataInclusao.ToString("dd/MM/yyyy HH:mm")
        };
        return CreatedAtAction(nameof(GetById), new { id = novoPonto.Id }, response);
    }


    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Update(int id, [FromBody] PontoTuristicoUpdateDTO ponto)
    {
        var pontoExistente = await _context.PontosTuristicos.FindAsync(id);

        if (pontoExistente is null)
        {
            return NotFound(new { mensagem = "Ponto turístico não encontrado!" });
        }

        if (ponto.Descricao.Length > 100)
        {
            return BadRequest(new { mensagem = "A descrição não pode ultrapassar 100 caracteres." });
        }

        pontoExistente.Nome = ponto.Nome ?? string.Empty;
        pontoExistente.Descricao = ponto.Descricao ?? string.Empty;
        pontoExistente.Localizacao = ponto.Localizacao ?? string.Empty;
        pontoExistente.Cidade = ponto.Cidade ?? string.Empty;
        pontoExistente.Estado = ponto.Estado ?? string.Empty;
        pontoExistente.Referencia = ponto.Referencia;

        await _context.SaveChangesAsync();

        return NoContent();

    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var pontoExistente = await _context.PontosTuristicos.FindAsync(id);

        if (pontoExistente is null)
        {
            return NotFound(new { mensagem = "Ponto turístico não encontrado!" });
        }

        _context.PontosTuristicos.Remove(pontoExistente);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
