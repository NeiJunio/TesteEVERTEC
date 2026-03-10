using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuração do CORS (Apenas uma política definida aqui)
builder.Services.AddCors(options =>
{
    options.AddPolicy("VitePolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Configuração do Banco de Dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

var app = builder.Build();

// CONFIGURAÇÃO DO PIPELINE (A ordem aqui é fundamental!)

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. Ativar o CORS (Deve vir ANTES do Authorization e dos Controllers)
app.UseCors("VitePolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();