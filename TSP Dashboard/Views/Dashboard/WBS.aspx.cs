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

namespace TSP_Dashboard.Views.Dashboard
{
    public partial class WBS : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //GenerarRowProceso(1);
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string GenerarRowProceso(int iIdProceso)
        {

            string htmlRow = "";
            ArrayList datosProceso = new ArrayList();
            string cAnalisis = "Análisis,  Plan,  Entendimiento,  Elaborar Caso de Uso,  Review de Caso de Uso,  Elaborar Plan de Pruebas,  Review de Plan de Pruebas,  Peer Review de Caso de Uso y Plan de Pruebas,  Validación de Caso de Uso y Plan de Pruebas,  Postmortem";
            string cDiseno = "Diseño,  Plan,  Elaboración de Storyboard,  Review Storyboard,  Peer Review Storyboard,  Elaboración de E-R,  Review de E - R,  Peer Review de E-R,  Postmortem";
          
                Array aProceso = (iIdProceso == 1)? cAnalisis.Split(',') : cDiseno.Split(',');

            foreach(var item in aProceso)
            {
                datosProceso.Add(item);
            }         

            foreach(var item in datosProceso)
            {
                htmlRow += ("<tr role = 'row' class='filter' style='width:750px'>" +
                                   "<td>" +
                                   "</td>" +
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                   "</td>" +

                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                   "</td>" +
                                  "<td>" +
                                       "<div class='input-group date date-picker margin-bottom-5' data-date-format='dd/mm/yyyy'>" +
                                           "<input type = 'text' class='form-control form-filter input-sm' readonly name='order_date_from' placeholder='From'>" +
                                           "<span class='input-group-btn'>" +
                                           "<button class='btn btn-sm default' type='button'><i class='fa fa-calendar'></i></button>" +
                                           "</span>" +
                                       "</div>" +

                                   "</td>" +
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_customer_name' name='" + item + "'>" +
                                   "</td>" +
                                   "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_ship_to'>" +
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
                                       "< td>" +
                                      "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                      "< td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                 "</td>" +
                                    "< td>" +
                                     "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                    "< td>" +
                                     "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                    "< td>" +
                                    "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                  "< td>" +
                                     "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                 "</td>" +
                                   "< td>" +
                                      "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                 "</td>" +
                                    "< td>" +
                                     "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                   "< td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                 "</td>" +
                                     "< td>" +
                                     "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                  "</td>" +
                                   "<td>" +
                                      "< input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                               "</td>" +
                                     "<td>" +
                                       "<input type = 'text' class='form-control form-filter input-sm' name='order_id'>" +
                                   "</td>" +
                               "</tr>");
            }
           

            return htmlRow;


        }



    }
}