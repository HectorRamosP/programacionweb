using Api.Comun.Interfaces;
using Api.Comun.Modelos.Eventos;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Comun.Utilidades;

namespace Api.Controllers;

[Route("eventos")]
[ApiController]
public class EventosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public EventosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    // GET /eventos?nombre=&ubicacion=&habilitado=true
    [HttpGet]
    public async Task<List<BuscarEventosDto>> ObtenerEventos(
        string? nombre,
        string? ubicacion,
        bool? habilitado)
    {
        var query = _contexto.Eventos.AsQueryable();

        if (!string.IsNullOrEmpty(nombre))
        {
            query = query.Where(x => x.Nombre.Contains(nombre));
        }

        if (!string.IsNullOrEmpty(ubicacion))
        {
            query = query.Where(x => x.Ubicacion.Contains(ubicacion));
        }

        if (habilitado.HasValue)
        {
            query = query.Where(x => x.Habilitado == habilitado.Value);
        }

        var lista = await query.ToListAsync();
        return lista.ConvertAll(x => x.ConvertirDto());
    }

    // GET /eventos/{slug}
    [HttpGet("{slug}")]
    public async Task<BuscarEventosDto> ObtenerEventoPorSlug(string slug, CancellationToken cancelacionToken)
    {
        var evento = await _contexto.Eventos.FirstOrDefaultAsync(x => x.Slug == slug, cancelacionToken);

        if (evento == null)
            return new BuscarEventosDto();

        return evento.ConvertirDto();
    }

    // POST /eventos
    [HttpPost]
    public async Task<string> CrearEvento([FromBody] CrearEventoDto dto, CancellationToken cancelacionToken)
    {
        var nuevoEvento = new Evento
        {
            Nombre = dto.Nombre,
            Ubicacion = dto.Ubicacion,
            Fecha = dto.Fecha,
            Categoria = dto.Categoria,
            Descripcion = dto.Descripcion,
            Habilitado = dto.Habilitado,
            UrlImagen = dto.UrlImagen
        };

        await _contexto.Eventos.AddAsync(nuevoEvento, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return nuevoEvento.Slug;
    }

    // PUT /eventos/{slug}
    [HttpPut("{slug}")]
    public async Task<BuscarEventosDto> ModificarEvento([FromBody] ModificarEventoDto dto, CancellationToken cancelacionToken)
    {
        var evento = await _contexto.Eventos.FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (evento == null)
            return new BuscarEventosDto();

        evento.Nombre = dto.Nombre;
        evento.Ubicacion = dto.Ubicacion;
        evento.Fecha = dto.Fecha;
        evento.Categoria = dto.Categoria;
        evento.Descripcion = dto.Descripcion;
        evento.UrlImagen = dto.UrlImagen;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return evento.ConvertirDto();
    }

    // PATCH /eventos/{slug}
    [HttpPatch("{slug}")]
    public async Task<bool> CambiarHabilitado([FromBody] HabilitadoEventoDto dto, CancellationToken cancelacionToken)
    {
        var evento = await _contexto.Eventos.FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (evento == null)
            return false;

        evento.Habilitado = dto.Habilitado;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }
}
