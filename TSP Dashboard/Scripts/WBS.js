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
    var rowTiempoTotalProcesos = $('#iIdTotalProceso_').val();
    var rowPorcentajeTarea = $('#' + cIdTitle).val();
    var dOriginalEstimate = rowTiempoTotalProcesos * (rowPorcentajeTarea / 100);
        var dOriginalEstimate = rowTiempoTotalProcesos * (rowPorcentajeTarea / 100);

    $(rowEstimate + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(dOriginalEstimate);
    $('#iIdHorasAcumuladas_' + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(HorasAcumuladas(cIdTitle.replace("iIdPorcentajeTareas_", "")));
    //$.ajax({
    //    type: "POST",
    //    url: "../../Class/WBS.asmx/OriginalEstimate",
    //    async: false,
    //    data: '{"dTiempoTotalDelProceso":"' + rowTiempoTotalProcesos + '", "dPorcentajeDeTarea":"' + rowPorcentajeTarea + '"}',
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {
    //        $(rowEstimate + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(response.d);
    //        //$('#iIdHorasAcumuladas_' + cIdTitle.replace("iIdPorcentajeTareas_", "")).val(response.d);
    //    }
    //});
}

function HorasAcumuladas(cIdProceso)
{
    //var cProceso = "";
    //var dHorasAcumularas = 0;
    //$.ajax({
    //    type: "POST",
    //    url: "../../Class/WBS.asmx/Proceso",
    //    async: false,
    //    data: '{"cIdProceso":"' + cIdProceso + '"}',
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {
    //        cProceso = response.d;
    //    }
    //});
    //$(cProceso.split(',')).each(function (index, domEle) {
    //    dHorasAcumularas = dHorasAcumularas + $('#iIdEstimate_' + domEle.replace(" ","_")).val();
    //});
    
    var analisis = $('#iIdEstimate_Análisis').val();
    var plan = $('#iIdEstimate_Plan').val();
    var Entendi =$('#iIdEstimate_Entendimiento').val();
    var elabora =$('#iIdEstimate_Elaborar_Caso_de_Uso').val();
    var reviw =$('#iIdEstimate_Review_de_Caso_de_Uso').val();
    var plan_pruebas = $('#iIdEstimate_Elaborar_Plan_de_Pruebas').val();
    var reviewPlan =$('#iIdEstimate_Review_de_Plan_de_Pruebas').val();
    var peer =$('#iIdEstimate_Peer_Review_de_Caso_de_Uso_y_Plan_de_Pruebas').val();
    var vali =$('#iIdEstimate_Validación_de_Caso_de_Uso_y_Plan_de_Pruebas').val();
    var post = $('#iIdEstimate_Postmortem').val();
    dHorasAcumularas = parseFloat(analisis) + parseFloat(plan) + parseFloat(Entendi) + parseFloat(elabora) + parseFloat(reviw) + parseFloat(plan_pruebas) + parseFloat(reviewPlan) + parseFloat(peer) + parseFloat(vali) + parseFloat(post);
    return dHorasAcumularas;

}
//function OnSuccess(response) {
//    var $rowProcesos = $('ul.rowProceso');
//    $rowProcesos.append(response.d);//Datos[0].htmlinput
//}
