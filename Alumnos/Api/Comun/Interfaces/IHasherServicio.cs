namespace Api.Comun.Interfaces;

public interface IHasherServicio
{
    string GenerarHash(string contraseña);
     bool VerificarHash(string valor, string hash); 
}