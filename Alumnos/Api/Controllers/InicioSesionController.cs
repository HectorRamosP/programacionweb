using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Seguridad;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class InicioSesionController : ControllerBase
{
    private readonly ITokenIdentidadServicio _tokenIdentidadServicio;
    private readonly IdentidadAjuste _identidadAjuste;
    private readonly IUsuariosSesionServicio _usuariosSesionServicio;
    
    public InicioSesionController(ITokenIdentidadServicio tokenIdentidadServicio,
        IUsuariosSesionServicio usuariosSesionServicio, IdentidadAjuste identidadAjuste)
    {
        _identidadAjuste = identidadAjuste;
        _tokenIdentidadServicio = tokenIdentidadServicio;
        _usuariosSesionServicio = usuariosSesionServicio;
    }

   [Route("/login")]
[HttpPost]
public async Task<IActionResult> Login([FromBody] IniciarSesionVm iniciarSesionVm,
    CancellationToken cancelacionToken)
{
    if (iniciarSesionVm == null)
    {
        return BadRequest("Los datos de inicio de sesión son requeridos.");
    }

    var validadorVm = new IniciarSesionVmValidador();
    var resultados = await validadorVm.ValidateAsync(iniciarSesionVm, cancelacionToken);

    if (!resultados.IsValid)
    {
        var errores = resultados.Errors.Select(e => e.ErrorMessage).ToList();
        return BadRequest(errores);
    }

    var nuevaSesion = await _usuariosSesionServicio.IniciarSesionAsync(iniciarSesionVm, cancelacionToken);

    if (nuevaSesion == null)
    {
        return Unauthorized("Correo o contraseña incorrectos.");
    }

    var token = _tokenIdentidadServicio.Generar(new ReclamosTokenIdentidad
    {
        EsPersistente = iniciarSesionVm.MantenerSesion,
        EstampaSeguridad = _identidadAjuste.EstampaSeguridad,
        FechaTicks = DateTime.Now.Ticks
    });

    Response.Headers.Add("Authorization", token);

    return NoContent();
}

}