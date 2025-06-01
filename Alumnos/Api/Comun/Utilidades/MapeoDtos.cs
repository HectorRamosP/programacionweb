using Api.Comun.Modelos.Usuarios;
using Api.Comun.Modelos.Eventos;
using Api.Comun.Modelos.Comentarios;
using Api.Entidades;

namespace Api.Comun.Utilidades;

public static class MapeoDtos
{
    public static BuscarUsuariosDto ConvertirDto(this Usuario usuario)
    {
        return new BuscarUsuariosDto()
        {
             Slug = usuario.Slug,
        Nombre = usuario.Nombre,
        correo = usuario.Correo,
        Contraseña = usuario.Contraseña,
        Habilitado = usuario.Habilitado,
        };
    }

  public static BuscarEventosDto ConvertirDto(this Evento evento)
{
    return new BuscarEventosDto()
    {
        Slug = evento.Slug,
        Nombre = evento.Nombre,
        Ubicacion = evento.Ubicacion,
        Fecha = evento.Fecha,
        Categoria = evento.Categoria,
        Descripcion = evento.Descripcion, 
        Habilitado = evento.Habilitado,
        UrlImagen = evento.UrlImagen 
    };
}


     public static BuscarComentariosDto ConvertirDto(this Comentario comentario)
        {
            return new BuscarComentariosDto()
            {
                Slug = comentario.Slug,
                Descripcion = comentario.Descripcion,
                Habilitado = comentario.Habilitado,
                EventoId = comentario.EventoId,
                UsuarioId = comentario.UsuarioId
            };
        }
}
