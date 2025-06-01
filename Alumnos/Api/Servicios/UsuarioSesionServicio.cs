using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Seguridad;
using Api.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Api.Servicios;

public class UsuarioSesionServicio : IUsuariosSesionServicio
{
    private readonly IAplicacionBdContexto _contexto;
    private readonly IHasherServicio _hasherServicio;

    public UsuarioSesionServicio(IAplicacionBdContexto contexto, IHasherServicio hasherServicio)
    {
        _contexto = contexto;
        _hasherServicio = hasherServicio;
    }

    public async Task<SesionUsuario?> IniciarSesionAsync(IniciarSesionVm inicioSesion, CancellationToken cancelacionToken)
    {
        var usuario = await _contexto.Usuarios
            .FirstOrDefaultAsync(x => x.Correo == inicioSesion.Correo, cancelacionToken);

        if (usuario == null)
            return null;

        // ✅ Verificamos que la contraseña ingresada coincida con la contraseña encriptada
        var esValida = _hasherServicio.VerificarHash(inicioSesion.Contraseña, usuario.Contraseña);
        if (!esValida)
            return null;

        var nuevaSesion = new SesionUsuario
        {
            EsPersistente = inicioSesion.MantenerSesion,
            FechaInicio = DateTime.UtcNow,
            UsuarioId = usuario.Id,
            UltimoUso = DateTime.UtcNow,
            Valido = true
        };


        return nuevaSesion;
    }
}
