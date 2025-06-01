using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Eventos;

public class CrearEventoDto
{
    [Required] 
    public string Nombre { get; set; }

    [Required]
    public string Ubicacion { get; set; }

    [Required]
    public DateTime Fecha { get; set; }

    [Required]
    public string Categoria { get; set; }

    [Required]
    public bool Habilitado { get; set; }

    [Required]
    public string Descripcion { get; set; } 

    public string UrlImagen { get; set; }
}
