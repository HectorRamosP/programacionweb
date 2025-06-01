// Api/Entidades/Comentario.cs
using Api.Comun.Interfaces;

namespace Api.Entidades
{
    public class Comentario : ISlug
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public bool Habilitado { get; set; }
        public string Slug { get; set; }

        // Clave foránea a Evento
        public int EventoId { get; set; }
        public virtual Evento Evento { get; set; }

        // Clave foránea a Usuario
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public string ObtenerDescripcionParaSlug()
        {
            return Descripcion.Length > 30 
                ? Descripcion.Substring(0, 30) 
                : Descripcion;
        }
    }
}
