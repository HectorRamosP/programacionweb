using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Eventos;
public class ModificarEventoDto
{
    [Required] 
    public string Slug { get; set; }

    public string Nombre { get; set; }

    public string Ubicacion { get; set; }

    public DateTime Fecha { get; set; }

    public string Categoria { get; set; }

    public string Descripcion { get; set; }

    public string UrlImagen { get; set; } 
}
