using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Dominio;

namespace TSPDAO
{
    public class TSPDBContext : DbContext
    {
        public TSPDBContext()
            : base ("TSPDBConnectionString")
        {

        }

        public DbSet<Usuario> Usuario { get; set; }
    }
}
