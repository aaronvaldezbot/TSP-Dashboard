var cIdProcesoGlobal = "";
jQuery(document).ready(function () {

    GenerarRowProcesos(1);
    $("#iIdPorcentajeTareas_Análisis").on('change', function (e) {
        PorcentajeDeTareas();
    });

});



function GenerarRowProcesos(iIdProceso)
{
    var $rowProcesos = $('ul.rowProceso');
    $.ajax({
        type: "POST",
        url: "../../Class/WBS.asmx/GenerarRowProceso",
        data: '{"iIdProceso":"' + iIdProceso + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $rowProcesos.html("");
            $rowProcesos.append(response.d);
       
        }
    });
}

function PorcentajeDeTareas(cIdTitle)
{  
    var rowEstimate = '#iIdEstimate_';
    var rowTiempoTotalProcesos = $('#iIdTotalProceso_' + ObtenerProceso(cIdTitle.replace("iIdPorcentajeTareas_", ""))).val();
    var rowPorcentajeTarea = $('#' + cIdTitle).val();
    var dOriginalEstimate = rowTiempoTotalProcesos * (rowPorcentajeTarea / 100);

    $(rowEstimate + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dOriginalEstimate);
    var dHoras =HorasAcumuladas( cIdTitle.replace("iIdPorcentajeTareas_", ""));
    $('#iIdHorasAcumuladas_' + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dHoras);

}

function HorasAcumuladas(cIdProceso)
{
    var cProceso = "";
    var dHorasAcumularas = 0;

    $.ajax({
        type: "POST",
        url: "../../Class/WBS.asmx/Proceso",
        async: false,
        data: '{"cIdProceso":"' + cIdProcesoGlobal + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            cProceso = response.d;
        }
    });
    $(cProceso.split(',')).each(function (index, domEle) {
        dHorasAcumularas = parseFloat(parseFloat(dHorasAcumularas) + parseFloat($('#iIdEstimate_' + domEle.replace(" ", "_")).val()));
    });
  return dHorasAcumularas;

}

function ObtenerProceso(cIdProceso)
{
    switch (cIdProceso) {
        case ("Análisis"):
            cIdProcesoGlobal = "Análisis";
            break;
        case ("Diseño"):
            cIdProcesoGlobal = "Diseño";
            break;
        case ("Desarrollo"):
            cIdProcesoGlobal = "Desarrollo";
            break;
        case ("Seleccionar_Ganador"):
            cIdProcesoGlobal = "Seleccionar_Ganador";
            break;
    }
    return cIdProcesoGlobal;

}



