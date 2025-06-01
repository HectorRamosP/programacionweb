using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Evento : ISlug
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Ubicacion { get; set; }
    public DateTime Fecha { get; set; }
    public string Categoria { get; set; }
    public string Descripcion { get; set; }
    public bool Habilitado { get; set; }
    public string Slug { get; set; }
    public string UrlImagen { get; set; } 

    public virtual List<Comentario> Comentarios { get; set; }

    public string ObtenerDescripcionParaSlug()
    {
        return $"{Nombre}-{Fecha:yyyyMMdd}";
    }
}

