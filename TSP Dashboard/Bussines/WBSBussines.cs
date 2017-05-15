using System.Collections.Generic;
using System.Linq;
using TSP_Dashboard.Models;
using System.Data;
using System;
using TSP_Dashboard.DTO;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Data.Entity;

namespace TSP_Dashboard.Bussines
{
	class WBSBussines
	{

		TSP_DEVEntities con = new TSP_DEVEntities();

		public List<tblCat_Proceso> ObtenerTitle(int iIdDetalleProceso)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbTitle = (from tblCat_Proceso in con.tblCat_Proceso
						   where tblCat_Proceso.iIdProceso == iIdDetalleProceso
						   select tblCat_Proceso).ToList();


			this.con.Database.Connection.Close();
			return tbTitle;
		}

		/// <summary>
		/// Metodo que sirve para obtener los datos de la tabla tblCat_Etapas para utilizar posteriormente
		/// </summary>
		/// <returns>Un a lista de tipo tblCat_Etapas la cual contiene los datos obtenidos de la BD de esta tabla</returns>
		public List<tblCat_Proceso> ObtenerEtapas()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbEtapas = (from tblCat_Proceso in con.tblCat_Proceso
							where tblCat_Proceso.lVisualizarCombo
							select tblCat_Proceso).ToList();

			this.con.Database.Connection.Close();
			return tbEtapas;
		}

		/// <summary>
		/// Metodo que sirve para obtener los datos de la tabla tblCat_WBS para utilizar posteriormente
		/// </summary>
		/// <returns>Un a lista de tipo tblCat_WBS la cual contiene los datos obtenidos de la BD de esta tabla</returns>
		public List<int> ObtenerRequerimiento(int iIdPlan)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbRequerimiento = (from wbs in con.tblCat_WBS
								   where wbs.iIdPlan == iIdPlan
								   select wbs.iRequerimiento).Distinct().ToList();
			//tbRequerimiento.Distinct();
			this.con.Database.Connection.Close();
			return tbRequerimiento;
		}

		public List<tblCat_WBS> ObtenerWBS(int iRequerimiento, int iIdProceso, int iIdPlan)
		{
			var tbWBSRegistros = (from tblCat_WBS in con.tblCat_WBS
									  //join tblCat_Title in con.tblCat_Title on tblCat_WBS.iIdEtapa equals tblCat_Title.iIdEtapa
								  where tblCat_WBS.iIdProcesos == iIdProceso &&
								  tblCat_WBS.iRequerimiento == iRequerimiento &&
								  tblCat_WBS.iIdPlan == iIdPlan
								  select tblCat_WBS).OrderBy(q => q.iOrdenProceso).ThenBy(x => x.iOrdenDetalleProceso).ToList();
			return tbWBSRegistros;
		}

		/// <summary>
		/// Metodo que hace la insercion a la bd
		/// </summary>
		/// <param name="wbs">Es un objeto del tipo tblCat_WBS que esta en el modelado de la bd</param>
		public void InsertarWBS(tblCat_WBS wbs)
		{
			try
			{
				this.con.Database.Connection.Open();
				this.con.Configuration.LazyLoadingEnabled = true;

				//var prueba = con.tblCat_WBS.Add(wbs);
				//var prueba2 = con.SaveChanges();
				con.tblCat_WBS.Add(wbs);
				con.SaveChanges();
				this.con.Database.Connection.Close();
			}
			catch (Exception ex)
			{
				throw ex;
			}

		}

		public void UpdateWBS(tblCat_WBS wbs, int req, int proceso, int? plan)
		{
			try
			{
				this.con.Database.Connection.Open();
				this.con.Configuration.LazyLoadingEnabled = true;
				var registro = (from WBS in con.tblCat_WBS
								where WBS.iIdPlan == wbs.iIdPlan &&
								WBS.iRequerimiento == wbs.iRequerimiento &&
								WBS.iIdProcesos == wbs.iIdProcesos &&
								WBS.iIdWBS == wbs.iIdWBS
								select WBS).FirstOrDefault();

				registro.iIdUsuario = wbs.iIdUsuario;
				registro.iIdProcesos = wbs.iIdProcesos;
				registro.iRequerimiento = wbs.iRequerimiento;
				registro.cWork_Item_Type = wbs.cWork_Item_Type;
				registro.iIdDetalleProceso = wbs.iIdDetalleProceso;
				registro.dRemaining_Work = wbs.dRemaining_Work;
				registro.dOriginal_Estimate = wbs.dOriginal_Estimate;
				registro.dTiempo_Total_del_proceso = wbs.dTiempo_Total_del_proceso;
				registro.dPorcentaje_de_tareas = wbs.dPorcentaje_de_tareas;
				registro.dtamanios = wbs.dtamanios;
				registro.dRate = wbs.dRate;
				registro.dValor_ganado = wbs.dValor_ganado;
				registro.isemana = wbs.isemana;
				registro.dValor_ganado_acumulado = wbs.dValor_ganado_acumulado;
				registro.dValor_ganado_semanal = wbs.dValor_ganado_semanal;
				registro.iIdTipoTarea = wbs.iIdTipoTarea;
				registro.cUnidad_de_medida = wbs.cUnidad_de_medida;
				registro.dtFecha_de_inicio = wbs.dtFecha_de_inicio;
				registro.dtFechaFinal = wbs.dtFechaFinal;
				registro.dtModificacion = wbs.dtModificacion;
				registro.dtHoras_Acumuladas = wbs.dtHoras_Acumuladas;
				//registro.dtAlta = wbs.dtAlta;
				registro.lActivo = wbs.lActivo;
				registro.iIdPlan = wbs.iIdPlan;
				//registro.lTFS = wbs.lTFS;
				registro.iIdTFS = wbs.iIdTFS;
				//registro.iIdWBS = wbs.iIdWBS;
				registro.cTituloProceso = wbs.cTituloProceso;
				registro.iOrdenDetalleProceso = wbs.iOrdenDetalleProceso;
				registro.iOrdenProceso = wbs.iOrdenProceso;

				con.SaveChanges();
				this.con.Database.Connection.Close();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		/// <summary>
		/// Metodo que hace la consulta a la bd para obtener los nombres de los sistemas de la tabla tblCat_Sistema
		/// </summary>
		/// <returns>Una lista de string la cual contiene los nombres de los sistemas</returns>
		public List<string> ObtenerNombreSistema()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbNombreSistema = (from tblCat_Sistema in con.tblCat_Sistema
								   select tblCat_Sistema.cNombreSistema).ToList();
			//tbNombreSistema.Distinct();
			this.con.Database.Connection.Close();
			return tbNombreSistema;
		}

		/// <summary>
		/// Metodo que hace la consullta a la BD para obtener los ID de los sistemas en la tabla tblCat_Sistema
		/// </summary>
		/// <returns>Una lista de enteros la cual contiene los ID de los sistemas.</returns>
		public List<int> ObtenerIdSistema()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbIdSistema = (from tblCat_Sistema in con.tblCat_Sistema
							   select tblCat_Sistema.iIdSistema).ToList();
			//tbIdSistema.Distinct();
			this.con.Database.Connection.Close();
			return tbIdSistema;
		}

		/// <summary>
		/// Metodo que hace la consulta a BD para obtener los nombres de los modulos de la tabla tblCat_Modulo
		/// </summary>
		/// <param name="_IdSistema">Este parametro nos sirve para saber de que sistema vamos a consultar sus modulos</param>
		/// <returns>Una lista de enteros la cual contiene los Id de los modulos correspodientes al sistema</returns>
		public List<string> ObteneNombreModulo(int IdSistema)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbNombreModulo = (from tblCat_Modulo in con.tblCat_Modulo
								  where tblCat_Modulo.iIdSistema == IdSistema
								  select tblCat_Modulo.cNombreModulo).ToList();
			//tbModulo.Distinct();
			this.con.Database.Connection.Close();
			return tbNombreModulo;
		}

		/// <summary>
		/// Metodo que hace la consulta a BD para obtener los id de los modulos de la tabla tblCat_Modulo
		/// </summary>
		/// <param name="_IdSistema">Este parametro nos sirve para saber de que sistema vamos a consultar sus modulos</param>
		/// <returns>Una lista de enteros la cual contiene los Id de los modulos correspodientes al sistema</returns>
		public List<int> ObteneIdModulo(int IdSistema)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbIdModulo = (from tblCat_Modulo in con.tblCat_Modulo
							  where tblCat_Modulo.iIdSistema == IdSistema
							  select tblCat_Modulo.iIdModulo).ToList();
			//tbModulo.Distinct();
			this.con.Database.Connection.Close();
			return tbIdModulo;
		}

		public List<tblCat_Plan> ObtenerPlan(Guid iIdEquipo)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tbPlan = (from plan in con.tblCat_Plan
						  join equipo in con.tblRel_EquipoPlan
						  on plan.iIdPlan equals equipo.iIdPlan
						  where equipo.iIdEquipo == iIdEquipo
						  select plan).Distinct().ToList();
			//tbRequerimiento.Distinct();
			this.con.Database.Connection.Close();
			return tbPlan;
		}

		public DateTime ObtenerdtAltaPlan(int plan)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;
			var tbdtPlan = (from tblCat_WBS in con.tblCat_WBS
							where tblCat_WBS.iIdPlan == plan
							select tblCat_WBS.dtAlta).FirstOrDefault();
			//tbRequerimiento.Distinct();
			this.con.Database.Connection.Close();
			return tbdtPlan;
		}

		public List<tblCat_DetalleProceso> ObtenerProcesoNuevo(int iIdProceso)
		{
			//this.con.Database.Connection.Open();
			//this.con.Configuration.LazyLoadingEnabled = true;
			var tbWBSRegistros = (from tblCat_DetalleProceso in con.tblCat_DetalleProceso
									  //join tblCat_Title in con.tblCat_Title on tblCat_WBS.iIdEtapa equals tblCat_Title.iIdEtapa
								  where tblCat_DetalleProceso.iIdProceso == iIdProceso //&&
																					   //tblCat_WBS.iRequerimiento == iIdRQM
								  select tblCat_DetalleProceso).ToList();

			this.con.Database.Connection.Close();
			return tbWBSRegistros;
		}


		public List<Guid> UsuariosGuardados(int iIdReq, int iIdProceso, int iIdPlan)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tblIdUsuarios = (from wbs in con.tblCat_WBS
								 where wbs.iRequerimiento == iIdReq
								 && wbs.iIdProcesos == iIdProceso
								 && wbs.iIdPlan == iIdPlan
								 select wbs.iIdUsuario).ToList();

			this.con.Database.Connection.Close();
			return tblIdUsuarios;
		}

		public decimal TotalOriginalEstimado()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var total = (from wbs in con.tblCat_WBS
						 select wbs.dOriginal_Estimate).Sum();

			this.con.Database.Connection.Close();
			return total;
		}

		public List<decimal> ObtenerOriginalEstimados(int iIdPlan, int iIdRQM, int iIdProceso)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var originalestimados = (from wbs in con.tblCat_WBS
									 where wbs.iIdPlan == iIdPlan && wbs.iRequerimiento == iIdRQM && wbs.iIdProcesos == iIdProceso
									 select wbs.dOriginal_Estimate).ToList();

			this.con.Database.Connection.Close();
			return originalestimados;
		}

		public List<tblCat_Equipo> CargarEquipos()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var equipos = (from equipo in con.tblCat_Equipo
						   select equipo).ToList();

			this.con.Database.Connection.Close();
			return equipos;
		}

		public Guid NuevoEquipo(tblCat_Equipo nuevoEquipo)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			this.con.tblCat_Equipo.Add(nuevoEquipo);
			this.con.SaveChanges();

			var iIdEquipo = (from equipo in con.tblCat_Equipo
							 select equipo.iIdEquipo).Max();
			this.con.Database.Connection.Close();
			return iIdEquipo;
		}

		public void NuevoRelEquipoFecha(tblRel_EquipoFecha nuevoRelEquipoFecha)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			this.con.tblRel_EquipoFecha.Add(nuevoRelEquipoFecha);
			this.con.SaveChanges();
			this.con.Database.Connection.Close();
		}

		public void AgregarUsuariosaBD(UsuarioDTO usuario)
		{
			tblCat_Usuarios tablaUsuario = new tblCat_Usuarios();
			try
			{
				tablaUsuario.iIdUsuario = Guid.Parse(usuario.iIdUsuario);
				tablaUsuario.cNombreUsuario = usuario.cNombreUsuario;
				tablaUsuario.cClaveUsuario = usuario.cClaveUsuario;
			}
			catch (Exception)
			{

				throw;
			}
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			this.con.tblCat_Usuarios.Add(tablaUsuario);
			this.con.SaveChanges();
			this.con.Database.Connection.Close();
		}

		public List<tblCat_WBS> ObtenerDatosByPlan(int plan)
		{
			this.con.Configuration.ProxyCreationEnabled = false;

			List<tblCat_WBS> procesos = new List<tblCat_WBS>();

			var req = (from wbs in con.tblCat_WBS
					   where wbs.iIdPlan == plan
					   select wbs.iRequerimiento).Distinct().ToArray();
			foreach (var item in req)
			{
				procesos = (from wbsproceso in con.tblCat_WBS
							where wbsproceso.iIdPlan == plan && wbsproceso.iRequerimiento == item
							select wbsproceso).ToList();
			}
			return procesos;
		}

		public List<int> ObtenerRequerimientoByPlan(int plan)
		{
			this.con.Configuration.ProxyCreationEnabled = false;

			var reqs = (from wbs in con.tblCat_WBS.AsNoTracking()
						where wbs.iIdPlan == plan
						select wbs.iRequerimiento).Distinct().ToList();

			return reqs;
		}

		public List<WBSOrdenProcesoDTO> obtenerProcesosByPlanRqm(int plan, int rqm)
		{
			try
			{
				this.con.Configuration.ProxyCreationEnabled = false;

				var procesos = (from wbs in con.tblCat_WBS
								where wbs.iIdPlan == plan && wbs.iRequerimiento == rqm
								select new WBSOrdenProcesoDTO { iIdProceso = wbs.iIdProcesos, iOrdenProceso = wbs.iOrdenProceso }).Distinct();
				var procesosOrdenados = procesos.OrderBy(q => q.iOrdenProceso).ToList();

				var prueba = (from wbs in con.tblCat_WBS
							  where wbs.iIdPlan == plan && wbs.iRequerimiento == rqm
							  group wbs by wbs.iIdProcesos into g
							  select new WBSOrdenProcesoDTO { iIdProceso = g.Key, iOrdenProceso = g.Select(q => q.iOrdenProceso).Min() }).OrderBy(x => x.iOrdenProceso).ToList();
				return prueba;
			}
			catch (Exception)
			{

				return null;
			}

		}

		public List<IGrouping<int, TblWBS_TipoTareaDTO>> ObtenerDatosByPlanRqmProceso(int plan, int rqm, int proceso)
		{
			//this.con.Configuration.ProxyCreationEnabled = false;
			this.con.Configuration.LazyLoadingEnabled = false;
			var query = con.tblCat_WBS
				.Include(q => q.tblCat_TipoTarea)
				.Where(w => w.iIdPlan == plan && w.iRequerimiento == rqm && w.iIdProcesos == proceso)
				.Select(x => new TblWBS_TipoTareaDTO
				{
					iIdWBS = x.iIdWBS,
					iIdPlan = x.iIdPlan,
					iRequerimiento = x.iRequerimiento,
					iIdProcesos = x.iIdProcesos,
					iIdDetalleProceso = x.iIdDetalleProceso,
					cWork_Item_Type = x.cWork_Item_Type,
					iTipoElemento = x.iTipoElemento,
					dRemaining_Work = x.dRemaining_Work,
					dOriginal_Estimate = x.dOriginal_Estimate,
					dTiempo_Total_del_proceso = x.dTiempo_Total_del_proceso,
					dPorcentaje_de_tareas = x.dPorcentaje_de_tareas,
					dtamanios = x.dtamanios,
					dRate = x.dRate,
					dValor_ganado = x.dValor_ganado,
					isemana = x.isemana,
					dValor_ganado_acumulado = x.dValor_ganado_acumulado,
					dValor_ganado_semanal = x.dValor_ganado_semanal,
					iIdTipoTarea = x.iIdTipoTarea,
					cUnidad_de_medida = x.cUnidad_de_medida,
					dtFecha_de_inicio = x.dtFecha_de_inicio,
					dtFechaFinal = x.dtFechaFinal,
					dtHoras_Acumuladas = x.dtHoras_Acumuladas,
					dtAlta = x.dtAlta,
					dtModificacion = x.dtModificacion,
					lActivo = x.lActivo,
					iIdTFS = x.iIdTFS,
					iIdUsuario = x.iIdUsuario,
					iGrupo = x.iGrupo,
					lAplicaMultiProceso = x.lAplicaMultiProceso,
					cTituloProceso = x.cTituloProceso,
					iRevision = x.iRevision,
					dtTimeStamp = x.dtTimeStamp,
					iOrdenDetalleProceso = x.iOrdenDetalleProceso,
					iOrdenProceso = x.iOrdenProceso,
					iOrdenRequerimiento = x.iOrdenRequerimiento,
					iOrden = x.iOrden,
					cNombreTarea = x.tblCat_TipoTarea.cNombreTarea
				});
			var procesos = query.GroupBy(q => q.iGrupo).ToList();
			//var procesos = (from wbs in con.tblCat_WBS
			//				join tt in con.tblCat_TipoTarea on
			//				wbs.iIdTipoTarea equals tt.iIdTipoTarea
			//				where wbs.iIdPlan == plan && wbs.iRequerimiento == rqm && wbs.iIdProcesos == proceso
			//				select wbs).Include(c => c.tblCat_TipoTarea).GroupBy(q => q.iGrupo).ToList();

			//var procesos = con.tblCat_WBS
			//				.Where(x => x.iIdPlan == plan && x.iRequerimiento == rqm && x.iIdProcesos == proceso)
			//				.Include(c => c.tblCat_TipoTarea).GroupBy(z => z.iGrupo).ToList();
			return procesos;
		}

		public int ObtenerMaxGrupo()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var maxGrupo = 0;
			if (con.tblCat_WBS.FirstOrDefault() != null)
			{
				maxGrupo = (from wbs in con.tblCat_WBS
							select wbs.iGrupo).Max();
			}

			this.con.Database.Connection.Close();
			return maxGrupo;
		}

		public int ObtenerMaxFolioPlan(int plan)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			int maxFolio = 0;
			if (con.tblCat_WBS.FirstOrDefault() != null)
			{
				var Max = (from wbs in con.tblCat_WBS
						   where wbs.iIdPlan == plan
						   select wbs.iIdWBS).ToList();
				maxFolio = (Max.Count > 0) ? Max.Max() : maxFolio;
			}
			this.con.Database.Connection.Close();
			return maxFolio;
		}

		public tblCat_Plan AgregarPlan()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			//var planmax = 0;
			//if (con.tblCat_Plan.FirstOrDefault() != null)
			//{
			//	planmax = (from plan in con.tblCat_Plan
			//				   select plan.iIdPlan).Max();
			//}
			//planmax++;
			var nuevoPlan = new tblCat_Plan
			{
				dtFechaCreacion = DateTime.Today
			};
			this.con.tblCat_Plan.Add(nuevoPlan);
			this.con.SaveChanges();
			this.con.Database.Connection.Close();
			return nuevoPlan;
		}

		public void GuardarEquipo(tblCat_Equipo obj)
		{
			try
			{
				this.con.Database.Connection.Open();
				this.con.Configuration.LazyLoadingEnabled = true;
				this.con.Configuration.ProxyCreationEnabled = false;

				var equipos = (from equipo in con.tblCat_Equipo
							   where equipo.iIdEquipo == obj.iIdEquipo
							   select 1).ToList();

				if (equipos.Count == 0)
				{
					this.con.tblCat_Equipo.Add(obj);
					this.con.SaveChanges();

				}

			}
			catch (DbEntityValidationException dbEx)
			{
				foreach (var validationErrors in dbEx.EntityValidationErrors)
				{
					foreach (var validationError in validationErrors.ValidationErrors)
					{
						Trace.TraceInformation("Property: {0} Error: {1}",
												validationError.PropertyName,
												validationError.ErrorMessage);
					}
				}
			}
			finally
			{
				this.con.Database.Connection.Close();
			}

		}

		public void GuardarPlanEquipo(tblRel_EquipoPlan obj)
		{
			try
			{
				this.con.Database.Connection.Open();
				this.con.Configuration.LazyLoadingEnabled = true;

				var equiposPlan = (from equipoplan in con.tblRel_EquipoPlan
								   where equipoplan.iIdEquipo == obj.iIdEquipo &&
								   equipoplan.iIdPlan == obj.iIdPlan
								   select 1).ToList();

				if (equiposPlan.Count == 0)
				{
					this.con.tblRel_EquipoPlan.Add(obj);
					this.con.SaveChanges();
				}
			}
			catch (Exception ex)
			{

				throw ex;
			}
			finally
			{
				this.con.Database.Connection.Close();
			}

		}

		public void EliminarRegistroByPlanRequerimiento(int iIdPlan, int iIdRequerimiento)
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var registros = (from wbs in con.tblCat_WBS
							 where wbs.iIdPlan == iIdPlan && wbs.iRequerimiento == iIdRequerimiento
							 select wbs).ToList();

			this.con.tblCat_WBS.RemoveRange(registros);
			this.con.SaveChanges();
			this.con.Database.Connection.Close();
		}

		public List<tblCat_TipoTarea> ObtenerTipoTarea()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;

			var tiposTareas = (from tt in con.tblCat_TipoTarea
							   select tt).ToList();

			return tiposTareas;
		}

		public List<tblCat_DetalleProceso> ObtenerTareasAdicionales()
		{
			this.con.Database.Connection.Open();
			this.con.Configuration.LazyLoadingEnabled = true;
			this.con.Configuration.ProxyCreationEnabled = false;

			var tareasAdicionales = (from dt in con.tblCat_DetalleProceso
									 where dt.iIdProceso == 5
									 select dt).ToList();

			return tareasAdicionales;
		}

		//public int GuardarPlan(int iIdPlan)
		//{
		//	tblCat_Plan plan;
		//	var plan2 = 0;
		//	plan2 = ConsultarUltimoPlan();
		//	if (plan2 != iIdPlan)
		//	{
		//		var date = DateTime.Today;
		//		var tblPlan = new tblCat_Plan
		//		{
		//			dtFechaCreacion = date
		//		};
		//		this.con.Database.Connection.Open();
		//		this.con.Configuration.LazyLoadingEnabled = true;

		//		this.con.tblCat_Plan.Add(tblPlan);
		//		this.con.SaveChanges();
		//		this.con.Database.Connection.Close();
		//		plan2 = tblPlan.iIdPlan;
		//	}

		//	return plan2;

		//}

	}
}
