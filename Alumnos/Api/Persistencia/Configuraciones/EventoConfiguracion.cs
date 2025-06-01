using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class EventoConfiguracion : IEntityTypeConfiguration<Evento>
{
    public void Configure(EntityTypeBuilder<Evento> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Nombre)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.Ubicacion)
            .IsRequired()
            .HasMaxLength(300);

        builder.Property(e => e.Categoria)
            .HasMaxLength(100);

        builder.Property(e => e.Slug)
            .IsRequired();

        builder.HasMany(e => e.Comentarios)
            .WithOne(c => c.Evento)
            .HasForeignKey(c => c.EventoId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
