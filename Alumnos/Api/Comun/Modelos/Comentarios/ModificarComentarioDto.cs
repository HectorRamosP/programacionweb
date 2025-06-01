using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Comentarios;

public class ModificarComentarioDto
{
    [Required] 
    public string Slug { get; set; }
    public string Descripcion { get; set; }
    public bool Habilitado { get; set; }
    
}