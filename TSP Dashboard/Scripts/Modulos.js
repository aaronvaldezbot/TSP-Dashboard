jQuery(document).ready(function () {
    console.log(localStorage.getItem("IdSistema"));
    obtenerSistemas();
    obtenerModulos(localStorage.getItem("IdSistema"), localStorage.getItem("NombreSistema"));

});

function obtenerModulos(idSistema, nombreSistema) {
    sessionStorage.setItem("IdSistema", idSistema);
    sessionStorage.setItem("NombreSistema", nombreSistema);
    var cNombreModulo = "";
    var cIdModulo = "";
    $.ajax({
        type: "POST",
        url: "../../Class/WBS.asmx/ObtenerNombreModulos",
        async: false,
        data: "{'IdSistema': '" + idSistema + "'}",
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
						+ "<div class='display'>"
							+ "<div class='number'>"
								+ "<h3 class='font-red-haze'>" + cIdModulo[index] + "</h3>"
								+ "<small>" + domEle + "</small>"
							+ "</div>"
							+ "<div class='icon'>"
								+ "<i class='icon-like'></i>"
							+ "</div>"
						+ "</div>"
						+ "<div class='progress-info'>"
							+ "<div class='progress'>"
								+ "<span style='width: 85%;' class='progress-bar progress-bar-success red-haze'>"
								+ "<span class='sr-only'>85% change</span>"
								+ "</span>"
							+ "</div>"
							+ "<div class='status'>"
								+ "<div class='status-title'>"
									 + "change"
								+ "</div>"
								+ "<div class='status-number'>"
									 + "85%"
								+ "</div>"
							+ "</div>"
						+ "</div>"
					+ "</div>"
				+ "</div>");
        $("#Modulos").append(elementoOption);
    });
}