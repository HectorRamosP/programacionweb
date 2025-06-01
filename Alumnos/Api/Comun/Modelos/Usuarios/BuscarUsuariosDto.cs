namespace Api.Comun.Modelos.Usuarios;

public class BuscarUsuariosDto
{
    public string Slug { get; set; }
    public string Nombre { get; set; }
    public string correo { get; set; }
    public string Contraseña { get; set; }
    public bool Habilitado { get; set; }
}