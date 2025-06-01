using FluentValidation;
namespace Api.Seguridad;

public class IniciarSesionVmValidador : AbstractValidator<IniciarSesionVm>
{
    public IniciarSesionVmValidador()
    {
        RuleFor(i => i.Correo)
            .NotEmpty();

        RuleFor(i => i.Contraseña)
            .NotEmpty();
    }
}