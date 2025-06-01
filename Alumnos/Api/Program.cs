using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Persistencia;
using Api.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Obtener ajustes de identidad desde configuración
var identidadAjustes = builder.Configuration.GetSection("IdentidadAjustes").Get<IdentidadAjuste>();
builder.Services.AddSingleton(identidadAjustes);

// Controladores
builder.Services.AddControllers();

// Base de datos
builder.Services.AddDbContext<AplicacionBdContexto>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConexion")));
builder.Services.AddScoped<IAplicacionBdContexto, AplicacionBdContexto>();

// Servicios personalizados
builder.Services.AddTransient<IHasherServicio, BCryptHasherServicio>();
builder.Services.AddTransient<ITokenIdentidadServicio, JwtTokenServicio>();
builder.Services.AddScoped<IUsuariosSesionServicio, UsuarioSesionServicio>(); // ✅ Registro del servicio que faltaba

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Inserte el token {Bearer JWT_TOKEN} en el encabezado.",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// JWT Authentication
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(opt =>
{
    opt.SaveToken = true;
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(identidadAjustes.Secreto)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        RequireExpirationTime = false,
        ClockSkew = TimeSpan.Zero,
    };
    opt.Events = new JwtBearerEvents
    {
        OnTokenValidated = async (contexto) =>
        {
            var tokenIdentidadServicio = contexto.HttpContext.RequestServices
                .GetRequiredService<ITokenIdentidadServicio>();

            var tokenJwt = contexto.SecurityToken as JwtSecurityToken;
            var reclamos = tokenIdentidadServicio.ObtenerReclamos(tokenJwt.Claims);

            var tokenValido = await tokenIdentidadServicio.ValidarAsync(reclamos);
            if (!tokenValido)
            {
                contexto.Fail("Token expirado/inválido.");
            }
        }
    };
});

var app = builder.Build();

// Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("PermitirReact");

// Middleware para solicitudes preflight (OPTIONS)
app.Use(async (context, next) =>
{
    if (context.Request.Method == HttpMethods.Options)
    {
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
        return;
    }

    await next();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
