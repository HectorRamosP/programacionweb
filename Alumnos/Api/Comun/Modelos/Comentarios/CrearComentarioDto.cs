using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Comentarios;

public class CrearComentarioDto
{
    [Required] 
    public string Descripcion { get; set; }

    [Required]
    public bool Habilitado { get; set; }

    [Required]
    public int EventoId { get; set; }

    [Required]
    public int UsuarioId { get; set; }
}
