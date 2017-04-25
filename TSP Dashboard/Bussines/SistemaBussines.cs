using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSP_Dashboard.Models;

namespace TSP_Dashboard.Bussines
{
    public class SistemaBussines
    {
        TSP_DEVEntities con = new TSP_DEVEntities();
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
            return tbIdSistema;
        }
    }
}