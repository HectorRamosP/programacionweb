using Api.Comun.Interfaces;
using Api.Comun.Modelos.Usuarios;
using Api.Comun.Utilidades;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

// [Authorize]
[ApiController]
[Route("usuarios")]
public class UsuariosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;
    private readonly IHasherServicio _hasherServicio;

    public UsuariosController(IAplicacionBdContexto contexto, IHasherServicio hasherServicio)
    {
        _contexto = contexto;
        _hasherServicio = hasherServicio;
    }

    [HttpGet]
    public async Task<List<BuscarUsuariosDto>> ObtenerUsuarios(string? nombre, bool habilitado)
    {
        var query = _contexto.Usuarios.Where(x => x.Habilitado == habilitado);

        if (!string.IsNullOrEmpty(nombre))
        {
            query = query.Where(x => x.Nombre.Contains(nombre));
        }

        var lista = await query.ToListAsync();

        return lista.ConvertAll(x => x.ConvertirDto());
    }

    [HttpGet("{slug}")]
    public async Task<BuscarUsuariosDto> ObtenerUsuario(string slug, CancellationToken cancelacionToken)
    {
        var usuario = await _contexto.Usuarios
            .FirstOrDefaultAsync(x => x.Slug == slug, cancelacionToken);

        return usuario == null ? new BuscarUsuariosDto() : usuario.ConvertirDto();
    }

    [HttpPost]
public async Task<IActionResult> RegistrarUsuario([FromBody] CrearUsuarioDto dto, CancellationToken cancelacionToken)
{
    try
    {
        var contraseñaEncriptada = _hasherServicio.GenerarHash(dto.Contraseña);

        var usuario = new Usuario
        {
            Nombre = dto.Nombre,
            Correo = dto.Correo,
            Contraseña = contraseñaEncriptada,
            Habilitado = dto.Habilitado
        };

        await _contexto.Usuarios.AddAsync(usuario, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return Ok(usuario.Slug);
    }
    catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("duplicate key") == true)
    {
        return BadRequest(new { message = "Ese correo ya está registrado. Intenta con otro." });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Ocurrió un error inesperado. Intenta más tarde." });
    }
}


    [HttpPut("{slug}")]
    public async Task<BuscarUsuariosDto> ModificarUsuario([FromBody] ModificarUsuarioDto dto, CancellationToken cancelacionToken)
    {
        var usuario = await _contexto.Usuarios
            .FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (usuario == null)
            return new BuscarUsuariosDto();

        usuario.Nombre = dto.Nombre;
        usuario.Habilitado = dto.Habilitado;

        if (!string.IsNullOrEmpty(dto.Contraseña))
        {
            usuario.Contraseña = _hasherServicio.GenerarHash(dto.Contraseña);
        }

        await _contexto.SaveChangesAsync(cancelacionToken);

        return usuario.ConvertirDto();
    }

    [HttpPatch("{slug}")]
    public async Task<bool> CambiarHabilitado([FromBody] HabilitadoUsuarioDto dto, CancellationToken cancelacionToken)
    {
        var usuario = await _contexto.Usuarios
            .FirstOrDefaultAsync(x => x.Slug == dto.Slug, cancelacionToken);

        if (usuario == null)
            return false;

        usuario.Habilitado = dto.Habilitado;

        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }
}