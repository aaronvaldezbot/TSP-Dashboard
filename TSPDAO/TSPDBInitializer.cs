using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace TSPDAO
{
    public class TSPDBInitializer : CreateDatabaseIfNotExists<TSPDBContext>
    {
        protected override void Seed(TSPDBContext context)
        {
            base.Seed(context);
        }
    }
}
