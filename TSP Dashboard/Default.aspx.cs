﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TSP_Dashboard
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (var ctx = new TSPDAO.TSPDBContext())
            {
                var abc = ctx.Usuario.ToList();
            }
        }
    }
}