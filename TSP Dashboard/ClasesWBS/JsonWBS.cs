using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TSP_Dashboard.ClasesWBS
{
	public class JsonWBS
	{
		public int iIdPlan { get; set; }
		public int iIdRequerimiento { get; set; }
		public string Modo { get; set; }
		public List<ElementosWBS> elementos { get; set; }
		public List<ElementosHijosWBS> Raiz { get; set; }

	}
}