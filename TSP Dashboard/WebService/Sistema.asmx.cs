using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using TSP_Dashboard.Bussines;

namespace TSP_Dashboard.WebService
{
    /// <summary>
    /// Summary description for Sistema
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Sistema : System.Web.Services.WebService
    {

        [WebMethod]
        public string ObtenerNombreSistemas()
        {
            List<string> lstNombreSistema = new List<string>();
            SistemaBussines daoWBS = new SistemaBussines();
            lstNombreSistema = daoWBS.ObtenerNombreSistema();
            string cNombreSistema = "";
            int icontador = 1;
            foreach (var item in lstNombreSistema)
            {
                if (icontador < lstNombreSistema.Count())
                {
                    cNombreSistema += item + ",";
                }
                else
                {
                    cNombreSistema += item;
                }
                icontador++;
            }
            return cNombreSistema;
        }

        [WebMethod]
        public string ObtenerIdSistemas()
        {
            List<int> lstIdSistema = new List<int>();
            SistemaBussines daoWBS = new SistemaBussines();
            lstIdSistema = daoWBS.ObtenerIdSistema();
            string cIdSistema = "";
            int icontador = 1;
            foreach (var item in lstIdSistema)
            {
                if (icontador < lstIdSistema.Count())
                {
                    cIdSistema += item + ",";
                }
                else
                {
                    cIdSistema += item;
                }
                icontador++;
            }
            return cIdSistema;
        }
    }
}
