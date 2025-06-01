// Api/Comun/Modelos/Comentarios/BuscarComentariosDto.cs
namespace Api.Comun.Modelos.Comentarios
{
    public class BuscarComentariosDto
    {
        public string Slug { get; set; }
        public string Descripcion { get; set; }
        public bool Habilitado { get; set; }

        // Opcional: incluir IDs para saber qué evento y qué usuario
        public int EventoId { get; set; }
        public int UsuarioId { get; set; }
    }
}
