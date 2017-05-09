using System;

namespace TSP_Dashboard.ClasesWBS
{
	public class ElementosHijosWBS
	{
		public int iIdWBS { get; set; }
		public int iIdPlan { get; set; }
		public int iRequerimiento { get; set; }
		public int iIdProcesos { get; set; }
		public int iIdDetalleProceso { get; set; }
		public decimal cWork_Item_Type { get; set; }
		public int iTipoElemento { get; set; }
		public decimal dRemaining_Work { get; set; }
		public decimal dOriginal_Estimate { get; set; }
		public decimal dTiempo_Total_del_proceso { get; set; }
		public decimal dtamanios { get; set; }
		public decimal dRate { get; set; }
		public decimal dValor_ganado_acumulado { get; set; }
		public decimal dValor_ganado_semanal { get; set; }
		public string cTipo_de_tarea { get; set; }
		public string cUnidad_de_medida { get; set; }
		public DateTime dtFecha_de_inicio { get; set; }
		public DateTime dtFechaFinal { get; set; }
		public DateTime dtHoras_Acumuladas { get; set; }
		public DateTime dtAlta { get; set; }
		public DateTime dtModificacion { get; set; }
		public bool lActivo { get; set; }
		public int iIdTFS { get; set; }
		public Guid iIdUsuario { get; set; }
		public int iGrupo { get; set; }
		public bool lAplicaMultiProceso { get; set; }
		public string cTituloProceso { get; set; }
		public int? iRevision { get; set; }
		public DateTime? dtTimeStamp { get; set; }
		public int iOrdenDetalleProceso { get; set; }
		public int iOrdenProceso { get; set; }
		public int? iOrdenRequerimiento { get; set; }
		public int? iOrden { get; set; }
		public string cNombreDetalleProceso { get; set; }
	}
}