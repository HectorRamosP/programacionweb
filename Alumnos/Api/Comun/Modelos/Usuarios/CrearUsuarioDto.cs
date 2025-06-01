using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Usuarios;

public class CrearUsuarioDto
{
    [Required] 
    public string Nombre { get; set; }
    [Required]
    public string Correo { get; set; }
    [Required]
    public string Contraseña { get; set; }
    [Required]
    public bool Habilitado { get; set; }
}