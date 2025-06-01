namespace Api.Seguridad;

public class IniciarSesionVm
{
    public string Correo { get; set; }
    public string Contraseña { get; set; }
    public bool MantenerSesion { get; set; }
}