using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Domain.Entities;

namespace PontosTuristicos.Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Esta propriedade vira a tabela "PontosTuristicos" no SQL Server
    public DbSet<PontoTuristico> PontosTuristicos { get; set; }
}
