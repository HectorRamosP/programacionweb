using Api.Comun.Interfaces;

public class BCryptHasherServicio : IHasherServicio
{
    public string GenerarHash(string valor)
    {
        return BCrypt.Net.BCrypt.HashPassword(valor);
    }

    public bool VerificarHash(string valor, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(valor, hash);
    }
}

