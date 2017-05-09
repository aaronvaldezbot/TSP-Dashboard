using System.Collections.Generic;

namespace TSP_Dashboard.ClasesWBS
{
	public class ElementosWBS
	{
		public int iIdProceso { get; set; }
		public string cTituloProceso { get; set; }
		public List<HijosWBS> Hijos { get; set; }
	}
}