// Api/Persistencia/Configuraciones/ComentarioConfiguracion.cs
using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones
{
    public class ComentarioConfiguracion : IEntityTypeConfiguration<Comentario>
    {
        public void Configure(EntityTypeBuilder<Comentario> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Descripcion)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(c => c.Slug)
                .IsRequired();

            // Relación con Evento (EventoId debe existir)
            builder.HasOne(c => c.Evento)
                .WithMany(e => e.Comentarios)
                .HasForeignKey(c => c.EventoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Relación con Usuario (UsuarioId debe existir)
            builder.HasOne(c => c.Usuario)
                .WithMany() // Asumimos que Usuario no tiene navegación de Comentarios
                .HasForeignKey(c => c.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
