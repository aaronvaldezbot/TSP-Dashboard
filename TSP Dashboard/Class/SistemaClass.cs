using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using TSP_Dashboard.Bussines;
using TSP_Dashboard.Models;

namespace TSP_Dashboard.Class
{
    public class SistemaClass
    {

        TSP_DEVEntities con = new TSP_DEVEntities();

        /// <summary>
        /// Metodo para obtener los nombres de los sistemas que hay en la base de datos
        /// </summary>
        /// <returns>regresa una lista de string en la cual estan almacenados los nombres de los sistemas</returns>
        [WebMethod]
        public string ObtenerNombreSistema()
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