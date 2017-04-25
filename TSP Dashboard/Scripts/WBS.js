//esta es la direccion para obtener los nombres de los usuarios
//http://bot-fswws/reportes/wstfs.asmx?op=ObtenerUsuarios
//ObtenerTituloElementoTFS
///wsTFSExterno.asmx/ObtenerIteraciones
var NumeroRegistros = 0;
var cIdProcesoGlobal = "";
var iIdEtapa = 0;
var esAgregado = false;
var noFilaPorProceso;
var siguienteplan = 1;
var ultimoplan;
var estaGuardado;
var longitud;
var arrRQM;
var allRQM;
var jsonTemporal;
var indiceGlobal;
var RegistroNuevo;
var arrUsuariosGlobal;
var comprobacionJson;
var arrUserFromTFS;
var acabadeguardar;
var gridGlobal;
//var totaloriginalestimado;
var rqmGlobal;
var procesoGlobal;
var planGlobal;
var iIdRQMGlobal;
var iIdProcesoGlobal;
var iIdPlanGlobal;
var ArrProcesosGlobal;
var arrUsuariosTFSGlobal;
var arrS2Usuarios;
var modoHibrido = false;
var modoNormal = false;
var iIdProcesoPrev;
var iIdRQMPrev;
var iIdPlanPrev;
var estaCambiandoPlan = false, estaCambiandoRqm = false, estaCambiandoProceso = false;
var sSprint, sUserName, sPassword, sProyecto, sColeccion;
var UniqueNameUsuario;
var ColeccionesProyectos = [
	{
		"Nombre": "BOT",
		"Proyectos": ["SIGOT", "SIVU", "PDG", "SIRH", "SIR"]
	},
	{
		"Nombre": "FSW",
		"Proyectos": ["GPIC_A002"]
	},
	{
		"Nombre": "BLUEOCEAN",
		"Proyectos": ["SIMP", "PRUEBASIAC"]
	}
]
jQuery(document).ready(function () {
	$(".modal.fade").each(function (index, domEle) {
		$(domEle).css("cssText", "overflow: visible !important");
	});
	//$("body").attr("class", "page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo");
	//$("body").show();
	arrRQM = new Array();
	allRQM = new Array();
	jsonTemporal = { General: [], Totales: [] };
	arrUsuariosGlobal = new Array();
	arrUserFromTFS = new Array();
	estaGuardado = false;
	ultimoplan = 0;
	RegistroNuevo = false;
	comprobacionJson = true;
	acabadeguardar = false;
	rqmGlobal = [];
	procesoGlobal = [];
	planGlobal = [];
	arrUsuariosTFSGlobal = new Array();
	arrS2Usuarios = new Array();
	UniqueNameUsuario = $("#nombreUsuario").text();
	$("#UserNameTop").text(UniqueNameUsuario.split("\\")[1]);
	//GenerarRowProcesos(1, 16196, 1, esAgregado);
	$("#iIdPorcentajeTareas_Análisis").on('change', function (e) {
		PorcentajeDeTareas();

	});
	$('#iIdGuardar').on('click', function (e) {
		GuardarDatos();
	});

	$('select#iIdEtapas').on('change', function () {
		iIdEtapa = $(this).val();
	});

	//$("#menuPrincipal").on("click", function () {
	//    if ($(".tituloPrincipal").css("display") == "none") {
	//        $(".tituloPrincipal").css("display", "");
	//        //$("body").attr("class", "page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo page-sidebar-closed")
	//    }
	//    else {
	//        $(".tituloPrincipal").css("display", "none");
	//        //$("body").attr("class", "page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo")

	//    }
	agregarColecciones();
	$("#modalSmElegirEquipo").modal("show");
	//})
	//console.log(sessionStorage.getItem("IdSistema"));
	//obtenerSistemas();
	//obtenerModulos(sessionStorage.getItem("IdSistema"), sessionStorage.getItem("NombreSistema"));
	//TotalOriginalEstimado();
	//CargarColecciones();
	//obtenerIteraciones();
	//$("#UserImage").attr("src", arrUser[0].teamMember.imageUrl);
	ObtenerUsuariosTFS();
	obtenerEtapas();
	obtenerRequerimientos();
	obtenerPlan();
	//formulaValorGanado();
	temporalprueba();
	//CargarEquipos();
	s2usuarios();
	//$("#btnOrdenar").prop("disabled", true);

	$("#iIdEtapas").on("select2:open", function () {
		//debugger;
		iIdProcesoPrev = this.value;
		estaCambiandoProceso = true;
		estaCambiandoPlan = false;
		estaCambiandoRqm = false;
	})
	$("#iIdPlan").on("select2:open", function () {
		//debugger;
		iIdPlanPrev = this.value;
		estaCambiandoProceso = false;
		estaCambiandoPlan = true;
		estaCambiandoRqm = false;
	})
	$("#iIdRequerimiento").on("select2:open", function () {
		//debugger;
		iIdRQMPrev = this.value;
		estaCambiandoProceso = false;
		estaCambiandoPlan = false;
		estaCambiandoRqm = true;
	})

	//debugger;
	//usuariosabd();
	/*$(window).load(function () {
        
    });*/
	//$(".usuarios").select2({
	//    placeholder: "Usuarios",
	//    allowClear: true,
	//    width: "100%"
	//});
});



//function GenerarRowProcesos(iIdProceso,iIdRQM)
//{
//    var $rowProcesos = $('ul.rowProceso');
//    $.ajax({
//        type: "POST",
//        url: "../../Class/WBS.asmx/GenerarRowProceso",
//        data: '{"iIdProceso":"' + iIdProceso + '", "iIdRQM":"' + iIdRQM + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            if (agregado) {
//                $rowProcesos.append(response.d);
//            }
//            else {
//                $rowProcesos.html("");
//                $rowProcesos.append(response.d);
//                obtenerUsuarios();
//            }

//        }
//    });

//}
//var seCambio = false;
function filtrarJsonTemporal(data, plan, rqm, proceso) {
	return data.filter(
        function (data) { return data.iIdPlan == plan && data.iIdRequerimiento == rqm && data.iIdProceso == proceso }
        );
}

function CambiarHtmlJsonTemporal(data, plan, rqm, proceso, seCambio) {
	
	return data.filter(
        function (data) {
        	if (data.iIdPlan == plan && data.iIdRequerimiento == rqm && data.iIdProceso == proceso) {
        		data.htmlText = $("#datatable_ajax tbody").children();
        		seCambio = true;
        		return seCambio
        	}

        }
        );
}

function GenerarRowProcesos(iIdProceso, iIdRQM, iIdPlan, hibrido) {
	var $rowProcesos = $("#datatable_ajax tbody");
	var indice;
	var gridGuardado = new Array();
	//debugger;
	//$.each(jsonTemporal.General, function (index, domEle) {
	//    if (domEle.iIdProceso == iIdProceso && domEle.iIdRequerimiento == iIdRQM && domEle.iIdPlan == iIdPlan) {
	//        /*if (!agregado) {
	//            domEle.htmlText = $rowProcesos.html();
	//        }*/
	//        indice = index;
	//        indiceGlobal = index;
	//    }
	//});
	//if (typeof (indice) !== "undefined" && !acabadeguardar) {
	//    //debugger;
	//    $rowProcesos.html("");
	//    $rowProcesos.append(jsonTemporal.General[indice].htmlText);
	//    jsonTemporal.General[indice].htmlText = $rowProcesos.children();
	//    var arrTemp = jsonTemporal.General[indice].users;
	if (jsonTemporal.General.length != 0) {
		gridGuardado = filtrarJsonTemporal(jsonTemporal.General, iIdPlan, iIdRQM, iIdProceso);
	}
	if (gridGuardado.length != 0) {
		$rowProcesos.html("");
		$rowProcesos.append(gridGuardado[0].htmlText);



		//$(".usuarios").parent().html("");

		//debugger;
		//for (var i = 0; i < arrTemp.length ; i++) {
		//    var temp = $("#datatable_ajax tbody tr")[i].children[6]
		//    temp = $(temp).find("select").val(arrTemp[i]);
		//    //temp = $(temp).append("<select name = 'order_status' class='form-control form-filter input-sm select2-container usuarios' id='iIdUsuarios" + i + "'>" +
		//    //                                       "<option></ option >" +
		//    //                                    "</select>");
		//    //$(temp).find("select").select2({
		//    //    placeholder: "Usuarios",
		//    //    allowClear: true,
		//    //    width: "100%"
		//    //});
		//}
		SetValoresGanadosToGrid(arrValoresGanados, arrFechasParaGrid)
		inputsChange();
		OrdenarProcesos();
		AgregarPreview(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
		AplicarNomenclatura();
		//CambiarAsignado();
		//CambiarRevisor();
		$("#btnOrdenar").prop("disabled", false);
		//$("#btnNomenclatura").prop("disabled", false);
		$("#btnPrevisualizar").prop("disabled", false);

	}
	else {
		$.ajax({
			type: "POST",
			async: false,
			url: "../../Class/WBS.asmx/GenerarRowProceso",
			data: '{"iIdProceso":"' + iIdProceso + '", "iIdRQM":"' + iIdRQM + '", "iIdPlan":"' + iIdPlan + '", "hibrido":' + hibrido + '}',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				//debugger;
				respuesta = response.d;
				if (respuesta == "") {
					UsuariosToArray();
					$("#btnOrdenar").prop("disabled", true);
					//$("#btnNomenclatura").prop("disabled", true);
					$("#btnPrevisualizar").prop("disabled", true);
					//GenerarRowProcesosNuevo(iIdProceso, iIdRQM, iIdPlan, agregado);
					//alert("No existe registro alguno, si desea puede crear un nuevo proceso");
					Alertas(1, "Alerta", "No existe registro alguno, si desea puede crear un nuevo proceso")
					$rowProcesos.html("");
					RegistroNuevo = true;

				}
				else {
					//if (agregado) {
					//    $("#datatable_ajax tbody").append(respuesta);
					//    esAgregado = false;
					//    changePlan();
					//}
					//else {
					$rowProcesos.html("");
					if (iIdProceso == 4) {
						for (var i = 1; i < 4; i++) {
							$.ajax({
								type: "POST",
								async: false,
								url: "../../Class/WBS.asmx/GenerarRowProceso",
								data: '{"iIdProceso":"' + i + '", "iIdRQM":"' + iIdRQM + '", "iIdPlan":"' + iIdPlan + '", "hibrido":' + hibrido + '}',
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function (respJson) {
									respuesta += respJson.d;
								},
								error: function (xhr, estatus) {
									//alert("Error " + estatus);
									Alertas(2, "Error", "Error de carga de datos")
								}
							});
						}
					}
					$rowProcesos.append(respuesta);
					//noFilaPorProceso =$("#datatable_ajax thead tr")
					//console.log(noFilaPorProceso)
					$("#iIdEtapas").val(iIdProceso);
					$("#iIdRequerimiento").val(iIdRQM);
					$("#iIdPlan").val(iIdPlan);
					//}
					//debugger;
					obtenerUsuarios();

					ocultarElementos();
					UsuariosGuardados();
					//SetValoresGanadosToGrid(arrValoresGanados, arrFechasParaGrid);

					//debugger;
					jsonTemporal.General.push({
						iIdProceso: iIdProceso,
						iIdRequerimiento: iIdRQM,
						iIdPlan: iIdPlan,
						htmlText: $("#datatable_ajax tbody").children(),
						users: arrUsuariosGlobal,
						longitud: $("#datatable_ajax tbody tr").length,
						guardado: true
					});
					estaGuardado = false;
					//arrUsuariosGlobal = [];
					console.log(jsonTemporal.General.length);
					gridGlobal = $("#datatable_ajax tbody tr");
					indiceGlobal = jsonTemporal.General.length - 1;
					acabadeguardar = false;
					if (comprobacionJson == true) {
						comprobacionJson = false;
					}
					OrdenarProcesos();
					AgregarPreview(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
					//AplicarNomenclatura();
					//CambiarAsignado();
					//CambiarRevisor();
					$("#btnOrdenar").prop("disabled", false);
					//$("#btnNomenclatura").prop("disabled", false);
					$("#btnPrevisualizar").prop("disabled", false);
				}
				inputsChange();
			},
			error: function (xhr, estatus) {
				//alert("Error " + estatus);
				Alertas(2, "Error", "Error de carga de datos")
			}
		});

	}
	//$(".usuarios").select2({
	//    placeholder: "Usuarios",
	//    allowClear: true,
	//    width: "100%"
	//});

}

function PorcentajeDeTareas(cIdTitle) {
	var rowEstimate = '#iIdEstimate_';
	var rowTiempoTotalProcesos = $('#iIdTotalProceso_').val();
	var rowPorcentajeTarea = $('#' + cIdTitle).val();
	var dOriginalEstimate = rowTiempoTotalProcesos * (rowPorcentajeTarea / 100);

	$(rowEstimate + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dOriginalEstimate);
	var dHoras = HorasAcumuladas();
	$('#iIdHorasAcumuladas_' + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dHoras);
	var dValorG = ValorGanado(rowTiempoTotalProcesos, rowPorcentajeTarea, dOriginalEstimate, dHoras);
	$('#iIdValorGanado_' + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dValorG);
}

function HorasAcumuladas() {
	var cProceso = "";
	var dHorasAcumularas = 0;
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/Proceso",
		async: false,
		data: '{"cIdProceso":"' + iIdEtapa + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			cProceso = response.d;
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	$(cProceso.split(',')).each(function (index, domEle) {
		dHorasAcumularas = parseFloat(parseFloat(dHorasAcumularas) + parseFloat($('#iIdEstimate_' + domEle).val()));
	});
	return dHorasAcumularas;

}

//function ObtenerProceso(cIdProceso) {
//	switch (cIdProceso) {
//		case ("Análisis"):
//			cIdProcesoGlobal = "Análisis";
//			break;
//		case ("Diseño"):
//			cIdProcesoGlobal = "Diseño";
//			break;
//		case ("Desarrollo"):
//			cIdProcesoGlobal = "Desarrollo";
//			break;
//		case ("Seleccionar_Ganador"):
//			cIdProcesoGlobal = "Seleccionar_Ganador";
//			break;
//	}
//	return cIdProcesoGlobal;

//}


function GuardarDatos() {
	var cRegistrosStr = Array();
	var iIdRegistroStr = Array();
	var dRegistrosNum = Array();
	var iIdRegistroNum = Array();
	var cmdRegistro = Array();
	var iIdcmdRegistro = Array();
	var ValorCampo = "";
	var NombreCampo = "";
	var str = "";
	$('input[type=text]').each(function (index, domEle) {
		NombreCampo += $(this).attr("id") + ",";
		ValorCampo += $(domEle).val() + ",";
	});
	$('input[type=number]').each(function (index, domEle) {
		//NombreCampo += $(this).attr("id") + ",";
		//ValorCampo += $(domEle).val() + ",";
	});
	$('#iIdCombo :selected').each(function (i, selected) {
		//NombreCampo += $(this).attr("id") + ",";
		//ValorCampo += $(domEle).val() + ",";
	});

	var $rowProcesos = $('ul.rowProceso');
	$.ajax({
		type: "POST",
		async: false,
		url: "../../Class/WBS.asmx/Guardar",
		data: '{"ValorCampo" :"' + ValorCampo + '", "NombreCampo" : "' + NombreCampo + '"}',
		contentType: "application/json; charset=utf-8",

		success: function (response) {

		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});

}

function ValorGanado(rowTiempoTotalProcesos, rowPorcentajeTarea, dOriginalEstimate, dHoras) {
	var dValorGanado = 0;
	dValorGanado = (parseFloat(dHoras) / parseFloat(dOriginalEstimate));
	return dValorGanado;

}

var cambiar = true;
function ObtenerRequerimiento() {
	//var arrUsers = new Array();
	//debugger;
	var grid = $("#datatable_ajax tbody");
	var iIdEtapas = $('#iIdEtapas').val();
	var iIdRQM = $('#iIdRequerimiento').val();
	var iIdPlan = $('#iIdPlan').val();
	var cont = 0;
	iIdProcesoGlobal = iIdEtapas;
	iIdPlanGlobal = iIdPlan;
	iIdRQMGlobal = iIdRQM;
	//debugger;
	if (jsonTemporal.General != 0 && $(grid).children().length != 0) {
		CambiarHtmlJsonTemporal(jsonTemporal.General, (estaCambiandoPlan) ? iIdPlanPrev : iIdPlanGlobal, (estaCambiandoRqm) ? iIdRQMPrev : iIdRQMGlobal, (estaCambiandoProceso) ? iIdProcesoPrev : iIdProcesoGlobal)
		var plan = (estaCambiandoPlan) ? iIdPlanPrev : iIdPlanGlobal, rqm = (estaCambiandoRqm) ? iIdRQMPrev : iIdRQMGlobal, proceso = (estaCambiandoProceso) ? iIdProcesoPrev : iIdProcesoGlobal;
		GuardarWBS2(plan, rqm, proceso);
	}
	UsuariosToArray();
	if (iIdPlan != "" || iIdPlan != null) {
		$("#iIdPlan").prop("disabled", true);
		$("#iIdRequerimiento").prop("disabled", false);
		$("#agregarRqm").prop("disabled", false);
	}
	if (iIdRQM != "") {
		$("#iIdEtapas").prop("disabled", false);
		$("#agregarproceso").prop("disabled", false);
	}
	//GetOriginalEstimate();
	//debugger;
	if (iIdEtapas != "" && iIdEtapas != null && iIdRQM != "" && iIdRQM != null && iIdPlan != "" && iIdPlan != null) {
		if (iIdPlanPrev == "" && iIdRQMPrev == "") {
			iIdPlanPrev = iIdPlan;
			iIdRQMPrev = iIdRQM;
			iIdProcesoPrev = iIdEtapas;
			//AgregarPreview(iIdPlanPrev, iIdRQMPrev, iIdProcesoPrev);
		}
		else {
			//AgregarPreview(iIdPlanPrev, iIdRQMPrev, iIdProcesoPrev);
		}
		if (iIdEtapas == 4 && cambiar) {
			if (modoNormal) {
				var confirmacion = confirm("Se encuentra en el modo Normal, Si cambia a modo Híbrido, perdera toda su informacion, desea continuar?");
				if (confirmacion) {
					//$(jsonTemporal.General).each(function (index, domEle) {
					//    //debugger;
					//    if (domEle.iIdRequerimiento.indexOf(iIdRQM) != -1) {
					//        //domEle.pop();
					//        jsonTemporal.General.splice((index - cont), 1);
					//        cont++;
					//    }
					//});
					jsonTemporal.General = filtrarJsonTemporalParaHibrido(jsonTemporal.General, iIdPlan, iIdRQM);
					arrWBS = filtrarArrWBSByModo(arrWBS, iIdPlan, iIdRQM, "Normal");
					arrPreview = filtrarArrPreview(arrPreview, iIdPlan, iIdRQM);
					//GuardarWBS2();
					GenerarRowProcesos(iIdEtapas, iIdRQM, iIdPlan, true)
					//GenerarRowProcesos(1, iIdRQM, iIdPlan, true)
					//GenerarRowProcesos(2, iIdRQM, iIdPlan, true)
					//GenerarRowProcesos(3, iIdRQM, iIdPlan, true)
					//$("#ModalHibrido").modal("show");
					modoNormal = false;
					cont = 0;
					indiceGlobal = 0;
					cambiar = true;
				}
				else {
					cambiar = false;
					$("#iIdEtapas").val(iIdProcesoPrev).trigger("change");
					cambiar = true;
				}
			}
			else {
				GenerarRowProcesos(iIdEtapas, iIdRQM, iIdPlan, true)
				//GenerarRowProcesos(1, iIdRQM, iIdPlan, true)
				//GenerarRowProcesos(2, iIdRQM, iIdPlan, true)
				//GenerarRowProcesos(3, iIdRQM, iIdPlan, true)
				//$("#ModalHibrido").modal("show");
			}

		}
		else if (iIdEtapa != 4 && cambiar) {
			if (modoHibrido) {
				var confirmacion = confirm("Se encuentra en el modo Híbrido, Si cambia a modo Normal, perdera toda su informacion, desea continuar?");
				if (confirmacion) {
					$("#datatable_ajax tbody").html("");
					//$(jsonTemporal.General).each(function (index, domEle) {
					//    if (domEle.iIdRequerimiento.indexOf(iIdRQM) != -1) {
					//        //domEle.pop();
					//        jsonTemporal.General.splice((index - cont), 1);
					//        cont++;
					//    }
					//});
					//GuardarWBS2();
					jsonTemporal.General = filtrarJsonTemporalParaHibrido(jsonTemporal.General, iIdPlan, iIdRQM)
					arrWBS = filtrarArrWBSByModo(arrWBS, iIdPlan, iIdRQM, "Hibrido")
					arrPreview = filtrarArrPreview(arrPreview, iIdPlan, iIdRQM);
					GenerarRowProcesos(iIdEtapas, iIdRQM, iIdPlan, false);
					modoNormal = true;
					modoHibrido = false;
					cont = 0;
					indiceGlobal = 0;
					cambiar = true
				}
				else {
					cambiar = false;
					$("#iIdEtapas").val(iIdProcesoPrev).trigger("change");
					cambiar = true
				}
			}
			else {
				GenerarRowProcesos(iIdEtapas, iIdRQM, iIdPlan, false);
				modoNormal = true;
				cambia = true;
			}

		}

	}

}


//funcion para obtener las etapas(renombrado a Procesos) de la BD y ponerlos en la pagina por medio de un <select>
function obtenerEtapas() {
	var cEtapa;
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/Etapa",
		async: false,
		data: null,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			var temporal = response.d;
			temporal = temporal.replace(/'/g, "\"");
			cEtapa = JSON.parse(temporal);
			ArrProcesosGlobal = cEtapa;
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
		}
	});
	$(cEtapa.Proceso).each(function (index, domEle) {
		var elementoOption = $("<option class='form-control' value='" + domEle.iIdProceso + "'>" + domEle.cNombreProceso + "</option>");

		$("#iIdEtapas").append(elementoOption);

		procesoGlobal.push(domEle.iIdProceso);
		localStorage.Procesos = procesoGlobal;
	});
	$(ArrProcesosGlobal.Proceso).each(function (index, domEle) {
		if (domEle.cNombreProceso != "Hibrido") {
			var elementoOption = $("<option class='form-control' value='" + domEle.iIdProceso + "'>" + domEle.cNombreProceso + "</option>");
			$("#modalProcesos").append(elementoOption);
			var elementoModal = $("<tr><td>" + domEle.cNombreProceso + "</td>" +
                                    "<td>" +
                                    "<input type='number' id='RateGlobal_" + domEle.iIdProceso + "' value='0' min='0' step='1' class='form-control form-control-inline input-small'/>" +
                                    "</td></tr>");
			$("#tableModalRate").append(elementoModal);
		}
	});


	console.log(procesoGlobal);
	//$(cEtapa.split(',')).each(function (index, domEle) {
	//    var elementoOption = $("<option class='form-control' value='" + (index + 1) + "'>" + domEle + "</option>");
	//    $("#iIdEtapas").append(elementoOption);
	//    procesoGlobal.push(domEle);
	//});
}

//funcion para obtener los requerimientos de la BD y ponerlos en la pagina por medio de un <select>
function obtenerRequerimientos() {
	sProyecto = "PRUEBASIAC";
	sColeccion = "BLUEOCEAN";
	var cRequerimiento = "";
	var nombreRequerimiento = "";
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/Requerimiento",
		async: false,
		data: null,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			cRequerimiento = response.d;
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	if (cRequerimiento != "") {
		$(cRequerimiento.split(',')).each(function (index, domEle) {
			allRQM.push(parseInt(domEle));
			$.ajax({
				type: "POST",
				url: "../../Class/WBS.asmx/NombreRQM",
				async: false,
				data: '{"Id":"' + parseInt(domEle) + '", "sProyecto": "' + sProyecto + '", "sColeccion": "' + sColeccion + '"}',
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (response) {
					//debugger;
					//alert(response.d);
					nombreRequerimiento = response.d
					//AgregarRQMModal(parseInt(domEle), nombreRequerimiento);
					$("#txtModalRQM").val("");
				},
				error: function (xhr, estatus) {
					//alert("No existe ese requerimiento");
					Alertas(1, "Alerta", "No existe ese requerimiento")
				}
			});
			var elementoOption = $("<option class='form-control' value='" + domEle + "'>" + domEle + "-" + nombreRequerimiento + "</option>");
			$("#iIdRequerimiento").append(elementoOption);
			rqmGlobal.push(domEle);
			localStorage.Requerimientos = rqmGlobal;
		});
	}

}

//function obtenerSistemas() {
//    var cNombreSistema = "";
//    var cIdSistema = "";
//    $.ajax({
//        type: "POST",
//        url: "../../Class/WBS.asmx/ObtenerNombreSistemas",
//        async: false,
//        data: null,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            cNombreSistema = response.d;
//        }
//    });
//    $.ajax({
//        type: "POST",
//        url: "../../Class/WBS.asmx/ObtenerIdSistemas",
//        async: false,
//        data: null,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            cIdSistema = response.d;
//            cIdSistema = cIdSistema.split(',');
//        }
//    });
//    $(cNombreSistema.split(',')).each(function (index, domEle) {
//        //<a href='WBS.aspx'></a>

//        //a = cIdSistema[index];
//        var elementoOption = $("<li id='iIdSistema_" + cIdSistema[index] + "' onclick='obtenerModulos(" + cIdSistema[index] + ", " + domEle + ")'><a href='Modulos.aspx'><i class='icon-globe'></i><span class='title'>" + domEle + "</span></a></li>");
//        $("#menuSistemas").append(elementoOption);
//    });
//}
/*
function obtenerModulos(idSistema,nombreSistema) {
    sessionStorage.setItem("IdSistema", idSistema);
    sessionStorage.setItem("NombreSistema", nombreSistema);
    var cNombreModulo = "";
    var cIdModulo = "";
    $.ajax({
        type: "POST",
        url: "../../Class/WBS.asmx/ObtenerNombreModulos",
        async: false,
        data: "{'IdSistema': '" +idSistema+ "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            cNombreModulo = response.d;
        }
    });

    $.ajax({
        type: "POST",
        url: "../../Class/WBS.asmx/ObtenerIdModulos",
        async: false,
        data: "{'IdSistema': '" + idSistema + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            cIdModulo = response.d;
            cIdModulo = cIdModulo.split(',');
        }
    });
    $("#NombreSistema").text(sessionStorage.getItem("NombreSistema"))
    $(cNombreModulo.split(',')).each(function (index, domEle) {
        var elementoOption = $("<div class='col-lg-3 col-md-3 col-sm-6 col-xs-12' id='iIdModulo_" + cIdModulo[index] + "'>"
            + "		<div class='dashboard-stat2'>"
						+"<div class='display'>"
							+"<div class='number'>"
								+"<h3 class='font-red-haze'>"+cIdModulo[index]+"</h3>"
								+"<small>"+domEle+"</small>"
							+"</div>"
							+"<div class='icon'>"
								+"<i class='icon-like'></i>"
							+"</div>"
						+"</div>"
						+"<div class='progress-info'>"
							+"<div class='progress'>"
								+"<span style='width: 85%;' class='progress-bar progress-bar-success red-haze'>"
								+"<span class='sr-only'>85% change</span>"
								+"</span>"
							+"</div>"
							+"<div class='status'>"
								+"<div class='status-title'>"
									 +"change"
								+"</div>"
								+"<div class='status-number'>"
									 +"85%"
								+"</div>"
							+"</div>"
						+"</div>"
					+"</div>"
				+ "</div>");
        $("#Modulos").append(elementoOption);
    });
}*/

function ConfiguracionGlobal() {
	var horas = $("#txtModalHoras").val();
	$("#ModalConfiguracionGlobal").modal("hide");
	//console.log(horas);
	AplicarRateGlobal();
}

var rateAnalisis, rateDiseño, rateDesarrollo;
function AplicarRateGlobal() {
	//debugger;
	var rates = $("input[id^=RateGlobal]");
	rateAnalisis = parseFloat($(rates[0]).val());
	rateDiseño = parseFloat($(rates[1]).val());
	rateDesarrollo = parseFloat($(rates[2]).val());
	switch (iIdProcesoGlobal) {
		case "1":
			var temp = $("tr.primary")
			$(temp).each(function (index, domEle) {
				$(domEle).find("input[id^=iIdRate_]").val(rateAnalisis).trigger("change");
			});
			break;
		case "2":
			var temp = $("tr.primary")
			$(temp).each(function (index, domEle) {
				$(domEle).find("input[id^=iIdRate_]").val(rateDiseño).trigger("change");
			});
			break;
		case "3":
			var temp = $("tr.primary")
			$(temp).each(function (index, domEle) {
				$(domEle).find("input[id^=iIdRate_]").val(rateDesarrollo).trigger("change");
			});
			break;
		case "4":
			var temp = $("tr.primary")
			$(temp).each(function (index, domEle) {
				if ($(domEle).find("input[id^=iIdDetalleProceso_]").attr("id").split("_")[1] == 4) {
					$(domEle).find("input[id^=iIdRate_]").val(rateAnalisis).trigger("change");
				}
				else if ($(domEle).find("input[id^=iIdDetalleProceso_]").attr("id").split("_")[1] == 21) {
					$(domEle).find("input[id^=iIdRate_]").val(rateDiseño).trigger("change");
				}
				else if ($(domEle).find("input[id^=iIdDetalleProceso_]").attr("id").split("_")[1] == 36) {
					$(domEle).find("input[id^=iIdRate_]").val(rateDesarrollo).trigger("change");
				}
			});
			break;
	}
}

function GuardarWBSAntiguo() {
	//var comparador = $('input[id*="iIdComponent"]');
	jsonTemporal.General[indiceGlobal].users = [];
	var guardado = false;
	var esCampoVacio = 0;
	var tabla;
	var NodoHijo;
	var comparador = $('#datatable_ajax tbody tr');
	var arrayDatos = new Array();
	var lstCompo = "";
	var componente = "";
	var iIdTitle;
	var cWorkItem;
	var iIdUsuario;
	var dReamining;
	var dOriginal;
	var dTiempoTotal;
	var dPorcentajeTareas;
	var dTamanios;
	var dRate;
	var dValorGanado;
	var iSemana;
	var dValorAcumulado;
	var dValorSemanal;
	var cTipoTarea;
	var cUnidadMedida;
	var dtFechaInicio;
	var iIdWBS;
	var dtAlta = new Date();
	dtAlta = dtAlta.getFullYear() + "-" + (((dtAlta.getMonth() + 1) < 10 ? '0' : '') + (dtAlta.getMonth() + 1)) + "-" + dtAlta.getDate() + " " + dtAlta.getHours() + ":" + dtAlta.getMinutes() + ":" + dtAlta.getSeconds() + "." + dtAlta.getMilliseconds();
	var idReq = $('#iIdRequerimiento :selected').val();
	var idProceso = $('#iIdEtapas :selected').val();
	var idPlan = $("#iIdPlan :selected").val();
	var tjson = jsonTemporal.General[indiceGlobal];
	var jsonWBS = new Array();
	var linsert = false;
	//debugger;
	if (comparador.length > tjson.longitud) {
		var contadorUpdate = tjson.longitud;
		var contadorInsert = comparador.length - tjson.longitud;
		linsert = true;
	}
	//console.log(dtAlta);
	//$('input[id*="iIdComponent"]').each(function (index, domEle) {

	if (idReq != "" && idProceso != "" && idPlan != "") {
		comparador.each(function (index, domEle) {
			//debugger;
			//if (index > 0) {
			//console.log(domEle);
			tabla = domEle.children;
			//console.log(tabla);
			for (var i = 1 ; i < tabla.length; i++) {
				var tHoraServidor = new Date();
				NodoHijo = tabla[i].children;
				//console.log(NodoHijo.selected);
				switch (i) {
					//case 1:
					//    var plan = $(NodoHijo).val();
					//    //console.log(componente);
					//    break;
					case 1:
						componente = $(NodoHijo).val();
						//console.log(componente);
						break;
					case 4:
						iIdTitle = $(NodoHijo).attr('id');
						iIdTitle = iIdTitle.replace('iIdDetalleProceso_', '');
						//console.log(iIdTitle);
						break;
					case 5:
						cWorkItem = $(NodoHijo).val();
						//console.log(cWorkItem);
						break;
					case 6:
						//var valor = $(NodoHijo).val();
						iIdUsuario = $(NodoHijo).find("option:selected").val();
						//console.log(iIdUsuario);
						if (iIdUsuario == "" || iIdUsuario == null) {
							esCampoVacio++;
						}
						else {
							jsonTemporal.General[indiceGlobal].users.push(iIdUsuario);
						}
						break;
					case 7:
						dReamining = $(NodoHijo).val();
						//console.log(dReamining);
						break;
					case 8:
						dOriginal = $(NodoHijo).val();
						//console.log(dOriginal);
						break;
					case 9:
						dTiempoTotal = $(NodoHijo).val();
						//console.log(dTiempoTotal);
						break;
					case 10:
						dPorcentajeTareas = $(NodoHijo).val();
						//console.log(dPorcentajeTareas);
						break;
					case 11:
						dTamanios = $(NodoHijo).val();
						//console.log(dTamanios);
						break;
					case 12:
						dRate = $(NodoHijo).val();
						//console.log(dRate);
						break;
					case 13:
						dValorGanado = $(NodoHijo).val();
						//console.log(dValorGanado);
						break;
					case 14:
						iSemana = $(NodoHijo).val();
						//console.log(iSemana);
						break;
					case 15:
						dValorAcumulado = $(NodoHijo).val();
						//console.log(dValorAcumulado);
						break;
					case 16:
						dValorSemanal = $(NodoHijo).val();
						//console.log(dValorSemanal);
						break;
					case 3:
						cTipoTarea = $(NodoHijo).val();
						//console.log(cTipoTarea);
						break;
					case 17:
						cUnidadMedida = $(NodoHijo).val();
						//console.log(cUnidadMedida);
						break;
					case 18:
						//dtFechaInicio = $(this).getItem(i).text();
						dtFechaInicio = $(NodoHijo).find("input").val();
						if (dtFechaInicio != "") {
							tHoraServidor = tHoraServidor.getHours() + ":" + tHoraServidor.getMinutes() + ":" + tHoraServidor.getSeconds() + "." + tHoraServidor.getMilliseconds();
							dtFechaInicio = dtFechaInicio + " " + tHoraServidor;
							//console.log(tHoraServidor);
						} else {
							esCampoVacio++;
							return false;
						}
						//dtFechaInicio = dtFechaInicio.replace(" a. m.", "");
						//dtFechaInicio = dtFechaInicio.replace(" p. m.", "");
						//for (var i = 0; i < dtFechaInicio.length; i++) {
						//    if(dtFechaInicio.indexOf('/') >= 0){
						//        dtFechaInicio = dtFechaInicio.replace("/", "-");
						//    }
						//}
						break;
					case 20:
						iIdWBS = $(NodoHijo).val();
						break;
				}
			}
			//tHoraServidor = tHoraServidor.getDate() + "-" + tHoraServidor.getMonth()
			jsonWBS.push({
				iIdUsuario: iIdUsuario,
				iIdDetalleProceso: iIdTitle,
				iRequerimiento: idReq,
				cWork_Item_Type: cWorkItem,
				iIdProcesos: idProceso,
				dRemaining_Work: dReamining,
				dOriginal_Estimate: dOriginal,
				dTiempo_Total_del_proceso: dTiempoTotal,
				dPorcentaje_de_tareas: dPorcentajeTareas,
				dtamanios: dTamanios,
				dRate: dRate,
				dValor_ganado: dValorGanado,
				isemana: iSemana,
				dValor_ganado_acumulado: dValorAcumulado,
				dValor_ganado_semanal: dValorSemanal,
				cTipo_de_tarea: cTipoTarea,
				cUnidad_de_medida: cUnidadMedida,
				dtFecha_de_inicio: dtFechaInicio,
				dtHoras_Acumuladas: dtFechaInicio,
				dtModificacion: dtFechaInicio,
				dtAlta: dtAlta,
				lActivo: true,
				iIdPlan: idPlan,
				lTFS: false,
				iIdTFS: 1,
				//iIdWBS: iIdWBS
			});
			//console.log(jsonWBS);
			//}
		});
		if (esCampoVacio > 0) {
			//alert("No se puede continuar hay campos vacios");
			Alertas(1, "Alerta", "No se puede continuar hay campos vacios")
		}
		else {
			//debugger;
			//if (linsert) {
			//    var longi = jsonWBS.length;
			//    var insertJson = new Array();
			//    for (var i = 0; i < contadorInsert; i++) {
			//        insertJson.push(jsonWBS.pop());
			//    }
			//    insertJson.reverse();
			//}
			//if (jsonTemporal.General[indiceGlobal].guardado) {



			localStorage.setItem("Guardado_" + idReq + "_" + idProceso + "_" + idPlan, JSON.stringify(jsonWBS));
			if (localStorage.getItem("Guardado_" + idReq + "_" + idProceso + "_" + idPlan) != "") {
				//alert("Sus datos han sido guardados");
				Alertas(0, "Operacion Exitosa", "Sus datos han sido guardados")
				jsonTemporal.General[indiceGlobal].htmlText = $("#datatable_ajax tbody").html();
				jsonTemporal.General[indiceGlobal].guardado = true;
				jsonTemporal.General[indiceGlobal].longitud = longi;
			}



			//$.ajax({
			//    url: "../../Class/WBS.asmx/UpdateWBS",
			//    method: "POST",
			//    async: false,
			//    data: JSON.stringify({ obj: jsonWBS }),
			//    datatype: "json",
			//    contentType: "application/json",
			//    success: function (respJson) {
			//        //alert("Se han Guardado los datos");
			//        //GenerarRowProcesos(jsonWBS[1].iIdEtapa, jsonWBS[1].iRequerimiento, jsonWBS[1].iIdPlan, esAgregado);
			//        jsonWBS = insertJson;
			//        estaGuardado = true;
			//        contPlan = 0;
			//        //changePlan();
			//        jsonTemporal.General[indiceGlobal].longitud = longi;
			//    },
			//    error: function (xhr, estatus) {
			//        estaGuardado = false;
			//    }
			//});
			//}


			if (linsert || !jsonTemporal.General[indiceGlobal].guardado) {
				//    $.ajax({
				//        url: "../../Class/WBS.asmx/GuardarWBS",
				//        method: "POST",
				//        async: false,
				//        data: JSON.stringify({ obj: jsonWBS }),
				//        datatype: "json",
				//        contentType: "application/json",
				//        success: function (respJson) {

				//            //GenerarRowProcesos(insertJson[1].iIdEtapa, insertJson[1].iRequerimiento, insertJson[1].iIdPlan, esAgregado);
				//            estaGuardado = true;
				//            contPlan = 0;
				//            //changePlan();
				//        },
				//        error: function (xhr, estatus) {
				//            estaGuardado = false;
				//        }
				//    });
				//}
				//if (estaGuardado) {
				//    alert("Se han Guardado los datos");
				//    jsonTemporal.General[indiceGlobal].htmlText = $("#datatable_ajax tbody").html();
				//    jsonTemporal.General[indiceGlobal].guardado = true;
				//    comprobacionJson = false;
				//    acabadeguardar = true;
				//    RegistroNuevo = false;
				//    $("#iIdPlan").html("");
				//    obtenerPlan();
				//    debugger;
				//    GenerarRowProcesos(idProceso, idReq, idPlan, esAgregado);
			}

		}


	} else {
		//alert("Seleccione un Requerimiento y una Etapa");
		Alertas(1, "Alerta", "Seleccione un Requerimiento y una Etapa")
	}
}

function GuardarWBS() {
	GuardarWBS2(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
	var jsonWBS = new Array();
	var arrTemp = new Array();
	var raizGuardada = false;
	var filas = $("tr[class*=primary]");
	var contDetProceso = 1;
	var contProceso = 1;
	var estaGuardando = false;
	var maxGrupo = ObtenerMaxGrupo() + 1;
	var maxFolio = ObtenerMaxFolioPlan(iIdPlanGlobal) + 1;
	jsonWBS = { Guardar: [], Actualizar: [] }
	var dtAlta = new Date().toISOString().split("T")[0];
	$(arrWBS).each(function (indexRaiz, domEleRaiz) {
		$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
			if (domEleRaiz.Modo == "Hibrido" && !raizGuardada) {
				if (domEleRaiz.elementos.Raiz[0].estaGuardado == 0) {
					estaGuardando = true;
					jsonWBS.Guardar.push({
						iIdUsuario: domEleRaiz.elementos.Raiz[0].iIdUsuario,
						iIdDetalleProceso: domEleRaiz.elementos.Raiz[0].iIdDetalleProceso,
						iRequerimiento: domEleRaiz.iIdRequerimiento,
						cWork_Item_Type: domEleRaiz.elementos.Raiz[0].cWork_Item_Type,
						iIdProcesos: domEleRaiz.elementos.Raiz[0].iIdProceso,
						iTipoElemento: domEleRaiz.elementos.Raiz[0].iTipoElemento,
						dRemaining_Work: domEleRaiz.elementos.Raiz[0].dRemaining_Work,
						dOriginal_Estimate: domEleRaiz.elementos.Raiz[0].dOriginal_Estimate,
						dTiempo_Total_del_proceso: domEleRaiz.elementos.Raiz[0].dTiempo_Total_del_proceso,
						dPorcentaje_de_tareas: domEleRaiz.elementos.Raiz[0].dPorcentaje_de_tareas,
						dtamanios: domEleRaiz.elementos.Raiz[0].dtamanios,
						dRate: domEleRaiz.elementos.Raiz[0].dRate,
						dValor_ganado: domEleRaiz.elementos.Raiz[0].dValor_ganado,
						isemana: domEleRaiz.elementos.Raiz[0].isemana,
						dValor_ganado_acumulado: 0,
						dValor_ganado_semanal: 0,
						cTipo_de_tarea: domEleRaiz.elementos.Raiz[0].cTipo_de_tarea,
						cUnidad_de_medida: domEleRaiz.elementos.Raiz[0].cUnidad_de_medida,
						dtFecha_de_inicio: domEleRaiz.elementos.Raiz[0].dtFecha_de_inicio,
						dtFechaFinal: domEleRaiz.elementos.Raiz[0].dtFechaFinal,
						dtHoras_Acumuladas: dtAlta,
						dtModificacion: dtAlta,
						dtAlta: dtAlta,
						lActivo: true,
						iIdPlan: domEleRaiz.iIdPlan,
						lTFS: false,
						iIdTFS: domEleRaiz.elementos.Raiz[0].iIdTFS,
						iIdWBS: maxFolio,
						iGrupo: maxGrupo,
						cTituloProceso: domEleRaiz.elementos.Raiz[0].cTituloProceso,
						iOrdenDetalleProceso: contDetProceso,
						iOrdenProceso: contProceso
					});
					domEleRaiz.elementos.Raiz[0].iIdWBS = maxFolio
					domEleRaiz.elementos.Raiz[0].iGrupo = maxGrupo
					maxFolio++;
					contProceso++;
				}
				else {
					estaGuardando = false;
					jsonWBS.Actualizar.push({
						iIdUsuario: domEleRaiz.elementos.Raiz[0].iIdUsuario,
						iIdDetalleProceso: domEleRaiz.elementos.Raiz[0].iIdDetalleProceso,
						iRequerimiento: domEleRaiz.iIdRequerimiento,
						cWork_Item_Type: domEleRaiz.elementos.Raiz[0].cWork_Item_Type,
						iIdProcesos: domEleRaiz.elementos.Raiz[0].iIdProceso,
						iTipoElemento: domEleRaiz.elementos.Raiz[0].iTipoElemento,
						dRemaining_Work: domEleRaiz.elementos.Raiz[0].dRemaining_Work,
						dOriginal_Estimate: domEleRaiz.elementos.Raiz[0].dOriginal_Estimate,
						dTiempo_Total_del_proceso: domEleRaiz.elementos.Raiz[0].dTiempo_Total_del_proceso,
						dPorcentaje_de_tareas: domEleRaiz.elementos.Raiz[0].dPorcentaje_de_tareas,
						dtamanios: domEleRaiz.elementos.Raiz[0].dtamanios,
						dRate: domEleRaiz.elementos.Raiz[0].dRate,
						dValor_ganado: domEleRaiz.elementos.Raiz[0].dValor_ganado,
						isemana: domEleRaiz.elementos.Raiz[0].isemana,
						dValor_ganado_acumulado: 0,
						dValor_ganado_semanal: 0,
						cTipo_de_tarea: domEleRaiz.elementos.Raiz[0].cTipo_de_tarea,
						cUnidad_de_medida: domEleRaiz.elementos.Raiz[0].cUnidad_de_medida,
						dtFecha_de_inicio: domEleRaiz.elementos.Raiz[0].dtFecha_de_inicio,
						dtFechaFinal: domEleRaiz.elementos.Raiz[0].dtFechaFinal,
						dtHoras_Acumuladas: dtAlta,
						dtModificacion: dtAlta,
						dtAlta: dtAlta,
						lActivo: true,
						iIdPlan: domEleRaiz.iIdPlan,
						lTFS: false,
						iIdTFS: domEleRaiz.elementos.Raiz[0].iIdTFS,
						iIdWBS: domEleRaiz.elementos.Raiz[0].iIdWBS,
						cTituloProceso: domEleRaiz.elementos.Raiz[0].cTituloProceso,
						iOrdenDetalleProceso: contDetProceso,
						iOrdenProceso: contProceso
					});
					contProceso++
				}
				maxGrupo = (estaGuardando) ? maxGrupo + 1 : maxGrupo;
				raizGuardada = true;
			}
			//contFolioWBS = ObtenerMaxFolioPlan(iIdPlanGlobal);
			$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
				if (domEleHijos.elementos[0].estaGuardado == 0) {
					estaGuardando = true;
					jsonWBS.Guardar.push({
						iIdUsuario: domEleHijos.elementos[0].iIdUsuario,
						iIdDetalleProceso: domEleHijos.elementos[0].iIdDetalleProceso,
						iRequerimiento: domEleRaiz.iIdRequerimiento,
						cWork_Item_Type: domEleHijos.elementos[0].cWork_Item_Type,
						iIdProcesos: domElementos.iIdProceso,
						iTipoElemento: domEleHijos.elementos[0].iTipoElemento,
						dRemaining_Work: domEleHijos.elementos[0].dRemaining_Work,
						dOriginal_Estimate: domEleHijos.elementos[0].dOriginal_Estimate,
						dTiempo_Total_del_proceso: domEleHijos.elementos[0].dTiempo_Total_del_proceso,
						dPorcentaje_de_tareas: domEleHijos.elementos[0].dPorcentaje_de_tareas,
						dtamanios: domEleHijos.elementos[0].dtamanios,
						dRate: domEleHijos.elementos[0].dRate,
						dValor_ganado: domEleHijos.elementos[0].dValor_ganado,
						isemana: domEleHijos.elementos[0].isemana,
						dValor_ganado_acumulado: 0,
						dValor_ganado_semanal: 0,
						cTipo_de_tarea: domEleHijos.elementos[0].cTipo_de_tarea,
						cUnidad_de_medida: domEleHijos.elementos[0].cUnidad_de_medida,
						dtFecha_de_inicio: domEleHijos.elementos[0].dtFecha_de_inicio,
						dtFechaFinal: domEleHijos.elementos[0].dtFechaFinal,
						dtHoras_Acumuladas: dtAlta,
						dtModificacion: dtAlta,
						dtAlta: dtAlta,
						lActivo: true,
						iIdPlan: domEleRaiz.iIdPlan,
						lTFS: false,
						iIdTFS: domEleHijos.elementos[0].iIdTFS,
						iIdWBS: maxFolio,
						iGrupo: maxGrupo,
						cTituloProceso: domEleHijos.elementos[0].cTituloProceso,
						iOrdenDetalleProceso: indexHijos + 1,
						iOrdenProceso: contProceso
					});
					domEleHijos.elementos[0].iIdWBS = maxFolio
					domEleHijos.elementos[0].iGrupo = maxGrupo
					maxFolio++;
				}
				else {
					estaGuardando = false;
					jsonWBS.Actualizar.push({
						iIdUsuario: domEleHijos.elementos[0].iIdUsuario,
						iIdDetalleProceso: domEleHijos.elementos[0].iIdDetalleProceso,
						iRequerimiento: domEleRaiz.iIdRequerimiento,
						cWork_Item_Type: domEleHijos.elementos[0].cWork_Item_Type,
						iIdProcesos: domElementos.iIdProceso,
						iTipoElemento: domEleHijos.elementos[0].iTipoElemento,
						dRemaining_Work: domEleHijos.elementos[0].dRemaining_Work,
						dOriginal_Estimate: domEleHijos.elementos[0].dOriginal_Estimate,
						dTiempo_Total_del_proceso: domEleHijos.elementos[0].dTiempo_Total_del_proceso,
						dPorcentaje_de_tareas: domEleHijos.elementos[0].dPorcentaje_de_tareas,
						dtamanios: domEleHijos.elementos[0].dtamanios,
						dRate: domEleHijos.elementos[0].dRate,
						dValor_ganado: domEleHijos.elementos[0].dValor_ganado,
						isemana: domEleHijos.elementos[0].isemana,
						dValor_ganado_acumulado: 0,
						dValor_ganado_semanal: 0,
						cTipo_de_tarea: domEleHijos.elementos[0].cTipo_de_tarea,
						cUnidad_de_medida: domEleHijos.elementos[0].cUnidad_de_medida,
						dtFecha_de_inicio: domEleHijos.elementos[0].dtFecha_de_inicio,
						dtFechaFinal: domEleHijos.elementos[0].dtFechaFinal,
						dtHoras_Acumuladas: dtAlta,
						dtModificacion: dtAlta,
						dtAlta: dtAlta,
						lActivo: true,
						iIdPlan: domEleRaiz.iIdPlan,
						lTFS: false,
						iIdTFS: domEleHijos.elementos[0].iIdTFS,
						iIdWBS: domEleHijos.elementos[0].iIdWBS,
						cTituloProceso: domEleHijos.elementos[0].cTituloProceso,
						iOrdenDetalleProceso: indexHijos + 1,
						iOrdenProceso: contProceso
					});
				}
				contDetProceso++;
			});
			maxGrupo = (estaGuardando) ? maxGrupo + 1 : maxGrupo;
			contProceso++;
		});
	});
	var contFilas = 0;
	if (jsonWBS.Actualizar.length != 0) {
		$.ajax({
			url: "../../Class/WBS.asmx/UpdateWBS",
			method: "POST",
			async: false,
			data: JSON.stringify({ obj: jsonWBS.Actualizar }),
			datatype: "json",
			contentType: "application/json",
			success: function (respJson) {
				$(respJson.d).each(function (index, domEle) {
					arrTemp.push(domEle)
				})
				//alert("Se han Guardado los datos");
				//GenerarRowProcesos(jsonWBS[1].iIdEtapa, jsonWBS[1].iRequerimiento, jsonWBS[1].iIdPlan, esAgregado);
				//jsonWBS = insertJson;
				estaGuardado = true;
				contPlan = 0;
				//changePlan();
				//jsonTemporal.General[indiceGlobal].longitud = longi;
				//contFilas = jsonWBS.Actualizar.length - 1;
				Alertas(0, "Datos Actualizados", "Los datos han sido actualizados correctamente")
			},
			error: function (xhr, estatus) {
				estaGuardado = false;
			}
		});
	}
	if (jsonWBS.Guardar.length != 0) {
		$.ajax({
			url: "../../Class/WBS.asmx/GuardarWBS",
			method: "POST",
			async: false,
			data: JSON.stringify({ obj: jsonWBS.Guardar }),
			datatype: "json",
			contentType: "application/json",
			success: function (respJson) {
				//$(respJson.d).each(function (index, domEle) {
				//	arrTemp.push(domEle)
				//})


				//$(arrWBS).each(function (indexRaiz, domEleRaiz) {
				//	$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
				//		$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
				//			domEleHijos.elementos[0].iIdWBS = respJson.d[cont].iIdWBS
				//			if (domEleRaiz.iIdPlan == iIdPlanGlobal && domEleRaiz.iIdRequerimiento == iIdRQMGlobal && domEleRaiz.Modo == "Normal") {
				//				if (domElementos.iIdProceso == iIdProcesoGlobal) {
				//					$(filas[contFilas]).find("[id*=iIdWBS_]").val(respJson.d[cont].iIdWBS)
				//				}
				//			}
				//			cont++;
				//		}) 
				//	}) 
				//})
				//$(filas).each(function (index, domEle) {
				//	if (index > contFilas || contFilas == 0) {
				//		$(domEle).find("[id*=iIdWBS_]").val(respJson.d[cont].iIdWBS)
				//		cont++;
				//	}
				//});

				Alertas(0, "Datos Guardados", "Los datos han sido guardados correctamente")
			},
			error: function (xhr, estatus) {
				Alertas(2, "Error", "Ocurrio un error, los datos no fueron guardados")
			}
		});
	}
	
	$(arrWBS).each(function (indexRaiz, domEleRaiz) {
		if (domEleRaiz.iIdPlan == iIdPlanGlobal && domEleRaiz.iIdRequerimiento == iIdRQMGlobal && domEleRaiz.Modo != "Normal") {
			domEleRaiz.elementos.Raiz[0].estaGuardado = 1;
			$(".raiz").find("[id*=iIdWBS_]").val(domEleRaiz.elementos.Raiz[0].iIdWBS).trigger("change")
			$(".raiz").find("[id*=estaGuardado_]").val(1).trigger("change")
			$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
				$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
					domEleHijos.elementos[0].estaGuardado = 1;
					if (domElementos.iIdProceso == 1 || domElementos.iIdProceso == 2 || domElementos.iIdProceso == 3) {
						$(filas[contFilas]).find("[id*=estaGuardado_]").val(1).trigger("change");
						$(filas[contFilas]).find("[id*=iIdWBS_]").val(domEleHijos.elementos[0].iIdWBS).trigger("change")
						contFilas++;
					}
					//cont++;
				})
			})
		}
		else {
			$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
				$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
					domEleHijos.elementos[0].estaGuardado = 1;
					if (domElementos.iIdProceso == iIdProcesoGlobal) {
						$(filas[contFilas]).find("[id*=estaGuardado_]").val(1).trigger("change");
						$(filas[contFilas]).find("[id*=iIdWBS_]").val(domEleHijos.elementos[0].iIdWBS).trigger("change")
						contFilas++;
					}
					//cont++;
				})
			})
		}
		
	})

}

function ObtenerMaxGrupo() {
	var maxGrupo;
	$.ajax({
		url: "../../Class/WBS.asmx/ObtenerMaxGrupo",
		method: "POST",
		async: false,
		data: null,
		datatype: "json",
		contentType: "application/json",
		success: function (respJson) {
			maxGrupo = respJson.d;
		},
		error: function (xhr, estatus) {
			Alertas(2, "Error", "Error en la carga de datos");
		}
	});
	return maxGrupo;
}

function ObtenerMaxFolioPlan() {
	var maxFolioPlan;
	$.ajax({
		url: "../../Class/WBS.asmx/ObtenerMaxFolioPlan",
		method: "POST",
		async: false,
		data: '{"plan": ' + iIdPlanGlobal + '}',
		datatype: "json",
		contentType: "application/json",
		success: function (respJson) {
			maxFolioPlan = respJson.d;
		},
		error: function (xhr, estatus) {
			Alertas(2, "Error", "Error en la carga de datos");
		}
	});
	return maxFolioPlan;
}

var arrWBS = new Array();
var contWBS = 0;
var jsonWbsTemp = new Array();
var arrWbsFiltrado = new Array();
var contFolioWBS = 0;
var contFolioWBSCopia = 0;
var arrRaizHibrido = new Array();
function GuardarWBS2(plan, rqm, proceso) {
	//jsonWbsTemp = null;
	arrWbsFiltrado = new Array();
	var iIdProceso;
	var elementos = $("#datatable_ajax tbody tr");
	var esHibrido = false;
	var objProcesos = $(".primary");
	var raiz = $(".raiz");
	var existe = false;
	var indice;
	var dtAlta = new Date().toISOString().split("T")[0];
	
	$(arrWBS).each(function (indexRaiz, domEleRaiz) {
		if (domEleRaiz.iIdPlan == plan && domEleRaiz.iIdRequerimiento == rqm && domEleRaiz.Modo == "Normal") {
			if (domEleRaiz.elementos[0].iIdProceso == proceso) {
				indice = indexRaiz;
			}
		}
		else if (domEleRaiz.iIdPlan == plan && domEleRaiz.iIdRequerimiento == rqm && domEleRaiz.Modo == "Hibrido") {
			indice = indexRaiz;
		}
	});
	if (indice == undefined) {
		if (raiz.length != 0) {
			arrWBS.push({
				iIdRequerimiento: rqm,
				iIdPlan: plan,
				Modo: "Hibrido",
				elementos: new Array(),
			});
			esHibrido = true;
			contWBS = arrWBS.length - 1;
			
			arrRaizHibrido.push({
				iIdUsuario: arrUser[0].teamMember.id,
				cNombreUsuario: arrUser[0].teamMember.displayName.split("<")[0].trim(),
				cNombreDetalleProceso: $("#NombreRaiz").val(),
				iIdDetalleProceso: $(raiz).find("[id^=iIdDetalleProceso]").attr("id").split("_")[1],
				iRequerimiento: rqm,
				cWork_Item_Type: 0,
				iIdProceso: 4,
				dRemaining_Work: 0,
				dOriginal_Estimate: 0,
				dTiempo_Total_del_proceso: 0,
				dPorcentaje_de_tareas: 0,
				dtamanios: 0,
				dRate: 0,
				dValor_ganado: 0,
				isemana: 0,
				//dValor_ganado_acumulado: $("#iIdValorGanadoAcumulado_" + noFila).val(),
				//dValor_ganado_semanal: $("#iIdValorGanadoSemanal_" + noFila).val(),
				cTipo_de_tarea: 0,
				cUnidad_de_medida: 0,
				dtFecha_de_inicio: $(raiz).find("[id^=Fecha]").val(),
				dtFechaFinal: $(raiz).find("[id^=FechaFinal]").val(),
				//dtHoras_Acumuladas: $("#iIdUsuario" + noFila).val(),
				//dtModificacion: $("#iIdUsuario" + noFila).val(),
				dtAlta: dtAlta,
				lActivo: true,
				//iIdPlan: idPlan,
				//lTFS: false,
				iIdTFS: $(raiz).find("[id*=iIdTFS_]").val(),
				iIdWBS: $(raiz).find("[id*=iIdWBS_]").val(),
				iTipoElemento: 3,
				cTituloProceso: $("#NombreRaiz").val(),
				iGrupo: $(raiz).find("[id*=iGrupo_]").val(),
				lAplicaMultiProceso: 0,
				estaGuardado: $(raiz).find("[id*=estaGuardado_]").val()
			});
			//arrWBS[contWBS].elementos[index].Hijos.push({
			//	index: 0,
			//	elementos: arrTempWBS
			//});
		}
		else {
			arrWBS.push({
				iIdRequerimiento: rqm,
				iIdPlan: plan,
				Modo: "Normal",
				elementos: new Array()
			});
			contWBS = arrWBS.length - 1;
		}
		$(objProcesos).each(function (index, elemento) {
			//debugger;
			var nombreProceso = $(elemento).find("td input[id*=iIdDetalleProceso]").attr("name");
			switch (nombreProceso) {
				case "Análisis":
					iIdProceso = 1;
					break;
				case "Diseño":
					iIdProceso = 2;
					break;
				case "Desarrollo":
					iIdProceso = 3;
					break;
			};
			if (esHibrido) {
				arrWBS[contWBS].elementos.push({
					iIdProceso: iIdProceso,
					Hijos: new Array(),
					cTituloProceso: $(elemento).find("td input[id*=iIdDetalleProceso]").val()
				});
			}
			else {
				arrWBS[contWBS].elementos.push({
					iIdProceso: iIdProceso,
					Hijos: new Array(),
					cTituloProceso: $(elemento).find("td input[id*=iIdDetalleProceso]").val()
				});
			}
			var Nombre = $(elemento).attr("name");
			var Padre = Nombre.split("_")[1];
			var todasFilas = document.querySelectorAll("tr[name$=_" + Padre + "]");
			$(todasFilas).each(function (index2, elemento2) {
				//if (index2 != 0) {
				if (esHibrido) {
					arrWBS[contWBS].elementos[index].Hijos.push({
						index: index2 +1,
						elementos: RecorrerFila(elemento2, plan, rqm, proceso, esHibrido)
					});
				}
				else {
					arrWBS[contWBS].elementos[index].Hijos.push({
						index: index2,
						elementos: RecorrerFila(elemento2, plan, rqm, proceso, esHibrido)
					});
				}

				//}
			});
		});
		if (esHibrido) {
			arrWBS[contWBS].elementos.Raiz = arrRaizHibrido;
			arrRaizHibrido = new Array();
		}
		console.log(arrWBS);
		console.log(jsonWbsTemp);
		//contWBS++;
		jsonWbsTemp.push({
			plan: plan,
			rqm: rqm,
			proceso: proceso,
		})
	}
	else {
		ActualizarJsonWBS(plan, rqm, proceso, indice);

	}
}

function RecorrerFila(fila, plan, rqm, proceso, eshibrido) {
	var noFila = $(fila.children[1].children).attr("id").split("_")[1];
	var dtAlta = new Date();
	dtAlta = dtAlta.getFullYear() + "-" + (((dtAlta.getMonth() + 1) < 10 ? '0' : '') + (dtAlta.getMonth() + 1)) + "-" + dtAlta.getDate() + " " + dtAlta.getHours() + ":" + dtAlta.getMinutes() + ":" + dtAlta.getSeconds() + "." + dtAlta.getMilliseconds();
	if ($(fila).find("[id*=iIdWBS_]").val() == 0) {
		$(fila).find("[id*=iIdWBS_]").val(contFolioWBS).trigger("change");
		contFolioWBS++
	}
	var arrTempWBS = new Array();
	arrTempWBS.push({
		iIdUsuario: $(fila).find("[id*=iIdUsuario]").val(),
		cNombreUsuario: $(fila).find("[id*=iIdUsuario] option:selected").text(),
		cNombreDetalleProceso: $(fila).find("[id^=iIdDetalleProceso]").val(),
		iIdDetalleProceso: $(fila).find("[id^=iIdDetalleProceso]").attr("id").split("_")[1],
		iRequerimiento: rqm,
		cWork_Item_Type: $(fila).find("[id*=iIdWork_]").val(),
		//iIdProcesos: $("#iIdUsuario" + noFila).val(),
		dRemaining_Work: $(fila).find("[id*=Remaining_]").val(),
		dOriginal_Estimate: $(fila).find("[id*=iIdEstimate_]").val(),
		dTiempo_Total_del_proceso: $(fila).find("[id*=iIdTotalProceso_]").val(),
		dPorcentaje_de_tareas: $(fila).find("[id*=iIdPorcentajeTareas_]").val(),
		dtamanios: $(fila).find("[id*=iIdTamano_]").val(),
		dRate: $(fila).find("[id*=iIdRate_]").val(),
		dValor_ganado: $(fila).find("[id*=iIdValorGanado_]").val(),
		isemana: $(fila).find("[id*=iIdSemana_]").val(),
		//dValor_ganado_acumulado: $("#iIdValorGanadoAcumulado_" + noFila).val(),
		//dValor_ganado_semanal: $("#iIdValorGanadoSemanal_" + noFila).val(),
		cTipo_de_tarea: $(fila).find("[id*=iIdTipoTarea_]").val(),
		cUnidad_de_medida: $(fila).find("[id*=iIdUnidadMedida_]").val(),
		dtFecha_de_inicio: $(fila).find("[id^=Fecha]").val(),
		dtFechaFinal: $(fila).find("[id^=FechaFinal]").val(),
		//dtHoras_Acumuladas: $("#iIdUsuario" + noFila).val(),
		//dtModificacion: $("#iIdUsuario" + noFila).val(),
		dtAlta: dtAlta,
		lActivo: true,
		//iIdPlan: idPlan,
		//lTFS: false,
		iIdTFS: $(fila).find("[id*=iIdTFS_]").val(),
		iIdWBS: $(fila).find("[id*=iIdWBS_]").val(),
		iTipoElemento: $(fila).find("[id*=iTipoElemento_]").val(),
		cTituloProceso: $(fila).find("[id*=cTituloProceso_]").val(),
		iGrupo: $(fila).find("[id*=iGrupo_]").val(),
		lAplicaMultiProceso: $(fila).find("[id*=lAplicaMultiProceso_]").val(),
		estaGuardado: $(fila).find("[id*=estaGuardado_]").val()
	});
	return arrTempWBS;
}

function ActualizarJsonWBS(plan, rqm, proceso, indice) {
	var dtAlta = new Date().toISOString().split("T")[0];
	//if (proceso != 4) {
	//$(arrWBS).each(function (indexRaiz, domEleRaiz) {
	//    if (domEleRaiz.iIdPlan == plan && domEleRaiz.iIdRequerimiento == rqm) {
	//        $(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
	//            if (domElementos.iIdProceso == proceso) {
	//                $(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
	//                    var usuario = $("[id*=iIdUsuario]")[indexHijos];
	//                    var detalleproceso = $("[id*=iIdDetalleProceso]")[indexHijos]
	//                    domEleHijos.elementos[0].iIdUsuario= usuario.value;
	//                    domEleHijos.elementos[0].iIdDetalleProceso= $(detalleproceso).attr("id").split("_")[1];
	//                    domEleHijos.elementos[0].iRequerimiento= iIdRQMGlobal;
	//                    domEleHijos.elementos[0].cWork_Item_Type= $("[id*=iIdWork_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dRemaining_Work= $("[id*=Remaining_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dOriginal_Estimate= $("[id*=iIdEstimate_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dTiempo_Total_del_proceso= $("[id*=iIdTotalProceso_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dPorcentaje_de_tareas= $("[id*=iIdPorcentajeTareas_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dtamanios= $("[id*=iIdTamano_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dRate= $("[id*=iIdRate_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dValor_ganado= $("[id*=iIdValorGanado_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].isemana= $("[id*=iIdSemana_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dValor_ganado_acumulado= $("[id*=iIdValorGanadoAcumulado_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dValor_ganado_semanal= $("[id*=iIdValorGanadoSemanal_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].cTipo_de_tarea= $("[id*=iIdTipoTarea_]").val();
	//                    domEleHijos.elementos[0].cUnidad_de_medida= $("[id*=iIdUnidadMedida_]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dtFecha_de_inicio= $("[id*=Fecha]")[indexHijos].val();
	//                    domEleHijos.elementos[0].dtAlta= dtAlta;
	//                    domEleHijos.elementos[0].lActivo= true;
	//                    domEleHijos.elementos[0].lTFS = false;
	//                })
	//            }
	//        });
	//    }
	//});

	//$(arrWBS).each(function (indexRaiz, domEleRaiz) {
	//    if (domEleRaiz.iIdPlan == plan && domEleRaiz.iIdRequerimiento == rqm && domEleRaiz.Modo == "Normal") {
	//        if (domEleRaiz.elementos[0].iIdProceso == proceso) {
	//            domEleRaiz.elementos = new Array();
	//            indice = indexRaiz;
	//        }
	//    }
	//});
	//}
	//else {
	//$(arrWBS).each(function (indexRaiz, domEleRaiz) {
	//    if (domEleRaiz.iIdPlan == plan && domEleRaiz.iIdRequerimiento == rqm && domEleRaiz.Modo == "Hibrido") {
	//        domEleRaiz.elementos = new Array();
	//        indice = indexRaiz;
	//    }
	//});
	if (iIdProcesoGlobal != 4) {
		arrWBS[indice].elementos = new Array();
		arrWBS[indice].elementos = buscarYReemplazarElementosJsonWBS(plan, rqm, proceso);
		console.log(arrWBS);

	}
	else {
		var raiz = $(".raiz");
		arrRaizHibrido.push({
			iIdUsuario: arrUser[0].teamMember.id,
			cNombreUsuario: arrUser[0].teamMember.displayName.split("<")[0].trim(),
			cNombreDetalleProceso: $("#NombreRaiz").val(),
			iIdDetalleProceso: $(raiz).find("[id^=iIdDetalleProceso]").attr("id").split("_")[1],
			iRequerimiento: rqm,
			cWork_Item_Type: 0,
			iIdProceso: 4,
			dRemaining_Work: 0,
			dOriginal_Estimate: 0,
			dTiempo_Total_del_proceso: 0,
			dPorcentaje_de_tareas: 0,
			dtamanios: 0,
			dRate: 0,
			dValor_ganado: 0,
			isemana: 0,
			//dValor_ganado_acumulado: $("#iIdValorGanadoAcumulado_" + noFila).val(),
			//dValor_ganado_semanal: $("#iIdValorGanadoSemanal_" + noFila).val(),
			cTipo_de_tarea: 0,
			cUnidad_de_medida: 0,
			dtFecha_de_inicio: $(raiz).find("[id^=Fecha]").val(),
			dtFechaFinal: $(raiz).find("[id^=FechaFinal]").val(),
			//dtHoras_Acumuladas: $("#iIdUsuario" + noFila).val(),
			//dtModificacion: $("#iIdUsuario" + noFila).val(),
			dtAlta: dtAlta,
			lActivo: true,
			//iIdPlan: idPlan,
			//lTFS: false,
			iIdTFS: $(raiz).find("[id*=iIdTFS_]").val(),
			iIdWBS: $(raiz).find("[id*=iIdWBS_]").val(),
			iTipoElemento: 3,
			cTituloProceso: $("#NombreRaiz").val(),
			iGrupo: $(raiz).find("[id*=iGrupo_]").val(),
			lAplicaMultiProceso: 0,
			estaGuardado: $(raiz).find("[id*=estaGuardado_]").val()
		});
		arrWBS[indice].elementos = new Array();
		arrWBS[indice].elementos = buscarYReemplazarElementosJsonWBS(plan, rqm, proceso);
		arrWBS[indice].elementos.Raiz = arrRaizHibrido;
		arrRaizHibrido = new Array();
		console.log(arrWBS);
	}
	//}

}

function buscarYReemplazarElementosJsonWBS(plan, rqm, proceso) {
	var arrElemenentosTemp = new Array();
	var arrHijosTemp = new Array();
	var arrDatosTemp = new Array();
	var dtAlta = new Date();
	var raiz = $(".raiz");
	var arrTempWBS = new Array();
	
	dtAlta = dtAlta.getFullYear() + "-" + (((dtAlta.getMonth() + 1) < 10 ? '0' : '') + (dtAlta.getMonth() + 1)) + "-" + dtAlta.getDate() + " " + dtAlta.getHours() + ":" + dtAlta.getMinutes() + ":" + dtAlta.getSeconds() + "." + dtAlta.getMilliseconds();
	$($(".primary")).each(function (indexPadre, domElePadre) {
		var idPadre = $(domElePadre).attr("name").split("_")[1];
		//if (proceso != 4) {
		//	arrElemenentosTemp.push({
		//		iIdProceso: proceso,
		//		Hijos: new Array(),
		//		cTituloProceso: $(domElePadre).find("[id*=cTituloProceso]").val()
		//	});
		//} else {
			switch ($(domElePadre).find("[id^=iIdDetalleProceso]").attr("name")) {
				case "Análisis":
					proceso = 1;
					break;
				case "Diseño":
					proceso = 2;
					break;
				case "Desarrollo":
					proceso = 3;
					break;
			};
			arrElemenentosTemp.push({
				iIdProceso: proceso,
				Hijos: new Array(),
				cTituloProceso: $(domElePadre).find("[id*=cTituloProceso_]").val()
			});
		//}

		$($("tr[name$=_" + idPadre + "]")).each(function (indexHijos, domEleHijos) {
			if (indexHijos == 0 && proceso == 4) {
				arrTempWBS.push({
					iIdUsuario: 0,
					cNombreUsuario: "",
					cNombreDetalleProceso: $(raiz).find("[id^=iIdDetalleProceso]").val(),
					iIdDetalleProceso: $(raiz).find("[id^=iIdDetalleProceso]").attr("id").split("_")[1],
					iRequerimiento: rqm,
					cWork_Item_Type: 0,
					//iIdProcesos: $("#iIdUsuario" + noFila).val(),
					dRemaining_Work: 0,
					dOriginal_Estimate: 0,
					dTiempo_Total_del_proceso: 0,
					dPorcentaje_de_tareas: 0,
					dtamanios: 0,
					dRate: 0,
					dValor_ganado: 0,
					isemana: 0,
					//dValor_ganado_acumulado: $("#iIdValorGanadoAcumulado_" + noFila).val(),
					//dValor_ganado_semanal: $("#iIdValorGanadoSemanal_" + noFila).val(),
					cTipo_de_tarea: 0,
					cUnidad_de_medida: 0,
					dtFecha_de_inicio: $(raiz).find("[id^=Fecha]").val(),
					dtFechaFinal: $(raiz).find("[id^=FechaFinal]").val(),
					//dtHoras_Acumuladas: $("#iIdUsuario" + noFila).val(),
					//dtModificacion: $("#iIdUsuario" + noFila).val(),
					dtAlta: dtAlta,
					lActivo: true,
					//iIdPlan: idPlan,
					//lTFS: false,
					iIdTFS: $(raiz).find("[id*=iIdTFS_]").val(),
					iIdWBS: $(raiz).find("[id*=iIdWBS_]").val(),
					iTipoElemento: 3,
					cTituloProceso: $("#NombreRaiz").val(),
					iGrupo: $(raiz).find("[id*=iGrupo_]").val(),
					lAplicaMultiProceso: 0,
					estaGuardado: $(raiz).find("[id*=estaGuardado_]").val()
				});
				arrHijosTemp.push({
					index: indexHijos,
					elementos: arrTempWBS
				});
			}
			if ($(domEleHijos).find("[id*=iIdWBS_]").val() == 0) {
				$(domEleHijos).find("[id*=iIdWBS_]").val(contFolioWBS)
				contFolioWBS++;
			}
			arrDatosTemp.push({
				iIdUsuario: $(domEleHijos).find("[id*=iIdUsuario]").val(),
				iIdDetalleProceso: $(domEleHijos).find("[id^=iIdDetalleProceso]").attr("id").split("_")[1],
				cNombreUsuario: $(domEleHijos).find("[id*=iIdUsuario] option:selected").text(),
				cNombreDetalleProceso: $(domEleHijos).find("[id^=iIdDetalleProceso]").val(),
				iRequerimiento: rqm,
				cWork_Item_Type: $(domEleHijos).find("[id*=iIdWork_]").val(),
				//iIdProcesos: $("#iIdUsuario" + noFila).val(),
				dRemaining_Work: $(domEleHijos).find("[id*=Remaining_]").val(),
				dOriginal_Estimate: $(domEleHijos).find("[id*=iIdEstimate_]").val(),
				dTiempo_Total_del_proceso: $(domEleHijos).find("[id*=iIdTotalProceso_]").val(),
				dPorcentaje_de_tareas: $(domEleHijos).find("[id*=iIdPorcentajeTareas_]").val(),
				dtamanios: $(domEleHijos).find("[id*=iIdTamano_]").val(),
				dRate: $(domEleHijos).find("[id*=iIdRate_]").val(),
				dValor_ganado: $(domEleHijos).find("[id^=iIdValorGanado_]").val(),
				isemana: $(domEleHijos).find("[id^=iIdSemana_]").val(),
				dValor_ganado_acumulado: $(domEleHijos).find("[id^=iIdValorGanadoAcumulado_]").val(),
				dValor_ganado_semanal: $(domEleHijos).find("[id^=iIdValorGanadoSemanal_]").val(),
				cTipo_de_tarea: $(domEleHijos).find("[id^=iIdTipoTarea_]").val(),
				cUnidad_de_medida: $(domEleHijos).find("[id^=iIdUnidadMedida_]").val(),
				dtFecha_de_inicio: $(domEleHijos).find("[id^=Fecha]").val(),
				dtFechaFinal: $(domEleHijos).find("[id^=FechaFinal]").val(),
				//dtHoras_Acumuladas: $("#iIdUsuario" + noFila).val(),
				//dtModificacion: $("#iIdUsuario" + noFila).val(),
				dtAlta: dtAlta,
				lActivo: true,
				//iIdPlan: idPlan,
				//lTFS: false,
				iIdTFS: $(domEleHijos).find("[id*=iIdTFS_]").val(),
				iIdWBS: $(domEleHijos).find("[id*=iIdWBS_]").val(),
				iTipoElemento: $(domEleHijos).find("[id*=iTipoElemento_]").val(),
				cTituloProceso: $(domEleHijos).find("[id*=cTituloProceso_]").val(),
				lAplicaMultiProceso: $(domEleHijos).find("[id*=lAplicaMultiProceso_]").val(),
				iGrupo: $(domEleHijos).find("[id*=iGrupo_]").val(),
				estaGuardado: $(domEleHijos).find("[id*=estaGuardado_]").val()
			});
			arrHijosTemp.push({
				index: indexHijos + 1,
				elementos: arrDatosTemp
			});
			arrDatosTemp = new Array();
		});
		arrElemenentosTemp[indexPadre].Hijos = arrHijosTemp;
		arrHijosTemp = new Array();

	});
	return arrElemenentosTemp;
}

function filtrarJsonWBS(data, plan, rqm, proceso) {
	return data.filter(
        function (data) { return data.proceso == proceso && data.rqm == rqm && data.plan == plan }
        );
}

function filtrarJsonWBSbyProceso(data, proceso) {
	return data.filter(
        function (data) { return data.iIdProceso == proceso }
        );
}


function obtenerUsuarios() {
	//debugger;
	//var numeroFilas = $("#datatable_ajax tbody tr").length;
	////$(".usuarios").select2({
	////    placeholder: "Usuarios",
	////    allowClear: true,
	////    width: "100%",
	////    data: arrS2Usuarios
	////});

	//for (var i = 0; i <= numeroFilas; i++) {
	//    var usuarios = $("#datatable_ajax tr")[i].children[6];
	//    $(usuarios).find("select").html("");
	//    //$(usuarios).find("select").append($("<option></option>"));
	//    $.each(arrIntegrantes, function (index, domEle) {
	//        //debugger
	//        var elementoOption = $("<option class='form-control' value='" + arrUsuariosTFSGlobal[domEle].iIdUsuario + "'>" + arrUsuariosTFSGlobal[domEle].cNombreUsuario + "</option>");
	//        var usuarios = $("#datatable_ajax tr")[i].children[6];
	//        $(usuarios).find("select").append(elementoOption);

	//    });
	//}
	$($("[id*=iIdUsuario]")).each(function (index, domEle) {
		$(domEle).html("");
		$(arrUsuariosGlobal).each(function (indexUsuarios, domEleUsuarios) {
			var elementoOption = $("<option class='form-control' value='" + domEleUsuarios.IdUsuario + "'>" + domEleUsuarios.Nombre + "</option>");
			$(domEle).append(elementoOption);
		})
	});


}

function CopiarArriba(nofila) {
	var contador = nofila.parentNode.parentNode.parentNode;
	//contador = contador.parentNode;
	contador = contador.rowIndex;
	var numeroCopias;
	var nombreaCopiar;

	numeroCopias = $("#nocopias").val();
	//nombreaCopiar = $("#iIdUsuarios" + nofila + " :selected").text();
	var valaCopiar = $("#datatable_ajax tr")[contador].children[6]
	valaCopiar = $(valaCopiar.children).val();
	//valaCopiar = $("#iIdUsuarios" + nofila + " :selected").val();
	valaCopiar = parseInt(valaCopiar);
	if (!isNaN(valaCopiar)) {
		for (var i = 0; i < numeroCopias; i++) {
			//$("#iIdUsuarios" + contador).val(valaCopiar);
			contador--;
			var a = $("#datatable_ajax tr")[contador].children[6]
			$(a.children).val(valaCopiar);

		}
	}
}

function CopiarAbajo(nofila) {
	//debugger;
	var contador = nofila.parentNode.parentNode.parentNode;
	//contador = contador.parentNode;
	contador = contador.rowIndex;
	var numeroCopias;
	var nombreaCopiar;
	var valaCopiar;
	numeroCopias = $("#nocopias").val();
	//nombreaCopiar = $("#iIdUsuarios" + nofila + " :selected").text();
	var valaCopiar = $("#datatable_ajax tr")[contador].children[6]
	valaCopiar = $(valaCopiar.children).val();
	//valaCopiar = $("#iIdUsuarios" + nofila + " :selected").val();
	valaCopiar = parseInt(valaCopiar);
	if (!isNaN(valaCopiar)) {
		for (var i = 0; i < numeroCopias; i++) {
			//$("#iIdUsuarios" + contador).val(valaCopiar);
			contador++;
			var a = $("#datatable_ajax tr")[contador].children[6]
			$(a.children).val(valaCopiar);

		}
	}

}

function AgregarProceso() {
	var proceso = $("#iIdEtapas").val();
	var requerimiento = $("#iIdRequerimiento").val();
	var plan = $("#iIdPlan").val();
	if (proceso != "" && requerimiento != "" && plan != "") {
		if (proceso == 4) {
			$("#ModalHibrido").modal("show");
		}
		else {
			esAgregado = true;
			GenerarRowProcesosNuevo(proceso, requerimiento, plan);
			$("#btnOrdenar").prop("disabled", false);
			//$("#btnNomenclatura").prop("disabled", false);
			$("#btnPrevisualizar").prop("disabled", false);
			//OrdenarProcesos();
		}
		
	}
	else {
		//alert("uno de los siguientes campos esta vacio: Proceso, Requerimiento, Plan")
		Alertas(1, "Alerta", "uno de los siguientes campos esta vacio: Proceso, Requerimiento, Plan");
	}

}

var contPlan = 0;
function AgregarPlan() {
	if (contPlan < 1) {
		$("#iIdPlan").append("<option class='form-control' value='" + siguienteplan + "'>" + siguienteplan + " - Sin Guardar</option>");
		//$("#iIdPlan").val(siguienteplan);
		var rows = $("#datatable_ajax thead tr");
		longitud = rows.length;
		//for (var i = 1; i < longitud; i++) {
		//    var rows = $("#datatable_ajax thead tr");
		//    rows = rows[i].children[1].lastChild.value = siguienteplan;
		//}
		contPlan++;
	}
	else {
		//alert("No se puede agregar mas planes por el momento.");
		Alertas(1, "Alerta", "No se puede agregar mas planes por el momento.")
	}

	//obtenerPlan();
}


function altaPlan(plan) {
	var fecha
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/dtAltaPlan",
		async: false,
		data: '{resultado: ' + plan + '}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			fecha = response.d;
			fecha = fecha.split(" ");
			fecha = String(fecha[0]);
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	return fecha;
}

function obtenerPlan() {
	//var cPlan = "";
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/ObtenerPlan",
		async: false,
		data: null,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			var respuesta = (response.d)
			respuesta = respuesta.replace(/'/g, "\"");
			var planes = JSON.parse(respuesta);
			$(planes.Planes).each(function (index, domEle) {
				var elementoOption = $("<option class='form-control' value='" + domEle.iIdPlan + "'>" + domEle.iIdPlan + "- " + domEle.dtFechaCreacion.split(" ")[0] + "</option>");
				$("#iIdPlan").append(elementoOption);
				siguienteplan = parseInt(domEle.iIdPlan) + 1;
			})
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	//if (cPlan.length != "") {
	//	cPlan = cPlan.split(',');
	//	$(cPlan).each(function (index, domEle) {
	//		var fecha = altaPlan(parseInt(domEle));
	//		var elementoOption = $("<option class='form-control' value='" + (index + 1) + "'>" + domEle + " - " + fecha + "</option>");
	//		$("#iIdPlan").append(elementoOption);
	//		siguienteplan = parseInt(domEle) + 1;
	//		ultimoplan = domEle;
	//		planGlobal.push(domEle);
	//		localStorage.Planes = planGlobal;
	//	});
	//}
	//else {
	//	siguienteplan = 1;
	//}

}

function ObtenerDatosByPlan() {
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/ObtenerRequerimientosByPlan",
		async: false,
		data: '{plan: ' + iIdPlanGlobal + '}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			var esNormal = true;
			$(response.d).each(function (indexrqm, eleRqm) {
				var arrElementos = new Array();
				var procesos = obtenerProcesosByPlanRqm(iIdPlanGlobal, eleRqm);
				$(procesos).each(function (indexProceso, eleProceso) {
					var tituloProceso;
					var datos = ObtenerDatosByPlanRqmProceso(iIdPlanGlobal, eleRqm, eleProceso);

					var arrHijos = new Array();

					$(datos).each(function (indexDatosProcesos, eleDatosProcesos) {
						var arrElementosHijos = new Array();
						$(eleDatosProcesos).each(function (indexDatos, eleDatos) {
							if (eleDatos.iTipoElemento == 3) {
								esNormal = false;
							}
							tituloProceso = (indexDatos == 0) ? eleDatos.cTituloProceso : tituloProceso;
							var arrDatos = new Array();
							arrDatos.push(eleDatos)
							arrElementosHijos.push({
								elementos: arrDatos,
								index: indexDatos
							})
						});
						arrHijos.push({
							iIdProceso: eleProceso,
							Hijos: arrElementosHijos,
							cTituloProceso: tituloProceso
						});
					});

					//arrDatos.push(arrHijos)
					arrElementos.push(arrHijos);
					arrWBS.push({
						iIdPlan: iIdPlanGlobal,
						iIdRequerimiento: eleRqm,
						elementos: arrHijos,
						Modo: (esNormal) ? "Normal" : "Hibrido"
					})
					//console.log(datos);
				});

			});
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos");
		}
	});
	console.log(arrWBS);
}

function obtenerProcesosByPlanRqm(plan, rqm) {
	var procesos;
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/obtenerProcesosByPlanRqm",
		async: false,
		data: '{"plan": "' + plan + '", "rqm": "' + rqm + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			procesos = response.d
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos");
		}
	});
	return procesos;
}

function ObtenerDatosByPlanRqmProceso(plan, rqm, proceso) {
	var datos;
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/ObtenerDatosByPlanRqmProceso",
		async: false,
		data: '{"plan": "' + plan + '", "rqm": "' + rqm + '", "proceso": "' + proceso + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			datos = response.d
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos");
		}
	});
	return datos;
}

var c = 0;
function AgregarRQMModal(rqm, nombre) {
	//var rqm = $("#txtModalRQM").val();
	if (allRQM.indexOf(rqm) == -1 && rqm != "") {
		allRQM.push(rqm);
		arrRQM.push({
			iIdRQM: rqm,
			Nombre: nombre
		});
		var elemento = $("<tr role ='row' class='filter' id='" + rqm + "'><td><div class='btn-group btn-group-sm btn-group-solid'><button type='button' onclick='EliminarRQM(this)' class='btn red'><i class='fa fa-times-circle'></i></button></div></td><td>" + rqm + "</td><td>" + nombre + "</td></tr>");
		$("#tbodyModalRQM").append(elemento);
	}
	else {
		//alert("Este Requerimiento ya esta agregado");
		Alertas(1, "Alerta", "Este Requerimiento ya esta agregado")
	}
}

function EliminarRQM(obj) {
	var padre = obj.parentNode.parentNode.parentNode;
	var idRQM = $(padre).attr("id");
	arrRQM = EliminarRQMToArrRQM(arrRQM, idRQM);
	allRQM = EliminarRQMToAllRQM(allRQM, idRQM);
	$(padre).remove();

}

function EliminarRQMToArrRQM(data, rqm) {
	return data.filter(
        function (data) { return data.iIdRQM != rqm }
        );
}

function EliminarRQMToAllRQM(data, rqm) {
	return data.filter(
        function (data) { return data != rqm }
        );
}

function AgregarRQMGrid() {
	if (arrRQM.length > 0) {
		$.each(arrRQM, function (index, domEle) {
			var elementoOption = $("<option class='form-control' value='" + domEle.iIdRQM + "'>" + domEle.iIdRQM + "- " + domEle.Nombre + "</option>");
			$("#iIdRequerimiento").append(elementoOption);
		});
		arrRQM = new Array();
		//$("#tbodyModalRQM").html("");
		$("#ModaRQM").modal("hide");
	}
	else {
		//alert("necesita ingresar un requerimiento");
		Alertas(1, "Alerta", "Necesita ingresar un requerimiento")
	}

}

function GenerarRowProcesosNuevo(iIdProceso, iIdRQM, iIdPlan) {
	var grid = $("#datatable_ajax tbody");
	var seCambio = false;
	$.ajax({
		type: "POST",
		async: false,
		url: "../../Class/WBS.asmx/GenerarRowProcesoNuevo",
		data: '{"iIdProceso":"' + iIdProceso + '", "iIdRQM":"' + iIdRQM + '", "iIdPlan":"' + iIdPlan + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			//debugger;
			respuesta = response.d;
			//var temp= grid.html();            
			//grid.append(temp);
			//var nuevoRQM = respuesta.replace("Requerimiento ");
			//respuesta = 
			grid.append(respuesta);
			ocultarElementos();
			//changePlan();
			obtenerUsuarios();
			var indice;
			//debugger;
			//$.each(jsonTemporal.General, function (index, domEle) {
			//    if (domEle.iIdProceso == iIdProceso && domEle.iIdRequerimiento == iIdRQM && domEle.iIdPlan == iIdPlan) {
			//        //domEle.htmlText = grid.html();
			//        indice = index;
			//        indiceGlobal = index;
			//    }
			//});
			//function CambiarHtmlJsonTemporal(data, plan, rqm, proceso) {
			//    return data.filter(
			//        function (data) {
			//            if (data.iIdPlan == plan && data.iIdRequerimiento == rqm && data.iIdProceso == proceso) {
			//                data.htmlText = $("#datatable_ajax tbody").children();
			//            }

			//        }
			//        );
			//}
			CambiarHtmlJsonTemporal(jsonTemporal.General, iIdPlan, iIdRQM, iIdProceso, seCambio)
			if (seCambio) {
				seCambio = false;
			}
			else {
				jsonTemporal.General.push({
					iIdProceso: iIdProceso,
					iIdRequerimiento: iIdRQM,
					iIdPlan: iIdPlan,
					htmlText: $("#datatable_ajax tbody").children(),
					users: "",
					longitud: $("#datatable_ajax tbody tr").length,
					guardado: false
				});
				indiceGlobal = jsonTemporal.General.length - 1;
				console.log(jsonTemporal.General);
				gridGlobal = $("#datatable_ajax tbody tr");
			}
			inputsChange();
			OrdenarProcesos();
			AgregarPreview(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
			AplicarNomenclatura();
			CambiarAsignado();
			CambiarRevisor();
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	//$("td select").select2({
	//    placeholder: "Usuarios",
	//    allowClear: true,
	//    width: "100%"
	//});
}

function ocultarElementos() {
	//debugger;
	var long;
	var proceso = $("#iIdEtapas").val();
	var procesos = $("tr[name*=padre]");
	//$(proceso).each(function (index,domEle) {
	//    var idPadre = $(domEle).attr("name");
	//    idPadre = idPadre.split("_")[1];
	//    var tareas = $("tr[name$=_" + idPadre + "]")
	//    long = tareas.length;
	//});
	var noPadres = $("tr.noprimary");
	$(noPadres).each(function (index, domEle) {
		var componente = $(domEle.children)[1];
		$(componente.children).hide();
	});
	var filas = $("#datatable_ajax tbody tr.filter");
	$(filas).each(function (index, domEle) {
		//debugger;
		var tarea = $(domEle.children)[4];
		if ($(tarea.children).val().search("Review") == -1) {
			var inspeccion = $(domEle.children)[2];
			$(inspeccion.children).hide();
		}
	});
	//switch (proceso) {
	//    case "1":
	//        long = 10;
	//        break;
	//    case "2":
	//        long = 7;
	//        break;
	//}
	//var rows = $("#datatable_ajax tbody tr");
	//longitud = rows.length;
	////long = longitud / long;
	//var cadenatemp = "";
	//for (var i = 0; i < longitud; i++) {
	//    var detProceso = $("#datatable_ajax tbody tr")[i];
	//    var coldetProceso = detProceso.children[4];
	//    var cadenadetProceso = $(coldetProceso.children).val();
	//    if (cadenadetProceso.search("Review") == -1) {
	//        var temp = detProceso.children[2].children;
	//        $(temp).hide();
	//    }
	//var tempi = (i == 0) ? 1 : i;
	//var bandera = false;
	//var req = $(rows)[i];
	//var colReq = req.children[1];
	//var cadenaReq = $(colReq.children).val();
	//if (cadenaReq == cadenatemp) {
	//    temp = req.children[1].children;
	//    bandera = true;
	//}
	//else {
	//    cadenatemp = cadenaReq;
	//}
	//if ((tempi % long) != 0 && bandera) {
	//    $(temp).hide();
	//}
	//}
}

//window.onbeforeunload = function () {
//    if (jsonTemporal.length != 0) {
//        return "";
//    }
//}

function UsuariosToArray() {
	//debugger;
	var arrUsers = new Array();
	if (jsonTemporal.General.length != 0) {
		for (var i = 0; i < $("#datatable_ajax tbody tr").length; i++) {
			arrUsers.push($("#iIdUsuarios" + i + " option:selected").val());
		}
		jsonTemporal.General[indiceGlobal].users = arrUsers;
	}
}

function UsuariosGuardados() {
	//var cUsuarios = "";
	//$.ajax({
	//	type: "POST",
	//	async: false,
	//	url: "../../Class/WBS.asmx/UsuariosGuardados",
	//	data: '{"iIdRQM":"' + iIdRQM + '", "iIdProceso":"' + iIdProceso + '", "iIdPlan":"' + iIdPlan + '"}',
	//	contentType: "application/json; charset=utf-8",
	//	dataType: "json",
	//	success: function (response) {
	//		//debugger;
	//		cUsuarios = response.d;
	//	},
	//	error: function (xhr, estatus) {
	//		//alert("Error " + estatus);
	//		Alertas(2, "Error", "Error de carga de datos")
	//	}
	//});
	/////debugger
	//$(cUsuarios.split(',')).each(function (index, domEle) {
	//	//arrUsuariosGlobal.push(domEle);
	//	//var elementoOption = $("<option class='form-control' value='" + (index + 1) + "'>" + domEle + "</option>");
	//	$("#iIdUsuarios" + index).val(domEle).trigger("change");
	//}
	//);
	$("select[id*=iIdUsuario]").each(function (index, domEle) {
		var id = $(domEle).attr("idUsuario");
		$(domEle).removeAttr("idUsuario");
		$(domEle).val(id).trigger("change");
	});
}

function cambiarFechaVal(obj) {
	//debugger;
	var dtTemp = $(obj).val();
	$(obj).attr("value", dtTemp);
}
var inputs;
function inputsChange() {
	$("input").change(function () {
		var inputTemp = $(this).val();
		inputTemp = ($(this).attr("type") == "number" && inputTemp == "") ? 0 : inputTemp;
		$(this).attr("value", inputTemp);
	});
}


//function CambiarValueInput(obj) {
//    //debugger;
//    var inputTemp = $(obj).val();
//    $(obj).attr("value", inputTemp);
//}


function ObtenerUsuariosTFS() {
	//debugger;
	var cUsuario = "";
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/WebServiceMeridaCerrarTicket",
		async: false,
		data: null,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			cUsuario = JSON.parse(response.d);
			//cUsuario = JSON.parse(cUsuario.d);
		},
		error: function (xhr, estatus) {
			//alert("Error " + estatus);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	//debugger
	$.each(cUsuario, function (index, domEle) {
		//debugger
		var elementoOption = $("<option class='form-control' value='" + domEle.IDTFS + "'>" + domEle.cNombreUsuario + "</option>");
		var elementoOption2 = $("<option class='form-control' value='" + domEle.IDTFS + "'>" + domEle.cNombreUsuario + "</option>");
		var elementoOption3 = $("<option class='form-control' value='" + domEle.IDTFS + "'>" + domEle.cNombreUsuario + "</option>");
		//$("#asignado").append(elementoOption);
		//$("#revisor").append(elementoOption2);
		$("#modals2Integrantes").append(elementoOption3);
		arrUserFromTFS.push(domEle);
		//var uuid = guid();
		arrUsuariosTFSGlobal.push({
			cNombreUsuario: domEle.cNombreUsuario,
			cClaveUsuario: domEle.cClaveUsuario,
			iIdUsuario: domEle.IDTFS,
			index: index
		});
		arrS2Usuarios.push({
			id: domEle.IDTFS,
			text: domEle.cNombreUsuario
		});
	});
	//console.log(arrUsuariosTFSGlobal);
}



function GetNombreRQMByIdEnter(e) {
	if (e.keyCode == 13) {
		GetNombreRQMById();
	}
}


function GetNombreRQMById() {
	var iIdRQM = parseInt($("#txtModalRQM").val());
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/NombreRQM",
		async: false,
		data: '{"Id":"' + iIdRQM + '", "sProyecto": "' + sProyecto + '", "sColeccion": "' + sColeccion + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			//debugger;
			//alert(response.d);
			AgregarRQMModal(iIdRQM, response.d);
			$("#txtModalRQM").val("");
		},
		error: function (xhr, estatus) {
			//alert("No existe ese requerimiento");
			Alertas(1, "Alerta", "No existe ese requerimiento")
		}
	});
}

//d-m-y
function fechaauto(fecha) {
	var a = $("#datatable_ajax tbody tr");
	var l = a.length;
	for (var i = 0; i < l; i++) {
		var b = a[i].children[18];
		$(b).find("input").attr("value", fecha);
	}
}


//original-tiempototal(10)-porcentajetareas-


//function TotalOriginalEstimado() {
//    $.ajax({
//        type: "POST",
//        url: "../../Class/WBS.asmx/TotalOriginalEstimado",
//        async: false,
//        data: null,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            totaloriginalestimado = response.d;
//        },
//        error: function (xhr, estatus) {
//            alert("Error " + estatus);
//        }
//    });
//}






var arreglo = new Array;
function temporalprueba() {
	$.each(planGlobal, function (index, plan) {
		$.each(rqmGlobal, function (ind, rqm) {
			$.each(procesoGlobal, function (i, proceso) {
				$.ajax({
					type: "POST",
					url: "../../Class/WBS.asmx/ArregloTotalOriginalEstimado",
					data: '{"iIdPlan":"' + plan + '", "iIdRQM":"' + rqm + '", "iIdProceso":"' + proceso + '"}',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (response) {
						//debugger;
						console.log(plan, rqm, proceso)
						if (response.d.length != 0) {
							jsonTemporal.Totales.push(
                                {
                                	originalEstimados: response.d,
                                	plan: plan,
                                	rqm: rqm,
                                	proceso: proceso
                                }
                        );
						}

					},
					error: function (xhr, estatus) {
						//alert("Error " + xhr);
						Alertas(2, "Error", "Error de carga de datos")
					}
				});
			});
		});
	});
	//$.ajax({
	//    type: "POST",
	//    url: "../../Class/WBS.asmx/ArregloTotalOriginalEstimado",
	//    data: null,
	//    contentType: "application/json; charset=utf-8",
	//    dataType: "json",
	//    success: function (response) {
	//        jsonTemporal.push({
	//            Totales: [
	//                {
	//                    originalEstimados: response.d
	//                }
	//            ]
	//        });
	//    },
	//    error: function (xhr, estatus) {
	//        alert("Error " + estatus);
	//    }
	//});
}

var padre;
function obtenerPadre(iIdPadre) {
	//debugger;
	padre = $("tr[name='ultimoHijo_" + iIdPadre + "']")[0];
	if (padre == "" || padre == null || typeof padre == null) {
		padre = $("#datatable_ajax tbody tr")[0];
	}
	if (iIdProcesoGlobal == 4) {
		$("#modalProceso").modal("show");
	}
	else {
		insertarProceso();
	}
}

var opcProceso;
function insertarProceso() {
	var respuesta;
	if (iIdProcesoGlobal == 4) {
		var opcProceso = $("#modalProcesos option:selected").val();
	}
	else {
		opcProceso = iIdProcesoGlobal;
	}
	$.ajax({
		type: "POST",
		async: false,
		url: "../../Class/WBS.asmx/GenerarRowProcesoNuevo",
		data: '{"iIdProceso":"' + opcProceso + '", "iIdRQM":"' + iIdRQMGlobal + '", "iIdPlan":"' + iIdPlanGlobal + '", "agregado":' + false + '}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			//debugger;
			respuesta = response.d;
		}
	});
	//debugger;
	$(padre).after(respuesta);
	obtenerUsuarios();
	//CambiarAsignado();
	//CambiarRevisor();
	ocultarElementos();
	OrdenarProcesos();
	//UsuariosGuardados(iIdRQMGlobal, proceso, iIdPlanGlobal);
}

function CambiarAsignado() {
	//debugger;
	var asignado = $("#asignado option:selected").val();
	var grid = $("#datatable_ajax tbody tr");
	//var tamaño = grid.length;
	//var i = 0;
	//if (iIdProcesoGlobal == 4) {
	//    i = 1;
	//}
	//for (i; i < tamaño; i++) {
	//    //debugger;
	//    var usuarios = grid[i].children[6];
	//    var tarea = grid[i].children[4];
	//    tarea = $(tarea.children).val();
	//    if (tarea.search("Peer Review") == -1) {
	//        var temp = $(usuarios).find("select");
	//        $(temp).val(asignado).trigger("change");
	//    }
	//}
	$(grid).each(function (index, domEle) {
		if (iIdProcesoGlobal == 4) {
			if (index != 0) {
				var tarea = $(domEle).find("[id*=iIdDetalleProceso_]").val()
				if (tarea.search("Peer Review") == -1) {
					$(domEle).find("[id*=iIdUsuarios]").val(asignado).trigger("change");
				}
			}
		}
		else {
			var tarea = $(domEle).find("[id*=iIdDetalleProceso_]").val()
			if (tarea.search("Peer Review") == -1) {
				$(domEle).find("[id*=iIdUsuarios]").val(asignado).trigger("change");
			}
		}

	});

}

function CambiarRevisor() {
	//debugger;
	var revisor = $("#revisor option:selected").val();
	var grid = $("#datatable_ajax tbody tr");
	//var tamaño = grid.length;
	//var i = 0;
	//if (iIdProcesoGlobal == 4) {
	//    i = 1;
	//}
	//for (i; i < tamaño; i++) {
	//    var usuarios = grid[i].children[6];
	//    var tarea = grid[i].children[4];
	//    tarea = $(tarea.children).val();
	//    if (tarea.search("Peer Review") != -1) {
	//        $(usuarios.children).val(revisor).trigger("change");
	//    }
	//}
	$(grid).each(function (index, domEle) {
		if (iIdProcesoGlobal == 4) {
			if (index != 0) {
				var tarea = $(domEle).find("[id*=iIdDetalleProceso_]").val()
				if (tarea.search("Peer Review") != -1) {
					$(domEle).find("[id*=iIdUsuarios]").val(revisor).trigger("change");
				}
			}
		}
		else {
			var tarea = $(domEle).find("[id*=iIdDetalleProceso_]").val()
			if (tarea.search("Peer Review") != -1) {
				$(domEle).find("[id*=iIdUsuarios]").val(revisor).trigger("change");
			}
		}

	});
}

function ActivarFechaHoy() {
	//debugger;
	if ($("#modalCheckFechaHoy").is(':checked')) {
		$("#modalDivHoy").css("display", "");
	}
	else {
		$("#modalDivHoy").css("display", "none");
	}
}

function CargarEquipos() {
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/CargarEquipos",
		data: null,
		contentType: "application/json; charset=utf8",
		success: function (response) {
			var respuesta = (response.d)
			respuesta = respuesta.replace(/'/g, "\"");
			var equipos = JSON.parse(respuesta);
			$(equipos.Equipos).each(function (index, domEle) {
				var elementoOption = $("<option class='form-control' value='" + domEle.iIdEquipo + "'>" + domEle.cNombreEquipo + "</option>");
				$("#modals2Equipo").append(elementoOption)
			})

		}
	});

}

function NuevoEquipo() {
	var nombreEquipo = $("#txtModalNombreEquipo").val();
	var fechaInicio = $("#modalFechaInicio").val();
	var fechaFinal = $("#modalFechaFinal").val();
	var jsonEquipo = {
		cNombreEquipo: nombreEquipo,
		dtFechaInicio: fechaInicio,
		dtFechaFinal: fechaFinal
	}
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/NuevoEquipo",
		data: '{"cNombreEquipo":"' + nombreEquipo + '", "dtFechaInicio":"' + fechaInicio + '", "dtFechaFinal":"' + fechaFinal + '"}',
		//data: '{"Equipo":"' + jsonEquipo + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			//debugger;
			var iIdEquipo = JSON.parse(response.d);
			console.log(iIdEquipo);
			var elementoOption = $("<option class='form-control' value='" + iIdEquipo + "'>" + nombreEquipo + "</option>");
			$("#modalEquipo").find("select").append(elementoOption);
		},
		error: function (error) {
			//alert("Ocurrio un error, " + error);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
	//alert("Nombre " + nombreEquipo + ", fecha de inicio: " + fechaInicio + ", fecha de finalizacion " + fechaFinal);

	$("#txtModalNombreEquipo").val("");
	$("#modalFechaInicio").val("");
	$("#modalFechaFinal").val("");
}
var arrIntegrantes = new Array();
function AgregarIntegrante() {
	//debugger;
	var integrante = $("#modals2Integrantes option:selected").text();
	var iIdIntegrante = $("#modals2Integrantes option:selected").val();
	var indexIntegrante = $("#modals2Integrantes").prop("selectedIndex")
	var fechaIngreso = $("#modalFechaIngreso").val();
	if (arrIntegrantes.indexOf(iIdIntegrante) == -1 && fechaIngreso != "") {
		var elementoLista = $("<li class='list-group-item' id='integrante_" + iIdIntegrante + "'><span hidden>" + fechaIngreso + "</span> " + integrante + "<button type='button' class='btn blue' onclick='EliminarIntegrante(this)'>-</button></li>");
		$("#listaIntegrantes").append(elementoLista);
		arrIntegrantes.push(indexIntegrante);
		$("#ModalNuevoIntegrante").modal("hide");
	} else {
		//alert("Este integrante ya se encuenta en el equipo")
	}


}

function AgregarIntegranteHoy() {
	var integrante = $("#modals2Usuarios option:selected").text();
	var iIdIntegrante = $("#modals2Usuarios option:selected").val();
	var indexIntegrante = $("#modals2Integrantes").prop("selectedIndex")
	if (arrIntegrantes.indexOf(indexIntegrante) == -1) {
		var hoy = new Date();
		hoy = "" + hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
		var elementoLista = $("<li class='list-group-item' id='integrante_" + iIdIntegrante + "'><span hidden>" + hoy + "</span> " + integrante + "<button type='button' class='btn btn-sm blue' onclick='EliminarIntegrante(this)'>-</button></li>");
		$("#listaIntegrantes").append(elementoLista);
		arrIntegrantes.push(indexIntegrante);
	}
	else {
		//alert("Este integrante ya se encuentra en el equipo");
	}

}

function EliminarIntegrante(obj) {
	var elementoLista = obj.parentNode;
	var idLista = $(elementoLista).attr("id").split("_")[1];
	var indexArr = arrIntegrantes.indexOf(idLista);
	arrIntegrantes.splice(indexArr, 1);
	$(elementoLista).remove();
}

function usuariosabd() {
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/UsuariosaBD",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({ usuarios: arrUsuariosTFSGlobal }),
		dataType: "json",
		success: function (response) {
			//alert("ya");
			Alertas(0, "Carga Completa", "Listo")
		},
		error: function (error) {

		}
	});
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function BuscarUsuario(input) {
	var usuario = $(input).val();
	$(arrUsuariosTFSGlobal).each()
}

function BuscarIteracion(data, equipo) {
	return data.filter(
        function (data) { return data.IdTFSIteracion == equipo }
        );
}
var arrUsuariosFiltrados = new Array();
var arrEquipoSeleccionado = new Array();
function GuardarEquipos() {
	var lista = $("#listaIntegrantes li");
	var equipo = $("#modals2Equipo").val();
	//debugger;
	//if (equipo != null && equipo != "" && lista.length >= 1) {

	//$(arrUsuariosFiltrados.datosUsuario.value).each(function (index, domEle) {
	//    var elemento = $(domEle).text();
	//    var fecha = elemento.split(" ")[0];
	//    //alert("iIdEquipo: " + equipo + ", fecha de ingreso: " + fecha);
	//    //          arrUsuariosFiltrados.push($(domEle).attr("id").split("_")[1]);
	//});
	//$("#listaIntegrantes").html("");


	if (equipo != "") {
		arrUsuariosFiltrados = BuscarIteracion(arrIteracionesPorUsuario, equipo);
		$("#iIdPlan").prop("disabled", false);
		$("#agregarplan").prop("disabled", false);
		$("#modalSmElegirEquipo").modal("hide");
		arrEquipoSeleccionado = arrUsuariosFiltrados[0];
		AgregarUsuariosFiltrados(arrEquipoSeleccionado);
		MostrarEquipoSeleccionado(arrEquipoSeleccionado);
		$("#UserLogin").show();
	}
	else {
		//alert("Necesita seleccionar un equipo")
		Alertas(1, "Seleccion de Equipo", "Necesita seleccionar un equipo");
	}

	//}
	//else {
	//    alert("Necesita poner todos los datos");
	//}

}

function MostrarEquipoSeleccionado(equipoSeleccionado) {
	$("#NombreEquipo").text(equipoSeleccionado.NombreIteracion);
	$("#NombreEquipo").val(equipoSeleccionado.IdTFSIteracion);
	var hoy = new Date();
	hoy = "" + hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();

	$(equipoSeleccionado.datosUsuario.value).each(function (index, domEle) {
		var elementoLista = $("<li class='list-group-item' id='" + domEle.teamMember.id + "'><span hidden>" + hoy + "</span> " + domEle.teamMember.displayName.split("<")[0].trim() + "</li>");
		$("#listaIntegrantes").append(elementoLista);
	});
	$("#DPDiasInhabiles").datepicker({
		clearBtn: true,
		language: "es",
		multidate: true,
		daysOfWeekDisabled: "0,6",
		daysOfWeekHighlighted: "1,2,3,4,5",
		format: 'yyyy-mm-dd',
	});
	$("#DPDiasInhabiles").datepicker("setStartDate", arrEquipoSeleccionado.IteracionData.dtFechaInicio.split("T")[0])
	$("#DPDiasInhabiles").datepicker("setEndDate", arrEquipoSeleccionado.IteracionData.dtFechaFinal.split("T")[0])
}


//var arrDiasInhabiles = new Array();
function ConfigurarEquipo() {
	//var arrDiasInhabiles = $("#DPDiasInhabiles input").val().split(",");
	arrEquipoSeleccionado.IteracionData.DiasInhabiles = $("#DPDiasInhabiles input").val().split(",");
	//var arrDiasSprint = new Array();
	var arrDiasDisponibles = new Array();
	$("#ModalConfigurarEquipo").modal("hide");
}

var arrProcesosOrdenar = new Array();
var nombresProcesos = new Array();
function OrdenarProcesos() {
	arrProcesosOrdenar = [];
	var objProcesos = $(".primary");
	var cProceso = ""
	$("#modalSelectOrdenamiento").html("");
	//debugger;
	$(objProcesos).each(function (index, domEle) {
		//debugger;
		var nombreProceso = $(domEle).find("td input[id*=iIdDetalleProceso]").val();
		var Nombre = $(domEle).attr("name");
		var Padre = Nombre.split("_")[1];
		var todasFilas = document.querySelectorAll("tr[name$=_" + Padre + "]");
		var cHtml = new Array();
		$(todasFilas).each(function (index, domEle) {
			// debugger;
			cHtml.push($(domEle));
		});
		arrProcesosOrdenar.push(cHtml);
		cProceso += "<option value='" + (index + 1) + "' class='" + (index + 1) + "'>" + nombreProceso + "(Proceso: " + (index + 1) + ")</option>";

		//$("#modalSelectOrdenamiento").append(elemento);
	});
	$("#modalSelectOrdenamiento").append($(cProceso));
	//$("#modalMultiSelect").multiSelect({ keepOrder: true });


}

//$("#ModalCrearEquipos").on("shown.bs.modal", s2usuarios);

function s2usuarios() {
	//debugger;
	$("#modals2Usuarios").select2({
		dropdownAutoWidth: 'true',
		width: '100%',
		placeholder: "Selecione una empresa",
		data: arrS2Usuarios,
		dropdownParent: $("#modalDivHoy")
	});

	$("#revisor").select2({
		placeholder: "Revisor",
		allowClear: true
	});

	$("#asignado").select2({
		placeholder: "Asignado a...",
		allowClear: true
	});

	$("#iIdPlan").select2({
		placeholder: "Plan",
		allowClear: true
	});

	$("#iIdEtapas").select2({
		placeholder: "Proceso",
		allowClear: true
	});

	$("#iIdRequerimiento").select2({
		placeholder: "Requerimiento",
		allowClear: true
	});

	//$("#modals2Equipo").select2({
	//    placeholder: "Equipo",
	//    allowClear: true,
	//    width: '78%',
	//    dropdownParent: $("#modalSmElegirEquipo")
	//});

	//$("#modals2Proyecto").select2({
	//    placeholder: "Proyecto",
	//    allowClear: true,
	//    width: '78%',
	//    dropdownParent: $("#modalSmElegirEquipo")
	//});

	//$("#modals2Coleccion").select2({
	//    placeholder: "Coleccion",
	//    allowClear: true,
	//    width: '78%',
	//    dropdownParent: $("#modalSmElegirEquipo")
	//});

	$("#modals2Integrantes").select2({
		placeholder: "Integrantes",
		allowClear: true,
		width: '100%',
		dropdownParent: $("#modalIntegrantes")
	});

}

function BotonDeOrdenar(adonde) {
	//debugger;
	adonde = $(adonde).attr("id");
	var max = $("#modalSelectOrdenamiento option").length;
	var id = parseInt($("#modalSelectOrdenamiento option:selected").attr("class"));
	var elemento = $("#modalSelectOrdenamiento option:selected");
	var tamaño = elemento.length;
	var newid = (tamaño > 1) ? (id + tamaño - 1) : id;
	var tempo = parseInt(id);
	var valido = true;
	$("#modalSelectOrdenamiento option:selected").each(function (index, domEle) {
		//debugger;
		if (index != 0 && valido) {
			var a = parseInt($(domEle).attr("class"));
			valido = ((tempo + 1) == a) ? true : false;
			tempo++;
		}
	});


	if (adonde == "arriba" && id != 1 && newid != 1 && valido) {
		id--;
		$("#modalSelectOrdenamiento option:selected").remove();
		$("." + id).before(elemento);

	}
	else if (adonde == "abajo" && id != max && newid != max && valido) {
		newid++;
		$("#modalSelectOrdenamiento option:selected").remove();
		$("." + newid).after(elemento);

	}
	$("#modalSelectOrdenamiento option").each(function (index, domEle) {
		//debugger;
		$(domEle).attr("class", (index + 1));
	});
}

function OrdenarGrid() {
	//debugger;
	var hibrido = (iIdProcesoGlobal == 4) ? $(".raiz") : $("");
	$("#datatable_ajax tbody").html("");
	var procesosOrdenados = $("#modalSelectOrdenamiento option");
	var idProcesosOrdenados = new Array();
	$("#datatable_ajax tbody").append(hibrido);
	$(procesosOrdenados).each(function (index, domEle) {
		//debugger;
		idProcesosOrdenados.push(parseInt($(domEle).val()));
	});

	$(idProcesosOrdenados).each(function (index1, domEle1) {
		//debugger;
		$(arrProcesosOrdenar[domEle1 - 1]).each(function (index2, domEle2) {
			$("#datatable_ajax tbody").append(domEle2);
		})
	});

	var objProcesos = document.querySelectorAll("tr[name*=padre]");

	$(objProcesos).each(function (index, domEle) {
		var nombreProceso = $(domEle).find("td input[id*=iIdDetalleProceso]").val();
		var temp = $("#modalSelectOrdenamiento option")[index];
		$(temp).text("" + nombreProceso + "(Proceso: " + (index + 1) + ")");
	});
	Alertas(0, "Orden Completado", "No olvidar recalcular valores!")
}


function InsertarHibrido() {
	var indice = new Array;
	$("#btnOrdenar").prop("disabled", false);
	//$("#btnNomenclatura").prop("disabled", false);
	$("#btnPrevisualizar").prop("disabled", false);
	$("#datatable_ajax tbody").html("");
	$("#datatable_ajax tbody").append($("<tr role='row' class='raiz' name='padre'><td>" +
										   "<div class='btn-group btn-group-xs btn-group-solid'>" +
										   "<button type='button' id='Procesos' onclick='obtenerPadre(0);' data-toggle='modal' class='btn blue'><i class='glyphicon glyphicon-plus-sign'></i></button>" +
										   "</div>" +
										   "</td><td colspan='100%'><input type='text' id='NombreRaiz' placeholder='Identificador de Agrupador' class='form-control form-filter input-sm'/></td><td hidden><input type = 'number'  value='3' name='iTipoElemento' id='iTipoElemento_Raiz'></td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control form-filter input-sm' name='Componente' id='iIdDetalleProceso_1' value='1' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control' id='Fecha_0' value='" + arrEquipoSeleccionado.IteracionData.dtFechaInicio.split("T")[0] + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'text' class='form-control' id='FechaFinal_0' value='" + arrEquipoSeleccionado.IteracionData.dtFechaInicio.split("T")[0] + "' readonly>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='iIdTFS' id='iIdTFS_0'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='' id='lAplicaMultiProceso_0'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='' id='iGrupo_0'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='iIdWBS' id='iIdWBS_0'>" +
										   "</td>" +
										   "<td hidden>" +
											   "<input type = 'number'  value='0' name='estaGuardado' id='estaGuardado_0'>" +
										   "</td>" +
										   "</tr>"));
	var analisis = parseInt($("#HibridoAnalisis").val());
	var diseño = parseInt($("#HibridoDiseño").val());
	var desarrollo = parseInt($("#HibridoDesarrollo").val());
	for (var i = 0; i < analisis; i++) {
		GenerarRowProcesosNuevo(1, iIdRQMGlobal, iIdPlanGlobal);
	}
	for (var i = 0; i < diseño; i++) {
		GenerarRowProcesosNuevo(2, iIdRQMGlobal, iIdPlanGlobal);
	}
	for (var i = 0; i < desarrollo; i++) {
		GenerarRowProcesosNuevo(3, iIdRQMGlobal, iIdPlanGlobal);
	}
	modoHibrido = true;
	//jsonTemporal.General.splice(1, 2);
	jsonTemporal.General = filtrarJsonTemporalParaHibrido(jsonTemporal.General, iIdPlanGlobal, iIdRQMGlobal)
	indiceGlobal = 0;
	arrWBS = filtrarArrWBSByModo(arrWBS, iIdPlanGlobal, iIdRQMGlobal, "Normal");
	jsonTemporal.General.push({
		iIdProceso: iIdProcesoGlobal,
		iIdRequerimiento: iIdRQMGlobal,
		iIdPlan: iIdPlanGlobal,
		htmlText: $("#datatable_ajax tbody").children(),
		users: arrUsuariosGlobal,
		longitud: $("#datatable_ajax tbody tr").length,
		guardado: true
	});
	GuardarWBS2(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
}

function filtrarJsonTemporalParaHibrido(data, plan, rqm) {
	return data.filter(
        function (data) { return data.iIdPlan != plan && data.iIdRequerimiento != rqm }
        );
}

function filtrarArrWBSByModo(data, plan, rqm, modo) {
	return data.filter(
        function (data) {
        	return data.iIdPlan != plan && data.iIdRequerimiento != rqm && data.Modo != modo
        }
        );
}

function filtrarArrPreview(data, plan, rqm) {
	return data.filter(
        function (data) {
        	return data.iIdPlan != plan && data.iIdRQM != rqm
        }
        );
}
function SeleccionarProyecto() {
	sProyecto = $("#modals2Proyecto option:selected").text();
	if (sProyecto != "") {
		$("#modalProyecto").hide();

		obtenerIteraciones();
		$("#UserImage").attr("src", arrUser[0].teamMember.imageUrl);
		$("#modalIteraciones").show();

	}
	else {
		Alertas(1, "Aviso", "Necesita Seleccionar un Proyecto");
	}

}
var Proyectos = new Array();
function SeleccionarColeccion() {
	sColeccion = $("#modals2Coleccion option:selected").text();
	coleccionElegida = $("#modals2Coleccion").val();
	if (coleccionElegida != "") {
		$(ColeccionesProyectos[coleccionElegida].Proyectos).each(function (index, domEle) {
			var elementoOption = $("<option class='form-control' value='" + index + "'>" + domEle + "</option>");
			$("#modals2Proyecto").append(elementoOption);
		})
		$("#modalColeccion").hide();
		$("#modals2Proyecto").select2({
			placeholder: "Seleccione una Proyecto",
			allowClear: true,
			width: '78%',
			dropdownParent: $("#modalProyecto")
		});
		$("#modalProyecto").show();
	}
	else {
		Alertas(1, "Aviso", "Seleccione una Coleccion");
	}



}

function agregarColecciones() {
	$(ColeccionesProyectos).each(function (index, domEle) {
		var elementoOption = $("<option class='form-control' value='" + index + "'>" + domEle.Nombre + "</option>");
		$("#modals2Coleccion").append(elementoOption);
	});
	$("#modals2Coleccion").select2({
		placeholder: "Seleccione una Coleccion",
		allowClear: true,
		width: '78%',
		dropdownParent: $("#modalColeccion")
	});
}

var arrIteraciones = new Array();
function obtenerIteraciones(proyecto, coleccion) {
	cadena = "";
	//sProyecto = "PRUEBASIAC";
	//sColeccion = "BLUEOCEAN";
	$.ajax({
		type: "POST",
		url: "../../Class/WBS.asmx/ObtenerIteraciones",
		async: false,
		data: '{"sProyecto": "' + sProyecto + '", "sColeccion": "' + sColeccion + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			try {
				getIterationIDTFS(JSON.parse(response.d))
				$(arrIteracionesPorUsuario).each(function (index, domEle) {
					//cadena += domEle.Nombre + "\n";
					var elementoOption = $("<option class='form-control' value='" + domEle.IdTFSIteracion + "'>" + domEle.NombreIteracion + "</option>");
					$("#modals2Equipo").append(elementoOption);
					//arrIteraciones.push(domEle);
				});
				//alert(cadena);
				$("#modals2Equipo").select2({
					placeholder: "Seleccione su Equipo",
					allowClear: true,
					width: '78%',
					dropdownParent: $("#modalSmElegirEquipo")
				});
				$("#modalIteraciones").show();
			} catch (e) {
				Alertas(2, "Error", "Eroor en la carga de datos")
				$("#modals2Equipo").select2({
					placeholder: "Seleccione su Equipo",
					allowClear: true,
					width: '78%',
					dropdownParent: $("#modalSmElegirEquipo")
				});
				$("#modalIteraciones").show();
			}

		},
		error: function (xhr, error) {
			//alert(xhr + " " + error);
			Alertas(2, "Error", "Error de carga de datos")
		}
	});
}


function AgregarUsuariosFiltrados(arrUsuarios) {
	$("#asignado option").remove();
	$("#revisor option").remove();
	var arrTemp = new Array();
	$(arrUsuarios.datosUsuario.value).each(function (index, domEle) {
		//var elementoOption = $("<option class='form-control' value='" + arrUsuariosTFSGlobal[domEle].iIdUsuario + "'>" + arrUsuariosTFSGlobal[domEle].cNombreUsuario + "</option>");
		var elementoOption = $("<option class='form-control' value='" + domEle.teamMember.id + "'>" + domEle.teamMember.displayName.split("<")[0].trim() + "</option>");
		$("#asignado").append(elementoOption);
		var elementoOption2 = $("<option class='form-control' value='" + domEle.teamMember.id + "'>" + domEle.teamMember.displayName.split("<")[0].trim() + "</option>");
		$("#revisor").append(elementoOption2);
		arrUsuariosGlobal.push({
			IdUsuario: domEle.teamMember.id,
			Nombre: domEle.teamMember.displayName.split("<")[0].trim()
		})
	});
	$("#asignado").val("").trigger("change");
	$("#revisor").val("").trigger("change");
}


function Colapsar(obj) {
	//debugger;
	var temp = obj.parentNode.parentNode.parentNode;
	var Nombre = $(temp).attr("name");
	var Padre = Nombre.split("_")[1];
	var todasFilas = document.querySelectorAll("tr[name$=ijo_" + Padre + "]");
	if ($(obj).attr("name") == "noColapsado") {
		$(todasFilas).each(function (index, domEle) {
			//debugger;
			$(domEle).css("display", "none");
		});
		$(obj).attr("class", "btn red")
		$(obj).attr("name", "Colapsado");
	}
	else {
		$(todasFilas).each(function (index, domEle) {
			//debugger;
			$(domEle).css("display", "");
		});
		$(obj).attr("class", "btn green")
		$(obj).attr("name", "noColapsado");
	}
}

function Deshabilitar(obj) {
	//debugger;
	var padre = obj.parentNode.parentNode.parentNode;
	var hijos = $(padre).children();
	if ($(obj).attr("name") == "Habilitado") {
		$(hijos).each(function (index, domEle) {
			$(domEle.children).prop('disabled', true);
		})
		$(padre).css("background", "#f00")
		$(obj).attr("name", "NoHabilitado")
		$(padre).addClass("Deshabilitado")
		$(obj).attr("class", "btn green")
	}
	else {
		$(hijos).each(function (index, domEle) {
			$(domEle.children).prop('disabled', false);
		})
		$(padre).css("background", "")
		$(obj).attr("name", "Habilitado")
		$(padre).addClass("Habilitado")
		$(obj).attr("class", "btn red")
	}
}
var arrProcesosPreview = new Array();
function Previsualizacion() {
	AgregarPreview(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
	//debugger;
	var arrTemp = new Array();
	var plan = $("#modalPreviewPlan").val();
	var rqm = $("#modalPreviewRQM").val();
	//var indice;
	$("#tablePreview tbody").html("");
	$(arrPreview).each(function (index, domEle) {
		if (domEle.iIdPlan == plan && domEle.iIdRQM == rqm) {
			$(domEle.Datos).each(function (indice, elemento) {
				var tblElemento = $("<tr>" +
                            "<td>" + elemento.proceso + "</td>" +
                            "<td>" + elemento.usuario + "</td>" +
                            "</tr>")
				$("#tablePreview tbody").append(tblElemento);
			});
		}
	});
	//$("#tablePreview, #modalPreviewPlan, #modalPreviewRQM").hide();

}

function previewCompleto() {
	AgregarPreview(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
	var arrTemp = arrPreview;
	//debugger;
	$("#divTree").html("");
	$("#divTree").append($("<div id='PreviewTree'>" +
                        "<ul>" +
                        "</ul>" +
                        "</div>"))
	var cCadenaFinal = "";
	//$("#iIdPlan option").each(function (indexPlan, domElePlan) {
	//	//debugger;
	//	if (domElePlan.value != "") {
	//		//var liElementPlan = $("<li>Plan " + domElePlan.value + "</li>");
	//		//$("#PreviewTree ul").append(liElementPlan);
	//		cCadenaFinal += "<li>Plan " + domElePlan.value + "<ul>";
	//		$("#iIdRequerimiento option").each(function (indexReq, domEleReq) {
	//			if (domEleReq.value != "") {
	//				//var liElementReq = $("<li>REQ " + domEleReq.value + "</li>");
	//				//$("#PreviewTree ul").append(liElementReq);
	//				cCadenaFinal += "<li>REQ " + domEleReq.value + "<ul>";
	//				$(arrTemp).each(function (indexArr, domEleArr) {
	//					if (domEleArr.iIdPlan == domElePlan.value && domEleArr.iIdRQM == domEleReq.value) {
	//						$(domEleArr.Datos).each(function (indexDatos, domEleDatos) {
	//							//var liElementDatos = $("<li>" + domEleDatos.proceso + " " + domEleDatos.usuario + "</li>")
	//							//$("#PreviewTree ul").append(liElementDatos);
	//							cCadenaFinal += "<li>" + domEleDatos.proceso + "<b> > </b>" + domEleDatos.usuario + "<b> > </b>"+domEleDatos.fechaFinal+"</li>";
	//						});
	//					}
	//				})
	//				cCadenaFinal += "</ul></li>";
	//			}
	//		});
	//		cCadenaFinal += "</ul></li>";
	//	}

	//});
	var arrTemp = new Array()
	$("#iIdPlan option").each(function (indexPlan, domElePlan) {
		if (domElePlan.value != "") {
			cCadenaFinal += "<li>Plan " + domElePlan.value + "<ul>";
			$("#iIdRequerimiento option").each(function (indexRqm, domEleRqm) {
				if (domEleRqm.value != "") {
					cCadenaFinal += "<li>REQ " + domEleRqm.value + "<ul>";

					arrTemp = FiltrarArrWbs(arrWBS, domElePlan.value, domEleRqm.value);

					$(arrTemp).each(function (indexRaiz, domEleRaiz) {
						$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
							var proceso, usuario, fechaFinal;
							$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
								if (indexHijos == 0) {
									proceso = domEleHijos.elementos[0].cTituloProceso;
									usuario = domEleHijos.elementos[0].cNombreUsuario;
								}
								fechaFinal = domEleHijos.elementos[0].dtFechaFinal
								//preview hacer y tener en cuenta los campos de ordenamiento(dtp, proceso, rqm y general o algo asi) e implmentarlo para el ordenamiento a nivel proceso
								//verificar que todo funcione junto con el modo hibrido

							})
							cCadenaFinal += "<li>" + proceso + "<b> > </b>" + usuario + "<b> > </b>" + fechaFinal + "</li>";
						})
					})
					cCadenaFinal += "</ul></li>";
				}
				

				//$("#iIdEtapas").each(function (indexProceso, domEleProceso) {
					

				//})
			})
			cCadenaFinal += "</ul></li>";
		}
		
	})
	$("#PreviewTree ul").append($(cCadenaFinal));
	$('#PreviewTree').jstree({
		"core": {
			"themes": {
				"responsive": false
			}
		},
		"types": {
			"default": {
				"icon": "fa fa-folder icon-state-warning icon-lg"
			},
			"file": {
				"icon": "fa fa-file icon-state-warning icon-lg"
			}
		},
		"plugins": ["types"]
	});
	$("#PreviewTree").jstree("open_all");
}

//function FiltrarArrWBS(data, code) {
//	return data.filter(
//        function (data) { return data.Nombre == code }
//        );
//}


var arrPreview = new Array();
var arrPlanTemp = new Array();
var arrRqmTemp = new Array();
function AgregarPreview(idPlan, idRQM, idProceso) {
	//debugger;
	//if ($("#datatable_ajax tbody tr").length != 0) {
	var nodoPadres = $(".primary");
	var arrTemp = new Array();
	var indice;
	$(nodoPadres).each(function (index, domEle) {
		var idPadre = $(domEle).attr("name").split("_")[1];
		var proceso = $(domEle).find("[id*=iIdDetalleProceso]").val();
		var usuario = $(domEle).find("[id*=iIdUsuarios]").attr("id");
		usuario = $("#" + usuario + " option:selected").text();
		var fecha = $("tr[name=ultimoHijo_" + idPadre + "]").find("input[id*=Fecha]").val();
		arrTemp.push({
			proceso: proceso,
			usuario: usuario,
			fechaFinal: fecha
		});
	});
	if (arrPreview.length != 0) {
		$(arrPreview).each(function (index, domEle) {
			if (domEle.iIdPlan == idPlan && domEle.iIdRQM == idRQM && domEle.iIdProceso == idProceso) {
				//debugger;
				indice = index;
			}
		});
	}
	if (indice != undefined) {
		arrPreview[indice].Datos = arrTemp.slice();
	}
	else {
		arrPreview.push({
			iIdPlan: idPlan,
			iIdRQM: idRQM,
			iIdProceso: idProceso,
			Datos: arrTemp.slice()
		});
		$("#modalPreviewPlan").html("");
		$("#modalPreviewRQM").html("");
		// debugger;
		$("#iIdPlan option").each(function (index, domEle) {
			//debugger;
			if (domEle.value != "") {
				var elemento = $("<option value='" + domEle.value + "'>" + domEle.value + "</option>");
				$("#modalPreviewPlan").append(elemento);
				//arrPlanTemp.push(domEle.value);
			}
		});
		$("#iIdRequerimiento option").each(function (index, domEle) {
			// debugger;
			if (domEle.value != "") {
				var elemento = $("<option value='" + domEle.value + "'>" + domEle.value + "</option>");
				$("#modalPreviewRQM").append(elemento);
				//arrRqmTemp.push(domEle.value);
			}
		});


	}
	//}
}


function AplicarNomenclatura() {
	var nomPrimary = $("#iIdNomenclaturaPrimary").val();
	var nomHijos = $("#iIdNomenclaturaHijos").val();
	if (nomPrimary != "" && nomHijos != "") {
		var rqm = iIdRQMGlobal;
		var nodosPrimary = $(".primary");
		var indice, indiceHijo;
		$(nodosPrimary).each(function (index, domEle) {
			indice = ((index + 1) < 10) ? "0" + (index + 1) : (index + 1);
			var nombre = $(domEle).find("[id^=iIdDetalleProceso]").val()
			$(domEle).find("[id^=iIdDetalleProceso]").val(nomPrimary + " " + rqm + " " + indice + "-" + nombre);
			var padre = $(domEle).attr("name").split("_")[1];
			var nodosHijos = $("tr.noprimary[name$=_" + padre + "]");
			$(nodosHijos).each(function (indexHijo, elementoHijo) {
				indiceHijo = ((indexHijo + 1) < 10) ? "0" + (indexHijo + 1) : (indexHijo + 1);
				var hijo = $(elementoHijo).find("[id^=iIdDetalleProceso]").val();
				$(elementoHijo).find("[id^=iIdDetalleProceso]").val(nomHijos + " " + rqm + " " + indice + "." + indiceHijo + "-" + hijo);
			});
		});
		$("#ModalNomenclatura").modal("hide");
	}
}

//coleccion: BLUEOCEAN
//Proyecto: PRUEBASIAC
var arrIteracionesPorUsuario = new Array();
var arrUser = new Array();
function getIterationIDTFS(data, code) {
	//data = filtrarIterationByDate(data)
	sUserName = "prueba2";
	sPassword = "Blue2016";
	$(data).each(function (index, domEle) {
		$.ajax({
			type: "POST",
			url: "../../Class/WBS.asmx/ObtenerCapacidadSprint",
			async: false,
			data: '{"_sSprint": "' + domEle.IdTFS + '", "_sUserName": "' + sUserName + '", "_sPassword": "' + sPassword + '", "_sProyecto": "' + sProyecto + '", "_sColeccion": "' + sColeccion + '"}',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				try {
					var respuesta = JSON.parse(response.d)
					var existe = filtrarIteracionesPorUsuario(respuesta.value, UniqueNameUsuario)
					arrUser = filtrarIteracionesPorUsuario(respuesta.value, UniqueNameUsuario);
					if (existe.length != 0) {
						arrIteracionesPorUsuario.push({
							datosUsuario: respuesta,
							IdTFSIteracion: domEle.IdTFS,
							NombreIteracion: domEle.Nombre,
							IteracionData: domEle
						});
					}
					console.log(respuesta);
				} catch (e) {
					Alertas(2, "Error", "Ocurrio un error en la consulta");
				}

			},
			error: function (xhr, estatus) {
				//alert("Error " + estatus);
				Alertas(2, "Error", "Error de carga de datos")
			}
		});
	});

}

function filtrarIteracionesPorUsuario(data, usuario) {
	return data.filter(
        function (data) {
        	return data.teamMember.uniqueName == usuario
        }
        );
}

function funcionfiltrar(data, code) {
	return data.filter(
        function (data) { return data.Nombre == code }
        );
}


function filtrarIterationByDate(data) {

	var fechainicio = new Date();
	var Month = fechainicio.getMonth();
	fechainicio.setMonth(Month - 2);

	fechainicio = Date.parse(fechainicio);

	var fechafinal = new Date();
	var Month = fechafinal.getMonth();
	fechafinal.setMonth(Month + 2);

	fechafinal = Date.parse(fechafinal);

	return data.filter(
        function (data) {
        	//debugger;
        	return (Date.parse(data.dtFechaInicio) >= fechainicio && Date.parse(data.dtFechaFinal) <= fechafinal)
        }
    )
}

function Getformulas() {
	var padres = $("tr.primary");
	getTiempoTotalProceso(padres);
	getOriginalEstimate(padres);
}

function getTiempoTotalProceso(padres) {

	$(padres).each(function (indexPadre, domElePadre) {
		var idPadre = $(domElePadre).attr("name").split("_")[1];
		var tamaño = 0;
		var rate = 0;
		$($("tr[name$=_" + idPadre + "]")).each(function (indexHijos, domEleHijos) {
			var tempTamaño = parseFloat($(domEleHijos).find("[id^=iIdTamano]").val());
			var tempRate = parseFloat($(domEleHijos).find("[id^=iIdRate]").val());
			tamaño += (isNaN(tempTamaño)) ? 0 : tempTamaño;
			rate += (isNaN(tempRate)) ? 0 : tempRate;
		})

		var tiempoTotalProceso = tamaño * rate;
		$(domElePadre).find("[id^=iIdTotalProceso]").val(tiempoTotalProceso);
	})
}

function getOriginalEstimate(padres) {
	$(padres).each(function (indexPadre, domElePadre) {
		var totalProceso = parseFloat($(domElePadre).find("[id^=iIdTotalProceso]").val());

		var nombrePadre = $(domElePadre).attr("name").split("_")[1];
		var hijos = $("tr.noprimary[name$=_" + nombrePadre + "]");
		$(hijos).each(function (indexHijo, domEleHijo) {
			var porcentajeTarea = parseFloat($(domEleHijo).find("[id^=iIdPorcentajeTareas_]").val());
			var originalEstimado = totalProceso * (porcentajeTarea / 100);
			$(domEleHijo).find("[id^=iIdEstimate_]").val(originalEstimado);
			$(domEleHijo).find("[id^=Remaining_]").val(originalEstimado);
		});
		$(domElePadre).find("[id*=Estimate]").val("0.0");
	});
}

function FiltrarArrWbs(data, plan, rqm) {
	return data.filter(
        function (data) { return data.iIdPlan == plan && data.iIdRequerimiento == rqm }
        );
}

var arrValoresGanados = new Array();
function calcularValorGanado() {
	var totalOriginalEstimado = 0;;
	arrValoresGanados = new Array();
	GuardarWBS2(iIdPlanGlobal, iIdRQMGlobal, iIdProcesoGlobal);
	var arrTemp = new Array();
	for (var i = 0; i < 2; i++) {
		$(arrWBS).each(function (indexRaiz, domEleRaiz) {
			if (domEleRaiz.iIdPlan == iIdPlanGlobal) {
				$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
					$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
						if (i == 0) {
							totalOriginalEstimado += parseFloat(domEleHijos.elementos[0].dOriginal_Estimate);
						}
						else {
							domEleHijos.elementos[0].dValor_ganado = (parseFloat(domEleHijos.elementos[0].dOriginal_Estimate) / totalOriginalEstimado) * 100;
							arrTemp.push(domEleHijos.elementos[0].dValor_ganado);
						}
					})
					if (i != 0) {
						arrValoresGanados.push({
							Plan: domEleRaiz.iIdPlan,
							Rqm: domEleRaiz.iIdRequerimiento,
							Proceso: domElementos.iIdProceso,
							Modo: domEleRaiz.Modo,
							ValoresGanados: arrTemp
						})
						arrTemp = new Array();
					}
				})
			}
		})
	}
	CalcularFechas();
	SetValoresGanadosToGrid(arrValoresGanados, arrFechasParaGrid)
}

function SetValoresGanadosToGrid(arrayValoresGanados, arrayFechas) {
	var arrFiltradoValGanado = new Array();
	var arrFiltradoFechas = new Array();
	var arrTempValoresGanados = new Array();
	var arrTempFechas = new Array();
	arrFiltradoValGanado = FiltrarArrValoresGanados(arrayValoresGanados);
	arrFiltradoFechas = (arrayFechas.length > 0) ? FiltrarArrFechas(arrayFechas) : new Array();

	var filasGrid = $("#datatable_ajax tbody tr[class*=primary]");
	$(arrFiltradoValGanado).each(function (index, domEle) {
		$(domEle.ValoresGanados).each(function (indexValores, domEleValores) {
			arrTempValoresGanados.push(domEleValores);
		})
	})
	$(arrFiltradoFechas).each(function (index, domEle) {
		$(domEle.Fechas).each(function (indexFechas, domEleFechas) {
			arrTempFechas.push(domEleFechas)
		})
	})

	$(filasGrid).each(function (index, domEle) {
		$(domEle).find("[id^=iIdValorGanado_]").val(arrTempValoresGanados[index]).trigger("change");
		if (arrTempFechas.length > 0) {
			$(domEle).find("[id^=Fecha_]").val(arrTempFechas[index].fechaInicial).trigger("change");
			$(domEle).find("[id^=FechaFinal_]").val(arrTempFechas[index].fechaFinal).trigger("change");
		}

	})
}

function FiltrarArrValoresGanados(data) {
	return data.filter(
        function (data) {
        	if (data.Modo == "Normal") {
        		return data.Plan == iIdPlanGlobal && data.Rqm == iIdRQMGlobal && data.Proceso == iIdProcesoGlobal
        	}
        	else {
        		return data.Plan == iIdPlanGlobal && data.Rqm == iIdRQMGlobal
        	}
        }
        );
}

function FiltrarArrFechas(data) {
	return data.filter(
        function (data) {
        	if (data.Modo == "Normal") {
        		return data.Plan == iIdPlanGlobal && data.Rqm == iIdRQMGlobal && data.Proceso == iIdProcesoGlobal
        	}
        	else {
        		return data.Plan == iIdPlanGlobal && data.Rqm == iIdRQMGlobal
        	}
        }
        );
}

function filtrarUsuariosById(data, id) {
	return data.filter(
        function (data) { return data.teamMember.id == id }
        );
}

var diasTrabajados = 0;
var horasRestantes = 0.0;
var restante = 0;
var contDias = 0;
var arrFechasUsuarios = new Array();
var arrFechasInhabiles = new Array();
var arrFechasParaGrid = new Array();
//si en el recorrido de los dias que trabajo se encuentra un dia inhabil se pasa por alto o se toma en cuenta y se salta??????.
function CalcularFechas() {
	var fechaInicial = arrEquipoSeleccionado.IteracionData.dtFechaInicio.split("T")[0];
	var ultimaFechaUsuario = fechaInicial;
	var primeraFechaUsuario;
	var arrUsuarioTemp = new Array();
	var ultimaFecha;
	var arrTemp = new Array();
	arrFechasParaGrid = new Array();
	try {
		$(arrWBS).each(function (indexRaiz, domEleRaiz) {
			if (domEleRaiz.iIdPlan == iIdPlanGlobal) {
				$(domEleRaiz.elementos).each(function (indexElementos, domElementos) {
					$(domElementos.Hijos).each(function (indexHijos, domEleHijos) {
						if (isNaN(domEleHijos.elementos[0].dValor_ganado) || domEleHijos.elementos[0].dValor_ganado === "") { throw ("Plan: " + domEleRaiz.iIdPlan + " RQM: " + domEleRaiz.iIdRequerimiento + " Proceso: " + domElementos.iIdProceso) }
						var arrFechasInhabilesByUsuario = new Array();
						arrUsuarioTemp = filtrarUsuariosById(arrEquipoSeleccionado.datosUsuario.value, domEleHijos.elementos[0].iIdUsuario);
						var capacidadTarea = parseFloat(domEleHijos.elementos[0].dOriginal_Estimate);
						var capacidadUsuario = calcularCapacidadUsuario(arrUsuarioTemp[0].activities);
						//var capacidadUsuario = 6.5;
						arrFechasInhabilesByUsuario = CalculateDaysOffFromRange(arrUsuarioTemp[0].daysOff)
						var arrTempFechaUsuario = filtrarArrFechasUsuario(arrFechasUsuarios, arrUsuarioTemp[0].teamMember.id)
						if (arrTempFechaUsuario.length > 0) {
							restante = arrTempFechaUsuario[0].restante;
							ultimaFechaUsuario = arrTempFechaUsuario[0].fechaEnCurso;
							primeraFechaUsuario = ultimaFechaUsuario;
						}
						else {
							ultimaFechaUsuario = fechaInicial;
							primeraFechaUsuario = ultimaFechaUsuario;
							restante = capacidadUsuario;
						}


						CalcularCapacidadByUsuario(capacidadTarea, capacidadUsuario);
						console.log(restante, diasTrabajados, arrUsuarioTemp[0].teamMember.displayName);

						if (diasTrabajados >= 1) {
							//date.toISOString().split("T")[0] //convertir Date to StringFormat(yyyy-mm-dd)
							ultimaFechaUsuario = new Date(ultimaFechaUsuario.replace(/-/g, "\/"));
							ultimaFechaUsuario = new Date(ultimaFechaUsuario.setDate(ultimaFechaUsuario.getDate() + (diasTrabajados)));
							//ultimaFechaUsuario = FiltrarFechaFinalOfInhabiles(ultimaFechaUsuario, arrFechasInhabilesByUsuario, diasTrabajados);
							ultimaFechaUsuario = FiltrarFechaFinalOfInhabiles(primeraFechaUsuario, arrFechasInhabilesByUsuario, diasTrabajados);
							//ultimaFechaUsuario = ultimaFechaUsuario.toISOString().split("T")[0];
							AgregarArrFechasUsuario(arrFechasUsuarios, arrUsuarioTemp[0].teamMember.id, arrUsuarioTemp[0].teamMember.displayName.split("<")[0].trim(), ultimaFechaUsuario, restante);
							domEleHijos.elementos[0].dtFechaFinal = ultimaFechaUsuario;
							domEleHijos.elementos[0].dtFecha_de_inicio = primeraFechaUsuario;
							arrTemp.push({
								fechaInicial: primeraFechaUsuario,
								fechaFinal: ultimaFechaUsuario
							});
							console.log(primeraFechaUsuario + " > " + ultimaFechaUsuario);
							contDias = 0;
							diasTrabajados = 0;
						}
						else {
							//ultimaFechaUsuario = FiltrarFechaFinalOfInhabiles(ultimaFechaUsuario.replace(/-/g, "\/"), arrFechasInhabilesByUsuario, diasTrabajados);
							ultimaFechaUsuario = FiltrarFechaFinalOfInhabiles(primeraFechaUsuario, arrFechasInhabilesByUsuario, diasTrabajados);
							AgregarArrFechasUsuario(arrFechasUsuarios, arrUsuarioTemp[0].teamMember.id, arrUsuarioTemp[0].teamMember.displayName.split("<")[0].trim(), ultimaFechaUsuario, restante);
							domEleHijos.elementos[0].dtFechaFinal = ultimaFechaUsuario;
							domEleHijos.elementos[0].dtFecha_de_inicio = primeraFechaUsuario;
							arrTemp.push({
								fechaInicial: primeraFechaUsuario,
								fechaFinal: ultimaFechaUsuario
							});
							console.log(primeraFechaUsuario + " > " + ultimaFechaUsuario);
							contDias = 0;
							diasTrabajados = 0;
						}
					})
					arrFechasParaGrid.push({
						Plan: domEleRaiz.iIdPlan,
						Rqm: domEleRaiz.iIdRequerimiento,
						Proceso: domElementos.iIdProceso,
						Fechas: arrTemp,
						Modo: domEleRaiz.Modo
					})
					arrTemp = new Array();
				})
			}
		})
		horasRestantes = 0.0;
		restante = 0;
		arrFechasUsuarios = new Array();
	} catch (e) {
		Alertas(1, e, "Hace falta introducir algunos datos");
	}

}

function calcularCapacidadUsuario(actividades) {
	
	var capacidad = 0;
	$(actividades).each(function (index, domEle) {
		capacidad += parseFloat(domEle.capacityPerDay);
	});
	return capacidad;
}

function AgregarArrFechasUsuario(data, usuario, nombreUsuario, fecha, tiemporestante) {
	var seEdito = false;
	data.filter(
        function (data) {
        	if (data.iIdUsuario == usuario) {
        		data.fechaEnCurso = fecha;
        		data.restante = tiemporestante;
        		seEdito = true;
        	}
        }
        );
	if (!seEdito) {
		arrFechasUsuarios.push({
			iIdUsuario: usuario,
			NombreUsuario: nombreUsuario,
			fechaEnCurso: fecha,
			restante: tiemporestante
		});
	}
}

function filtrarArrFechasUsuario(data, usuario) {
	return data.filter(
        function (data) { return data.iIdUsuario == usuario }
        );
}

function CalcularCapacidadByUsuario(capacidadTarea, capacidadUsuario) {
	
	//if (capacidadTarea > capacidadUsuario) {
	//    diasTrabajados = Math.ceil((capacidadTarea / capacidadUsuario) + horasRestantes);
	//    horasRestantes = parseFloat(((capacidadUsuario * (Math.ceil(capacidadTarea / capacidadUsuario))) - capacidadTarea).toFixed(1));
	//}
	//else if (capacidadTarea == 0) {
	//    diasTrabajados = 0;
	//} else {
	//    horasRestantes = capacidadUsuario - capacidadTarea;
	//    diasTrabajados = 1;
	//}

	//while (capacidadTarea >= capacidadUsuario) {
	//    if (restante != capacidadUsuario) {
	//        capacidadTarea = capacidadTarea - restante;
	//        contDias++;
	//        restante = capacidadUsuario;
	//    } else {
	//        capacidadTarea = capacidadTarea - restante;
	//        contDias++;
	//    }
	//}
	//if (capacidadTarea > 0) {
	//    contDias++;
	//}
	//restante = restante - capacidadTarea;


	while (capacidadTarea > 0) {
		restante = (restante == 0) ? capacidadUsuario : restante;
		capacidadTarea = capacidadTarea - restante;
		if (capacidadTarea > 0) {
			diasTrabajados++;
			restante = 0;
		}
		else {
			restante = parseFloat(Math.abs(capacidadTarea).toFixed(1));
		}
	}
}

arrDiasDisponibles = new Array();
function CalculateWeekendDays(fromDate, toDate) {
	var weekendDayCount = 0;
	while (fromDate < toDate) {
		fromDate.setDate(fromDate.getDate() + 1);
		if (fromDate.getDay() === 0 || fromDate.getDay() == 6) {
			++weekendDayCount;
		}
	}

	return weekendDayCount;
}

function CalculateDaysOffFromRange(daysOff) {
	var weekendDayCount = 0;
	var fromDate, toDate;
	var arrInhabilesTemp = new Array();
	$(daysOff).each(function (index, domEle) {
		fromDate = new Date(domEle.start.split("T")[0].replace(/-/g, "\/"));
		toDate = new Date(domEle.end.split("T")[0].replace(/-/g, "\/"));
		while (fromDate < toDate) {
			arrInhabilesTemp.push(fromDate.toISOString().split("T")[0])
			fromDate.setDate(fromDate.getDate() + 1);
			++weekendDayCount;
		}
		arrInhabilesTemp.push(fromDate.toISOString().split("T")[0])
	})


	return arrInhabilesTemp;
}
//Validando el pequeño bug aqui
function FiltrarFechaFinalOfInhabiles(fecha, inhabilesUsuario, diasATrabajar) {
	var contDias = 0;
	var fechaValida = false
	var esDiaInhabil;
	arrFechasInhabiles = new Array();
	$(arrEquipoSeleccionado.IteracionData.DiasInhabiles).each(function (index, ele) {
		arrFechasInhabiles.push(ele);
	});
	$(inhabilesUsuario).each(function (index, ele) {
		arrFechasInhabiles.push(ele);
	})

	do {
		//var fechaTemp = new Date(fecha)
		var fechaTemp = new Date((typeof fecha == "string") ? fecha.replace(/-/g, "\/") : fecha);
		fechaTemp = fechaTemp.toISOString().split("T")[0];
		esDiaInhabil = filtrarByFechasInhabiles(arrFechasInhabiles, fechaTemp);
		if (esDiaInhabil.length == 0) { 
			fechaTemp = new Date(fechaTemp.replace(/-/g, "\/"));
			//var temp = fechaTemp.getDay() + 1;
			var temp = fechaTemp.getDay();
			if (temp === 0 || temp == 6 || temp == 7) {
				fecha = new Date((typeof fecha == "string") ? fecha.replace(/-/g, "\/") : fecha);
				fecha.setDate(fecha.getDate() + 1);
				fecha = fecha.toISOString().split("T")[0];
				fechaValida = false;
			}
			else {
				if (diasATrabajar > 0) {
					fechaTemp.setDate(fechaTemp.getDate() + 1);
					fechaTemp = fechaTemp.toISOString().split("T")[0];
					fecha = fechaTemp
					fechaValida = false;
					diasATrabajar--;
				}
				else {
					fechaTemp = fechaTemp.toISOString().split("T")[0];
					fecha = fechaTemp
					fechaValida = true;
					//contDias++;
				}
				

			}

		}
		else {
			fecha = new Date((typeof fecha == "string") ? fecha.replace(/-/g, "\/") : fecha);
			fecha.setDate(fecha.getDate() + 1);
			fecha = fecha.toISOString().split("T")[0];
			fechaValida = false;
		}

	} while (diasATrabajar > 0 || !fechaValida);

	return fecha;
}

function filtrarByFechasInhabiles(data, fecha) {
	return data.filter(
        function (data) { return data == fecha }
        );
}

function Alertas(opcType, cabecero, message) {
	var type = ["teal", "tangerine", "ruby"]
	var settings = {
		theme: type[opcType],
		sticky: false,
		horizontalEdge: "bottom",
		verticalEdge: "right",
		heading: cabecero,
		life: 5000
	}, $button = $(this);


	$.notific8('zindex', 11500);
	$.notific8($.trim(message), settings);

	$button.attr('disabled', 'disabled');

	setTimeout(function () {
		$button.removeAttr('disabled');
	}, 1000);

}

function CambiarTituloProceso(obj) {
	var Nombre = $(obj).val();
	var padre = obj.parentNode.parentNode;
	$(padre).find("[id*=iIdDetalleProceso_]").val(Nombre).trigger("change");
}