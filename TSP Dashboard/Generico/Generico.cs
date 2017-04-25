using System.Collections;
using System.Collections.Generic;
using TSP_Dashboard.Models;
namespace TSP_Dashboard.Generico
{

	class Generico
	{
		public static int cont = 0;
		public string Grid(int iIdTitle, bool? lEditable, List<tblCat_DetalleProceso> lstdetProceso, string lVisible, string htmlRow, List<tblCat_WBS> cValorWBS, int lTipoProceso, bool hibrido)
		{
			string lVisibleComponente = "text";
			string lEditableNombre = "readonly";
			string lVisibleNumberPrimary = "hidden";
			string lVisibleTextPrimary = "hidden";
			string eventoPrincipal = "CambiarTituloProceso();";
			int contador = 0;
			int iIdPadre = 0;
			int iIdFila = 0;
			int verificadorTamaño = (lstdetProceso.Count) - 1;
			string cNombreNodo;
			string boton;
			string colapsar;
			string btnDeshabilitar;
			string primary = ""; ;
			int itipoProceso = (int)tipoProceso.Normal;
			//cont = 0;
			//if (cNombreTitle != "Análisis" && cNombreTitle != "Diseño" && cNombreTitle != "Fecha de Vigencia" && cNombreTitle != "Seleccionar Ganador")
			//{
			//    lVisible = "hidden";
			//    lVisibleComponente = "hidden";
			//}
			if (lTipoProceso == 2)
			{
				if (cValorWBS.Count == 0)
					return "";
				else
				{
					htmlRow += "<tr role='row' class='raiz' name='padre'><td>" +
										   "<div class='btn-group btn-group-xs btn-group-solid'>" +
										   "<button type='button' id='Procesos' onclick='obtenerPadre(0);' data-toggle='modal' class='btn blue'><i class='glyphicon glyphicon-plus-sign'></i></button>" +
										   "</div>" +
										   "</td><td colspan='100%'><input type='text' id='NombreRaiz' placeholder='Identificador de Agrupador' class='form-control form-filter input-sm'/></td><td hidden><input type = 'number'  value='3' name='iTipoElemento' id='iTipoElemento_Raiz'></td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='" + lstdetProceso[contador].cNombreDetalleProceso + "' id='iIdDetalleProceso_" + cValorWBS[0].iIdDetalleProceso + "' value='" + lstdetProceso[contador].cNombreDetalleProceso + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control' id='Fecha_" + cont + "' value='" + cValorWBS[0].dtFecha_de_inicio.ToString("yyyy-MM-dd") + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control' id='FechaFinal_" + cont + "' value='" + cValorWBS[0].dtFechaFinal.ToString("yyyy-MM-dd") + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + cValorWBS[0].iIdTFS + "' name='iIdTFS' id='iIdTFS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + ((cValorWBS[0].lAplicaMultiProceso) ? 1 : 0) + "' name='' id='lAplicaMultiProceso_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + cValorWBS[0].iGrupo + "' name='' id='iGrupo_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + cValorWBS[0].iIdWBS + "' name='iIdWBS' id='iIdWBS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='1' name='estaGuardado' id='estaGuardado_" + cont + "'>" +
										   "</td>" +
										   "</tr>";
					return htmlRow;
				}

			}
			else
			{
				if (cValorWBS.Count == 0)
					return "";


				foreach (var item in cValorWBS)
				{

					if (contador == 0)
					{
						primary = "primary";
						iIdPadre = cont;
						cNombreNodo = "padre";
						//boton = "<button type='button' id='btnAgregarProceso' onclick='obtenerPadre(" + iIdPadre + ")' data-toggle='modal' data-target='#modalProceso' class='btn blue'><i class='glyphicon glyphicon-plus-sign'></i></button>";
						boton = "<button type='button' id='btnAgregarProceso' onclick='obtenerPadre(" + iIdPadre + ")' data-toggle='modal' class='btn blue'><i class='glyphicon glyphicon-plus-sign'></i></button>";
						colapsar = "<button type='button' id='colapsar_" + iIdPadre + "' onclick='Colapsar(this)' class='btn green' name='noColapsado'><i class='fa fa-bars'></i></button>";
						btnDeshabilitar = "";
						eventoPrincipal = "CambiarTituloProceso(this);";
					}
					else if (contador == verificadorTamaño)
					{
						primary = "noprimary";
						cNombreNodo = "ultimoHijo";
						boton = "";
						colapsar = "";
						btnDeshabilitar = "<button type='button' id='deshabilitar_" + cont + "' onclick='Deshabilitar(this)' class='btn red' name='Habilitado'><i class='fa fa-ban'></i></button>";
						eventoPrincipal = "";
					}
					else
					{
						primary = "noprimary";
						//iIdPadre = iIdFila;
						cNombreNodo = "hijo";
						boton = "";
						colapsar = "";
						btnDeshabilitar = "<button type='button' id='deshabilitar_" + cont + "' onclick='Deshabilitar(this)' class='btn red' name='Habilitado'><i class='fa fa-ban'></i></button>";
						eventoPrincipal = "";
					}
					if (item.iIdProcesos == iIdTitle)
					{
						if (lEditable == true)
						{
							lEditableNombre = "";
						}

						htmlRow += ("<tr role = 'row' class='filter " + primary + "' name='" + cNombreNodo + "_" + iIdPadre + "'>" +
										   "<td>" +
										   "<div class='btn-group btn-group-xs btn-group-solid'>" +
										   colapsar +
										   btnDeshabilitar +
										   //"<button type='button' id='copiarabajo' onclick='CopiarAbajo(this)' class='btn red'><i class='glyphicon glyphicon-arrow-down'></i></button>" +
										   boton +
										   "</div>" +
										   //"<button type='button' id='copiarabajo' onclick='obtenerPadre("+iIdPadre+ ")' data-toggle='modal' data-target='#modalProceso'><span class='glyphicon glyphicon-plus-sign'></span></button>" +
										   "</td>" +
										   //"<td>" +
										   //   "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdPlan_" + iIdTitle + "' value='" + item.iIdPlan + "' readonly>" +
										   //"</td>" +
										   "<td>" +
											   "<input type ='" + lVisibleComponente + "' class='form-control form-filter input-sm' name='order_id' id='cTituloProceso_" + cont + "' value='" + item.cTituloProceso + "' " + lEditableNombre + " onblur='" + eventoPrincipal + "'>" +
										   "</td>" +
										   "<td>" +
												   "<select name = 'order_status' class='form-control form-filter input-sm' id='iIdTipoInspeccion_" + cont + "'>" +
												   "<option></ option >" +
											   "<option value='I' selected>Inspección</option>" +
											   "<option value = 'C' >Corrida.</option>" +
												"<option value = 'E' >Escritorio </option>" +
												"</select>" +
										   "</td>" +
										   "<td>" +
											  "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdTipoTarea_" + cont + "' value='" + item.cTipo_de_tarea + "' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='" + lstdetProceso[contador].cNombreDetalleProceso + "' id='iIdDetalleProceso_" + item.iIdDetalleProceso + "' value='" + lstdetProceso[contador].cNombreDetalleProceso + "' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<input type = 'text' class='form-control form-filter input-sm' id='iIdWork_" + cont + "' name='order_ship_to' value='" + item.cWork_Item_Type + "' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<select name = 'order_status' class='form-control form-filter input-sm usuarios' id='iIdUsuarios" + cont + "' idUsuario='" + item.iIdUsuario + "'>" +
												   "<option></ option >" +
												//"<option value='1'>Elias Emanuel Perez Mena</option>" +
												//"<option value = '2' >Aaron Arturo Valdez Avila</option>" +
												// "<option value = '3' selected> Rey Gonzalo Jesus Ruiz Mijangos</option>" +
												//"<option value = '4' >Fredel Reynel Pacheco Caamal</option>" +
												"</select>" +
										   "</td>" +
											   "<td>" +
											  "<input type = '" + lVisibleNumberPrimary + "' step='0.1' min='0'  value='" + item.dRemaining_Work + "' class='form-control form-filter input-sm' name='order_id' id='Remaining_" + cont + "' readonly>" +
										  "</td>" +
											  "<td>" +
											   "<input type = '" + lVisibleNumberPrimary + "' step='0.1' min='0'  value='" + item.dOriginal_Estimate + "' class='form-control form-filter input-sm' name='order_id' id='iIdEstimate_" + cont + "' readonly>" +
										 "</td>" +
										"<td>" +
											 "<input type ='" + ((contador == 0) ? "number" : "hidden") + "' step='0.1' min='0'   value='" + item.dTiempo_Total_del_proceso + "' class='form-control form-filter input-sm' name='order_id' id='iIdTotalProceso_" + cont + "' onchange='PorcentajeDeTareas(this.id);formulaOriginalEstimado()' readonly> " +
										  "</td>" +
											"<td>" +
											 "<input type = '" + lVisibleNumberPrimary + "' step='0.1' min='0'  value='" + item.dPorcentaje_de_tareas + "'  class='form-control form-filter input-sm' name='order_id' id='iIdPorcentajeTareas_" + cont + "' onchange='PorcentajeDeTareas(this.id)' readonly>" +
										  "</td>" +
											"<td>" +
											"<input type = '" + ((lstdetProceso[contador].lTamaño) ? "number" : "hidden") + "' step='0.1' min='0'   value='" + item.dtamanios + "' class='form-control form-filter input-sm' name='order_id' id='iIdTamano_" + cont + "' onchange='Getformulas(" + cont + ");'>" +
										  "</td>" +
										  "<td>" +
											 "<input type = '" + ((contador == 0) ? "number" : "hidden") + "' step='0.1' min='0'   value='" + item.dRate + "' class='form-control form-filter input-sm' name='order_id' id='iIdRate_" + cont + "' onchange='Getformulas(" + cont + ");'>" +
										 "</td>" +
										   "<td>" +
											  "<input type = '" + lVisibleNumberPrimary + "' step='0.1' min='0'   value='" + item.dValor_ganado + "' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanado_" + cont + "' readonly>" +
										 "</td>" +
											"<td hidden>" +
											 "<input type = 'number' min='0' max='21'  value='" + item.isemana + "' class='form-control form-filter input-sm' name='order_id' id='iIdSemana_" + cont + "' readonly>" +
										  "</td>" +
										   "<td hidden>" +
											   "<input type = 'number' step='0.1' min='0'  value='" + item.dValor_ganado_acumulado + "' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoAcumulado_" + cont + "' readonly>" +
										 "</td>" +
											 "<td hidden>" +
											 "<input type = 'number' step='0.1' min='0'   value='" + item.dValor_ganado_semanal + "' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoSemanal_" + cont + "' readonly>" +
										  "</td>" +
											 "<td hidden>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdUnidadMedida_" + cont + "' value='" + item.cUnidad_de_medida + "' readonly>" +
										   "</td>" +
											"<td>" +
													"<input type = 'text' class='form-control form-filter input-sm' id='Fecha_" + cont + "' value='" + item.dtFecha_de_inicio.ToString("yyyy-MM-dd") + "' readonly>" +
											"</td>" +
											"<td>" +
													"<input type = 'text' class='form-control form-filter input-sm' id='FechaFinal_" + cont + "' value='" + item.dtFechaFinal.ToString("yyyy-MM-dd") + "' readonly>" +
											"</td>" +
											 "<td hidden>" +
											   "<input type = 'number'  step='0.1' min='0' value='' class='form-control form-filter input-sm' name='order_id' id='iIdHorasAcumuladas_" + cont + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + item.iIdTFS + "' name='iIdTFS' id='iIdTFS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + ((item.lAplicaMultiProceso) ? 1 : 0) + "' name='' id='lAplicaMultiProceso_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + item.iGrupo + "' name='' id='iGrupo_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + item.iIdWBS + "' name='iIdWBS' id='iIdWBS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='1' name='estaGuardado' id='estaGuardado_" + cont + "'>" +
										   "</td>" +
										   "<td id='iIdPadre' hidden>" +
											   "<input type = 'number'  value='" + iIdPadre + "'>" +
										   "</td>" +
										   "<td id='" + cont + "' hidden name='" + cNombreNodo + "'>" +
										   "</td>" +
									   "</tr>");
						if (contador != verificadorTamaño)
						{
							contador++;
							lVisible = "hidden";
							//cont++;
						}
						else
						{
							contador = 0;
							lVisible = "number";
							iIdFila = cont + 1;
							lVisibleNumberPrimary = "hidden";


						}
						if (contador > 0)
						{
							lVisibleNumberPrimary = "number";
							lVisibleTextPrimary = "text";
						}
						cont++;
					}

				}
				lVisibleComponente = "text";
				return htmlRow;
			}
		}



		public string ContenedorSuperior()
		{
			string htmlContenedor = "";

			htmlContenedor = "<div style='overflow-x:scroll;overflow-y:scroll'><div class='table-container' style='width:2200px;height:450px'>" +

								"<table class='table table-striped table-bordered table-hover' id='datatable_ajax' >" +
								"<thead>";


			return htmlContenedor;


		}

		public string ContenedorInferior()
		{
			string htmlContenedor = "";

			htmlContenedor = "</thead>" +
								"<tbody>" +
								"</tbody>" +
								"</table>" +
							  "</div></div><br></br><br></br>";

			return htmlContenedor;
		}

		public string ContenedorGrid(List<tblCat_Proceso> lstTitle, List<tblCat_DetalleProceso> lstdetProceso, List<tblCat_WBS> lstWBS, bool hibrido)
		{
			int procesos = 1;
			//int contador = 0;
			string htmlRow = "";
			ArrayList datosProceso = new ArrayList();
			string lVisible = "number";
			////string cUsuarios = "<select name = 'order_status' class='form-control form-filter input-sm'><option value = ''> Select...</option >";

			//if (!agregado)
			//{
			//    htmlRow = ContenedorSuperior();
			//    htmlRow += Encabezado();
			//}

			//cUsuarios += "</select>";


			foreach (var item in lstTitle)
			{

				htmlRow = Grid(item.iIdProceso, item.lEditable, lstdetProceso, lVisible, htmlRow, lstWBS, item.iTipoProceso, hibrido);
			}
			lVisible = "number";
			//if (!agregado)
			//{
			//    htmlRow += ContenedorInferior();
			//}
			//else
			//{
			//    procesos++;
			//}
			return htmlRow;
		}



		public string Encabezado()
		{

			string htmlEncabezado = "";
			htmlEncabezado = "<tr role = 'row' class='heading'>" +
								   "<th width = '5%' >" +
									   "<input type='checkbox' class='group-checkable'>" +
								   "</th>" +
								   "<th width = '2%'>" +
									   "Plan" +
								   "</th >" +
								   "<th width = '10%'>" +
									   "Componente" +
								   "</th >" +
								   "<th width='8%'>" +
									   "Tipo de Inspección" +
								   "</th>" +
										"<th width = '2%' >" +
										"Tipo de tarea" +
								   "</th>" +
								   "<th width='15%'>" +
									   " Title" +
								   "</th>" +
								   "<th width = '4%' >" +
									  " Work Item Type</th>" +

								   "<th width= '15%' !important'>" +
									   " Assigned To" +
								   "</th>" +
								   "<th width = '2%' >" +
									   " Remaining Work" +
								   "</th>" +
								   "<th width = '2%' >" +
									   " Original Estimate" +
								   "</th>" +
								   "<th width = '2%' >" +
									   " Tiempo Total del proceso" +
								   "</th>" +
								   "<th width = '2%' >" +
									   " Porentaje de tareas" +
								   "</th>" +
									  "<th width = '5%' >" +
									   " Tamaño" +
								   "</th >" +
										"<th width= '5%'>" +
										"Rate" +
								   "</th >" +
										"<th width= '2%' >" +
									  "  Valor ganado" +
								   "</th>" +
									   "</th>" +
										"<th width = '2%' >" +
									   " Semana" +
								   "</th >" +
										"<th width= '2%' >" +
									  "  Valor ganado acumulado" +
								   "</th>" +
										"<th width = '2%' >" +
									   " Valor ganado semanal" +
								   "</th>" +
										"<th width = '2%' >" +
									   " Unidad de medida" +
								   "</th>" +
										   "</th>" +
										"<th width = '5%' >" +
									   " Fecha de inicio" +
								   "</th>" +
									"<th width = '3%' >" +
									   " Horas Acumuladas" +
								   "</th>" +
								   "<th width = '0%' hidden>" +
									   "" +
								   "</th>" +
							   "</tr>";
			return htmlEncabezado;
		}

		public string NuevoGrid(List<tblCat_Proceso> lstProceso, List<tblCat_DetalleProceso> lstDetalleProceso, int iIdRQM, int iIdPlan)
		{
			string lEditableNombre = "readonly";
			string lVisibleNumber = "number";
			string lVisibleText = "text";
			string EventoPrincipal = "CambiarTituloProceso(this);";
			string lVisiblePrimary = "hidden";
			string htmlRow = "";
			int contador = 0;
			int iIdPadre = 0;
			int iIdFila = 0;
			string colapsar;
			string btnDeshabilitar;
			int verificadorTamaño = (lstDetalleProceso.Count) - 1;
			string cNombreNodo;
			string boton;
			string primary = "";

			foreach (var item in lstDetalleProceso)
			{
				if (lstProceso[0].lEditable == true)
				{
					lEditableNombre = "";
				}
				if (contador > 0)
				{
					lVisibleNumber = "hidden";
					lVisibleText = "hidden";
					EventoPrincipal = "";

				}

				if (contador == 0)
				{
					primary = "primary";
					iIdPadre = cont;
					cNombreNodo = "padre";
					boton = "<button type='button' id='btnAgregarProceso' class='btn blue' onclick='obtenerPadre(" + iIdPadre + ")' data-toggle='modal'><span class='glyphicon glyphicon-plus-sign'></span></button>";
					colapsar = "<button type='button' id='colapsar_" + iIdPadre + "' onclick='Colapsar(this)' class='btn green' name='noColapsado'><i class='fa fa-bars'></i></button>";
					btnDeshabilitar = "";
				}
				else if (contador == verificadorTamaño)
				{
					cNombreNodo = "ultimoHijo";
					boton = "";
					colapsar = "";
					btnDeshabilitar = "<button type='button' id='deshabilitar_" + cont + "' onclick='Deshabilitar(this)' class='btn red' name='Habilitado'><i class='fa fa-ban'></i></button>";
					primary = "noprimary";
				}
				else
				{
					//iIdPadre = iIdFila;
					cNombreNodo = "hijo";
					boton = "";
					colapsar = "";
					btnDeshabilitar = "<button type='button' id='deshabilitar_" + cont + "' onclick='Deshabilitar(this)' class='btn red' name='Habilitado'><i class='fa fa-ban'></i></button>";
					primary = "noprimary";
				}
				htmlRow += ("<tr role = 'row' class='filter " + primary + "' name='" + cNombreNodo + "_" + iIdPadre + "'>" +
										   "<td>" +
										   "<div class='btn-group btn-group-xs btn-group-solid'>" +
										   colapsar +
										   //"<button type='button' id='colapsar_" + iIdPadre + "' onclick='Colapsar(this)' class='btn green' name='noColapsado'><span class='fa fa-bars'></span></button>" +
										   //"<button type='button' id='copiarabajo' onclick='CopiarAbajo(this)' class='btn red'><span class='glyphicon glyphicon-arrow-down'></span></button>" +
										   boton +
										   btnDeshabilitar +
										   "</div>" +
										   //"<button type='button' id='copiarabajo' onclick='obtenerPadre(" + iIdPadre + ")' data-toggle='modal' data-target='#modalProceso'><span class='glyphicon glyphicon-plus-sign'></span></button>" +
										   "</td>" +
										   //"<td>" +
										   //   "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdPlan_" + cont + "' value='' readonly>" +
										   //"</td>" +
										   "<td>" +
											   "<input type ='" + lVisibleText + "' class='form-control form-filter input-sm' name='order_id' id='cTituloProceso_" + cont + "' value='" + item.cNombreDetalleProceso + "' " + lEditableNombre + " onblur='" + EventoPrincipal + "'>" +
										   "</td>" +
										   "<td>" +
												   "<select name = 'order_status' class='form-control form-filter input-sm' id='iIdTipoInspeccion_" + cont + "'>" +
											   "<option value='I' selected>Inspección</option>" +
											   "<option value = 'C' >Corrida.</option>" +
												"<option value = 'E' >Escritorio </option>" +
												"</select>" +
										   "</td>" +
										   "<td>" +
											  "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdTipoTarea_" + cont + "' value='0' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='" + item.cNombreDetalleProceso + "' id='iIdDetalleProceso_" + item.iIdDetalleProceso + "' value='" + item.cNombreDetalleProceso + "' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<input type = 'text' class='form-control form-filter input-sm' id='iIdWork_" + cont + "' name='order_ship_to' value='0' readonly>" +
										   "</td>" +
										   "<td>" +
											   "<select name = 'order_status' class='form-control form-filter input-sm usuarios' id='iIdUsuarios" + cont + "'>" +
												"</select>" +
										   "</td>" +
											   "<td>" +
											  "<input type = '" + ((contador == 0) ? "hidden" : "number") + "' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='Remaining_" + cont + "' readonly>" +
										  "</td>" +
											  "<td>" +
											   "<input type = '" + lVisiblePrimary + "' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdEstimate_" + cont + "' readonly>" +
										 "</td>" +
										"<td>" +
											 "<input type ='" + lVisibleNumber + "' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdTotalProceso_" + cont + "' onchange='PorcentajeDeTareas(this.id)' readonly> " +
										  "</td>" +
											"<td>" +
											 "<input type = '" + lVisiblePrimary + "' step='0.1' min='0'  value='" + item.dPorcentaje + "'  class='form-control form-filter input-sm' name='order_id' id='iIdPorcentajeTareas_" + cont + "' onchange='PorcentajeDeTareas(this.id)' readonly>" +
										  "</td>" +
											"<td>" +
											"<input type = '" + ((item.lTamaño) ? "number" : "hidden") + "' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdTamano_" + cont + "' onchange='Getformulas(" + cont + ");'>" + //onchange='Getformulas(" + cont + ");'
										  "</td>" +
										  "<td>" +
											 "<input type = '" + ((contador == 0) ? "number" : "hidden") + "' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdRate_" + cont + "' onchange='Getformulas(" + cont + ");'>" + //onchange='Getformulas(" + cont + ");'
										 "</td>" +
										   "<td>" +
											  "<input type = '" + ((contador != 0) ? "number" : "hidden") + "' min='0' value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanado_" + cont + "' readonly>" +
										 "</td>" +
											"<td hidden>" +
											 "<input type = 'number' min='0' max='21'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdSemana_" + cont + "' readonly>" +
										  "</td>" +
										   "<td hidden>" +
											   "<input type = 'number' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoAcumulado_" + cont + "' readonly>" +
										 "</td>" +
											 "<td hidden>" +
											 "<input type = 'number' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoSemanal_" + cont + "' readonly>" +
										  "</td>" +
											 "<td hidden>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdUnidadMedida_" + cont + "' value='0' readonly>" +
										   "</td>" +
											"<td>" +
													"<input type = 'text' class='form-control form-filter input-sm' id='Fecha_" + cont + "' readonly>" +
											"</td>" +
											"<td>" +
													"<input type = 'text' class='form-control form-filter input-sm' id='FechaFinal_" + cont + "' readonly>" +
											"</td>" +
											 "<td hidden>" +
											   "<input type = 'number'  step='0.1' min='0' value='0' class='form-control form-filter input-sm' name='order_id' id='iIdHorasAcumuladas_" + cont + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='iIdTFS' id='iIdTFS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='' id='lAplicaMultiProceso_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='' id='iGrupo_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='iIdWBS' id='iIdWBS_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='estaGuardado' id='estaGuardado_" + cont + "'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='" + ((contador == 0) ? 1 : 2) + "' name='iTipoElemento' id='iTipoElemento_" + cont + "'>" +
										   "</td>" +
										   "<td id='iIdPadre' hidden>" +
										   "<input type = 'number'  value='" + iIdPadre + "'>" +
									   "</td>" +
									   "<td id='" + cont + "' hidden name='" + cNombreNodo + "'>" +
									   "</td>" +
									   "</tr>");
				if (contador != verificadorTamaño)
				{
					//contador++;
					//lVisible = "hidden";
					//cont++;
				}
				else
				{
					contador = 0;
					//lVisible = "number";
					iIdFila = cont;

				}
				contador++;
				cont++;
				if (contador > 0)
				{
					lVisiblePrimary = "number";
				}
			}

			//lVisibleComponente = "text";
			return htmlRow;
		}


	}
}
