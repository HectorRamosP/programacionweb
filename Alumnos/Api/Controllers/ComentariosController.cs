using Api.Comun.Interfaces;
using Api.Comun.Modelos.Comentarios;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Comun.Utilidades;

namespace Api.Controllers;

[Route("comentarios")]
[ApiController]
public class ComentariosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public ComentariosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    // GET /comentarios?descripcion=&habilitado=true
    [HttpGet]
    public async Task<List<BuscarComentariosDto>> ObtenerComentarios(string? descripcion, bool? habilitado)
    {
        var query = _contexto.Comentarios.AsQueryable();

        if (!string.IsNullOrEmpty(descripcion))
        {
            query = query.Where(x => x.Descripcion.Contains(descripcion));
        }

        if (habilitado.HasValue)
        {
            query = query.Where(x => x.Habilitado == habilitado.Value);
        }

        var lista = await query.ToListAsync();
        return lista.ConvertAll(x => x.ConvertirDto());
    }

    // GET /comentarios/{slug}
    [HttpGet("{slug}")]
    public async Task<BuscarComentariosDto> ObtenerComentarioPorSlug(string slug, CancellationToken cancelacionToken)
    {
        var comentario = await _contexto.Comentarios.FirstOrDefaultAsync(x => x.Slug == slug, cancelacionToken);

        if (comentario == null)
            return new BuscarComentariosDto();

        return comentario.ConvertirDto();
    }

    // POST /comentarios
    [HttpPost]
    public async Task<string> CrearComentario([FromBody] CrearComentarioDto dto, CancellationToken cancelacionToken)
    {
        var nuevoComentario = new Comentario
        {
            Descripcion = dto.Descripcion,
            Habilitado = dto.Habilitado,
        };

        await _contexto.Comentarios.AddAsync(nuevoComentario, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return nuevoComentario.Slug;
    }

    // PUT /comentarios/{slug}
    [HttpPut("{slug}")]
    public async Task<BuscarComentariosDto> ModificarComentario([FromBody] ModificarComentarioDto dto,
        CancellationToken cancelacionToken)
    {
        var comentario = await _contexto.Comentarios
            .FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (comentario == null)
            return new BuscarComentariosDto();

        comentario.Descripcion = dto.Descripcion;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return comentario.ConvertirDto();
    }

    // PATCH /comentarios/{slug}
    [HttpPatch("{slug}")]
    public async Task<bool> CambiarHabilitado([FromBody] HabilitadoComentarioDto dto,
        CancellationToken cancelacionToken)
    {
        var comentario = await _contexto.Comentarios.FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (comentario == null)
            return false;

        comentario.Habilitado = dto.Habilitado;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }
}
