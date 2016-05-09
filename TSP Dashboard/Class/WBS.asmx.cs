using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script;
using System.Web.Script.Services;

namespace TSP_Dashboard.Class
{
    /// <summary>
    /// Summary description for WBS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WBS : System.Web.Services.WebService
    {
        double dHorasAcumuladas = 0.0;
        string cAnalisis = "Análisis,Plan,Entendimiento,Elaborar Caso de Uso,Review de Caso de Uso,Elaborar Plan de Pruebas,Review de Plan de Pruebas,Peer Review de Caso de Uso y Plan de Pruebas,Validación de Caso de Uso y Plan de Pruebas,Postmortem";
        string cDiseno = "Diseño,Plan,Elaboración de Storyboard,Review Storyboard,Peer Review Storyboard,Elaboración de E-R,Review de E - R,Peer Review de E-R,Postmortem";
        string cFechaVigencia = "Fecha de Vigencia,Plan,Elaboración,Review de Código,Ejecutar Plan de Pruebas,Peer Review de Código,Postmorten";
        string cSeleccionarGanador = "Seleccionar Ganador,Plan,Elaboración de código, Review de Código,Ejecutar Plan de Pruebas,Peer Review de Código, Postmorten,Ejecutar plan de pruebas en ambiente de pruebas";

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GenerarRowProceso(int iIdProceso)
        {

            string htmlRow = "";
            ArrayList datosProceso = new ArrayList();
           string lVisible = "number";
            string cUsuarios = "<select name = 'order_status' class='form-control form-filter input-sm'><option value = ''> Select...</option >";
            Array aProceso = (iIdProceso == 1) ? cAnalisis.Split(',') : cDiseno.Split(',');

            switch (iIdProceso)
            {
                case (1):
                    aProceso = cAnalisis.Split(',');
                    break;
                case (2):
                    aProceso = cDiseno.Split(',');
                    break;
                case (3):
                    aProceso = cFechaVigencia.Split(',');
                    break;
                case (4):
                    aProceso = cSeleccionarGanador.Split(',');
                    break;

            }

            
            htmlRow = ContenedorSuperior();
            htmlRow += Encabezado();
            foreach (var item in aProceso)
            {
                datosProceso.Add(item);
            }
            using (var ctx = new TSPDAO.TSPDBContext())
            {
                foreach (var us in ctx.Usuario.ToList())
                {
                    cUsuarios += "<option value=" + us.cClaveUsuario + " " + us.cNombreUsuario + "</option>";

                }
            }
            cUsuarios += "</select>";
            foreach (var item in datosProceso)
            {
                if(item.ToString() != "Análisis" && item.ToString() != "Diseño" && item.ToString() != "Fecha de Vigencia" && item.ToString() != "Seleccionar Ganador")
                {                                    
                 lVisible= "hidden";
                }
                htmlRow += ("<tr role = 'row' class='filter'>" +
                                   "<td>" +
                                   "</td>" +
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdComponent_"+ item.ToString().Replace(" ","_") + "'>" +
                                   "</td>" +

                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdTipoInspeccion_" + item.ToString().Replace(" ", "_") + "'>" +
                                   "</td>" +                          
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_customer_name' id='iIdTitle_" + item.ToString().Replace(" ", "_") + "' value='" + item.ToString() + "'>" +
                                   "</td>" +
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' id='iIdWork_" + item.ToString().Replace(" ", "_") + "' name='order_ship_to'>" +
                                   "</td>" +
                                   "<td>" +
                                       "<select name = 'order_status' class='form-control form-filter input-sm'>" +
                                           "<option value = '' >Select...</ option >" +
                                       "<option value='Cancel'>Elias Emanuel Perez Mena</option>" +
                                       "<option value = 'Cancel' >Aaron Arturo Valdez Avila</option>" +
                                        "<option value = 'Cancel' > Rey Gonzalo Jesus Ruiz Mijangos</option>" +
                                       "<option value = 'Close' >Fredel Reynel Pacheco Caamal</option>" +
                                        "</select>" +
                                   "</td>" +
                                       "<td>" +
                                      "<input type = 'number' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='Remaining_" + item.ToString().Replace(" ", "_") + "'>" +
                                  "</td>" +
                                      "<td>" +
                                       "<input type = 'number' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdEstimate_" + item.ToString().Replace(" ", "_") + "'>" +
                                 "</td>" +
                                "<td>" +
                                     "<input type ="+ lVisible + " step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdTotalProceso_" + item.ToString().Replace(" ", "_") + "' onchange='PorcentajeDeTareas(this.id)' > " +
                                  "</td>"+
                                    "<td>" +
                                     "<input type = 'number' step='0.1' min='0'  value='0'  class='form-control form-filter input-sm' name='order_id' id='iIdPorcentajeTareas_" + item.ToString().Replace(" ", "_") + "' onchange='PorcentajeDeTareas(this.id)'>" +
                                  "</td>" +
                                    "<td>" +
                                    "<input type = 'number' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdTamano_" + item.ToString().Replace(" ", "_") + "'>" +
                                  "</td>" +
                                  "<td>" +
                                     "<input type = 'number' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdRate_" + item.ToString().Replace(" ", "_") + "'>" +
                                 "</td>" +
                                   "<td>" +
                                      "<input type = 'number' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanado_" + item.ToString().Replace(" ", "_") + "'>" +
                                 "</td>" +
                                    "<td>" +
                                     "<input type = 'number' min='0' max='21'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdSemana_" + item.ToString().Replace(" ", "_") + "'>" +
                                  "</td>" +
                                   "<td>" +
                                       "<input type = 'number' step='0.1' min='0'  value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoAcumulado_" + item.ToString().Replace(" ", "_") + "'>" +
                                 "</td>" +
                                     "<td>" +
                                     "<input type = 'number' step='0.1' min='0'   value='0' class='form-control form-filter input-sm' name='order_id' id='iIdValorGanadoSemanal_" + item.ToString().Replace(" ", "_") + "'>" +
                                  "</td>" +
                                   "<td>" +
                                      "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdTipoTarea_" + item.ToString().Replace(" ", "_") + "'>" +
                               "</td>" +
                                     "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdUnidadMedida_" + item.ToString().Replace(" ", "_") + "'>" +
                                   "</td>" +
                                          "<td>" +
                                      "<input type = 'text' class='form-control form-filter input-sm' name='order_id' id='iIdfechaInicio_" + item.ToString().Replace(" ", "_") + "'>" +
                               "</td>" +
                                     "<td>" +
                                       "<input type = 'number'  step='0.1' min='0' value='0' class='form-control form-filter input-sm' name='order_id' id='iIdHorasAcumuladas_" + item.ToString().Replace(" ", "_") + "'>" +
                                   "</td>" +
                               "</tr>");
               
            }
            lVisible = "number";
            htmlRow += ContenedorInferior();
            return htmlRow;


        }

        public string Encabezado()
        {

            string htmlEncabezado = "";
             htmlEncabezado =  "<tr role = 'row' class='heading'>"+
									"<th width = '2%' >"+

                                        "<input type='checkbox' class='group-checkable'>"+
									"</th>"+
                                	"<th width = '5%' >"+
                                        "Componente"+
                                    "</th >"+

                                    "<th width='10%'>"+
										"Tipo de Inspección"+
                                    "</th>"+							

                                    "<th width='30%'>"+
										" Title"+
                                    "</th>"+
									"<th width = '18%' >"+
                                       " Work Item Type"+

                                    "<th width= '18%' >"+
                                        " Assigned To"+
                                    "</th>"+
									"<th width = '24%' >"+
                                        " Remaining Work"+
                                    "</th>"+
									"<th width = '10%' >"+
                                        " Original Estimate"+
                                    "</th>"+
                                    "<th width = '10%' >"+
                                        " Tiempo Total del proceso"+
                                    "</th>"+
                                    "<th width = '10%' >"+
                                        " Porentaje de tareas"+
									"</th>"+
                                       "<th width = '10%' >"+
                                        " Tamaño"+
                                    "</th >"+
                                         "<th width= '10%' >"+
                                         "Rate"+
                                    "</th >"+
                                         "<th width= '10%' >"+
                                       "  Valor ganado"+
                                    "</th>"+
                                    	"</th>"+
                                         "<th width = '10%' >"+
                                        " Semana"+
                                    "</th >"+
                                         "<th width= '10%' >"+
                                       "  Valor ganado acumulado"+
									"</th>"+                                       
                                         "<th width = '10%' >"+
                                        " Valor ganado semanal"+
									"</th>"+
                                         "<th width = '10%' >"+
                                         "Tipo de tarea"+
									"</th>"+
                                         "<th width = '10%' >"+
                                        " Unidad de medida"+
                                    "</th>" +
                                    		"</th>"+
                                         "<th width = '10%' >"+
                                        " Fecha de inicio"+
                                    "</th>"+
                                     "<th width = '10%' >" +
                                        " Horas Acumuladas" +
                                    "</th>" +

                                "</tr>";
            return htmlEncabezado;
        }


        public string ContenedorSuperior()
        {
            string htmlContenedor = "";

            htmlContenedor = "<div style='overflow-x:scroll;overflow-y:scroll'><div class='table-container'  style='width:2200px;height:450px'>" +
								"<div class='table-actions-wrapper-assignate'>"+
									"<span>"+
									"</span>"+
                                    "<select class='table-group-action-input form-control input-inline input-small input-sm' id='iIdUsuario' onchange='GenerarRowProcesos(this.value)'>" +
										"<option value = '' >Select...</ option >"+
                                        "<option value='1'>Análisis</option>"+
										"<option value = '2' >Diseño</ option >"+
                                        "<option value='3'>Desarrollo</option>" +
										"<option value = '4' >Seleccionar Ganador</ option >"+ 
                                     "</select >"+ 
                                "</div>" +
                                "<table class='table table-striped table-bordered table-hover' id='datatable_ajax' >" +
                                "<thead>";					

                                    
            return htmlContenedor;


        }

        public string ContenedorInferior()
        {
            string htmlContenedor = "";

            htmlContenedor =   "</thead>"+
                                "<tbody>"+
                                "</tbody>"+
                                "</table>"+                                 
                              "</div></div><br></br><br></br>";

            return htmlContenedor;   
        }


        [WebMethod]
        public double OriginalEstimate(double dTiempoTotalDelProceso = 0.0, double dPorcentajeDeTarea = 0.0)
        {
            double dOriginalEstimate = 0.0;

            dOriginalEstimate = dTiempoTotalDelProceso * (dPorcentajeDeTarea / 100);
            dHorasAcumuladas = HorasAcumuladas(dOriginalEstimate);
            return dOriginalEstimate;
        }
        [WebMethod]
        public double ValorGanadoAcumulado(double dValorGanado)
        {

            double dSumaValorGanadoAcumulado = ++dValorGanado;

            return dSumaValorGanadoAcumulado;

        }
        [WebMethod]
        public double HorasAcumuladas(double dOriginalEstimate)
        {
            double dHorasAcumuladas = ++dOriginalEstimate;

            return dHorasAcumuladas;
        }
        [WebMethod]
        public string Proceso(string cIdProceso)
        {
        string cProceso = "";
            switch (cIdProceso)
            {
                case ("Análisis"):
                    cProceso = cAnalisis.Replace(" ", "_");
                    break;
                case ("Diseño"):
                    cProceso = cDiseno.Replace(" ", "_");
                    break;
                case ("Fecha_de_Vigencia"):
                    cProceso = cFechaVigencia.Replace(" ", "_");
                    break;
                case ("Seleccionar_Ganador"):
                    cProceso = cSeleccionarGanador.Replace(" ", "_");
                    break;

            }

            return cProceso;
        }

    }


}
