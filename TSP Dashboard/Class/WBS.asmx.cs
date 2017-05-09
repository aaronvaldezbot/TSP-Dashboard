using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using TSP_Dashboard.Models;
using TSP_Dashboard.Bussines;
using System.Text;
using System.Net;
using System.IO;
using System.Web.Script.Services;
using TSP_Dashboard.DTO;
using TSP_Dashboard.ClasesWBS;

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

        TSP_DEVEntities con = new TSP_DEVEntities();

        [WebMethod]
        public string GenerarRowProceso(int iIdProceso, int iIdRQM,int iIdPlan, bool hibrido)
        {

            string htmlRow = "";
            ArrayList datosProceso = new ArrayList();
            WBSBussines daoWBS = new WBSBussines();
            List<tblCat_Proceso> lstTitle = daoWBS.ObtenerTitle(iIdProceso);
            List<tblCat_DetalleProceso> lstdetProceso = daoWBS.ObtenerProcesoNuevo(iIdProceso);
            Generico.Generico gen = new Generico.Generico();
            List<tblCat_WBS> lstWBS = ObtenerRequerimiento(iIdProceso, iIdRQM, iIdPlan);
			List<tblCat_TipoTarea> lstTipoTarea = daoWBS.ObtenerTipoTarea();
            //if (lstWBS.Count < 1)
            //{
            //    return htmlRow;
            //}
            //else
            //{
                htmlRow = gen.ContenedorGrid(lstTitle, lstdetProceso, lstWBS, lstTipoTarea, hibrido);
                return htmlRow;
            //}
            

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
        public string Proceso(int cIdProceso)
        {
            List<tblCat_Proceso> lstTitle = new List<tblCat_Proceso>();
            WBSBussines daoWBS = new WBSBussines();
            lstTitle = daoWBS.ObtenerTitle(cIdProceso);
            string cProceso = "";
            int icontador = 1;
            foreach (var item in lstTitle)
            {
                if (icontador < lstTitle.Count())
                    cProceso += item.iIdProceso + ",";
                else
                    cProceso += item.iIdProceso;

                icontador++;
            }

            return cProceso;
        }

        /// <summary>
        /// WebMethod para obtener las etapas de la BD
        /// </summary>
        /// <returns>una cadena con todos los registros pedidos separados por una coma(,)</returns>
        [WebMethod]
        public string Etapa()
        {
            List<tblCat_Proceso> lstProceso = new List<tblCat_Proceso>();
            WBSBussines daoWBS = new WBSBussines();
            lstProceso = daoWBS.ObtenerEtapas();
            string cVerificar = "";
            string Procesos = "{'Proceso': [";
            int icontador = 1;
            foreach (var item in lstProceso)
            {
                if (icontador < lstProceso.Count())
                {
                    Procesos += "{'iIdProceso': '"+item.iIdProceso + "','cNombreProceso': '"+item.cNombreProceso+"'},";
                }
                else
                {
                    cVerificar = item.cNombreProceso + "";
                    Procesos += "{'iIdProceso': '" + item.iIdProceso + "','cNombreProceso': '" + item.cNombreProceso + "'}]}";
                }
                icontador++;




                //if (icontador < lstProceso.Count())
                //{
                //    cDetalleProceso += item.cNombreProceso + ",";
                //}
                //else
                //{
                //    cVerificar = item.cNombreProceso + "";
                //    cDetalleProceso += item.cNombreProceso;
                //}
                //icontador++;

            }
            return Procesos;
        }

        /// <summary>
        /// WebMethod para obtener los requerimientos de la BD
        /// </summary>
        /// <returns>una cadena con todos los registros pedidos separados por una coma(,)</returns>
        [WebMethod]
        public string Requerimiento(int iIdPlan)
        {
            List<int> lstRequerimiento = new List<int>();
            WBSBussines daoWBS = new WBSBussines();
            lstRequerimiento = daoWBS.ObtenerRequerimiento(iIdPlan);
            string cRequerimiento = "";
            int icontador = 1;
            foreach (var item in lstRequerimiento)
            {
                if (icontador < lstRequerimiento.Count())
                {
                    cRequerimiento += item + ",";
                }
                else
                {
                    cRequerimiento += item;
                }
                icontador++;
            }
            return cRequerimiento;
        }


        [WebMethod]
        public bool Guardar(string ValorCampo, string NombreCampo)
        {
            tblCat_WBS tblWBS = new tblCat_WBS();
            Array lstWBS = ValorCampo.Split(',');
            return true;
        }


        public List<tblCat_WBS> ObtenerRequerimiento(int iIdProceso, int iIdRQM, int iIdPlan)
        {
            WBSBussines daoWBS = new WBSBussines();
            List<tblCat_WBS> lstWBS = daoWBS.ObtenerWBS(iIdRQM, iIdProceso, iIdPlan);

            return lstWBS;
        }

        /// <summary>
        /// Metodo para guardar los datos que se encuentran en el table.
        /// </summary>
        /// <param name="obj">Es un objeto JSON ya contruido con los datos que se necesitan insertar</param>
        [WebMethod]
        public void GuardarWBS(tblCat_WBS[] obj)
        {
            WBSBussines daoWBS = new WBSBussines();
            for(var i = 0; i < obj.Length; i++)
            {
                var WBS = new tblCat_WBS
                {
                    iIdUsuario = obj[i].iIdUsuario,
                    iIdProcesos = obj[i].iIdProcesos,
					iTipoElemento = obj[i].iTipoElemento,
                    iRequerimiento = obj[i].iRequerimiento,
                    cWork_Item_Type = obj[i].cWork_Item_Type,
                    iIdDetalleProceso = obj[i].iIdDetalleProceso,
                    dRemaining_Work = obj[i].dRemaining_Work,
                    dOriginal_Estimate = obj[i].dOriginal_Estimate,
                    dTiempo_Total_del_proceso = obj[i].dTiempo_Total_del_proceso,
                    dPorcentaje_de_tareas = obj[i].dPorcentaje_de_tareas,
                    dtamanios = obj[i].dtamanios,
                    dRate = obj[i].dRate,
                    dValor_ganado = obj[i].dValor_ganado,
                    isemana = obj[i].isemana,
						dValor_ganado_acumulado = obj[i].dValor_ganado_acumulado,
						dValor_ganado_semanal = obj[i].dValor_ganado_semanal,
                    iIdTipoTarea = obj[i].iIdTipoTarea,
                    cUnidad_de_medida = obj[i].cUnidad_de_medida,
                    dtFecha_de_inicio = (obj[i].dtFecha_de_inicio),
					dtFechaFinal = obj[i].dtFechaFinal,
						dtHoras_Acumuladas = obj[i].dtHoras_Acumuladas,
						dtAlta = obj[i].dtAlta,
						dtModificacion = obj[i].dtModificacion,
                    lActivo = obj[i].lActivo,
                    iIdPlan = obj[i].iIdPlan,
                    //lTFS = obj[i].lTFS,
                    iIdTFS = obj[i].iIdTFS,
					iGrupo = obj[i].iGrupo,
					lAplicaMultiProceso = obj[i].lAplicaMultiProceso,
					cTituloProceso = obj[i].cTituloProceso,
					iIdWBS = obj[i].iIdWBS,
					iOrdenDetalleProceso = obj[i].iOrdenDetalleProceso,
					iOrdenProceso = obj[i].iOrdenProceso
				};
				//            var temp = daoWBS.InsertarWBS(WBS);
				//obj[i].iIdWBS = temp.iIdWBS;
				daoWBS.InsertarWBS(WBS);
            }
        }


        [WebMethod]
        public tblCat_WBS[] UpdateWBS(tblCat_WBS[] obj)
        {
            int? plan = obj[0].iIdPlan;
            int proceso = obj[0].iIdProcesos;
            int req = obj[0].iRequerimiento;
            WBSBussines daoWBS = new WBSBussines();
            for (var i = 0; i < obj.Length; i++)
            {
				var WBS = new tblCat_WBS
				{
					iIdUsuario = obj[i].iIdUsuario,
					iIdProcesos = obj[i].iIdProcesos,
					iTipoElemento = obj[i].iTipoElemento,
					iRequerimiento = obj[i].iRequerimiento,
					cWork_Item_Type = obj[i].cWork_Item_Type,
					iIdDetalleProceso = obj[i].iIdDetalleProceso,
					dRemaining_Work = obj[i].dRemaining_Work,
					dOriginal_Estimate = obj[i].dOriginal_Estimate,
					dTiempo_Total_del_proceso = obj[i].dTiempo_Total_del_proceso,
					dPorcentaje_de_tareas = obj[i].dPorcentaje_de_tareas,
					dtamanios = obj[i].dtamanios,
					dRate = obj[i].dRate,
					dValor_ganado = obj[i].dValor_ganado,
					isemana = obj[i].isemana,
					dValor_ganado_acumulado = obj[i].dValor_ganado_acumulado,
					dValor_ganado_semanal = obj[i].dValor_ganado_semanal,
					iIdTipoTarea = obj[i].iIdTipoTarea,
					cUnidad_de_medida = obj[i].cUnidad_de_medida,
					dtFecha_de_inicio = (obj[i].dtFecha_de_inicio),
					dtFechaFinal = obj[i].dtFechaFinal,
					dtHoras_Acumuladas = obj[i].dtHoras_Acumuladas,
					dtAlta = obj[i].dtAlta,
					dtModificacion = obj[i].dtModificacion,
					lActivo = obj[i].lActivo,
					iIdPlan = obj[i].iIdPlan,
					//lTFS = obj[i].lTFS,
					iIdTFS = obj[i].iIdTFS,
					iIdWBS = obj[i].iIdWBS,
					cTituloProceso = obj[i].cTituloProceso,
					iOrdenDetalleProceso = obj[i].iOrdenDetalleProceso,
					iOrdenProceso = obj[i].iOrdenProceso
				};

				daoWBS.UpdateWBS(WBS, req, proceso, plan);
            }
			return obj;
        }

        /// <summary>
        /// Metodo para obtener los nombres de los sistemas que hay en la base de datos
        /// </summary>
        /// <returns>regresa una lista de string en la cual estan almacenados los nombres de los sistemas</returns>
        [WebMethod]
        public string ObtenerNombreSistemas()
        {
            List<string> lstNombreSistema = new List<string>();
            WBSBussines daoWBS = new WBSBussines();
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
            WBSBussines daoWBS = new WBSBussines();
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

        [WebMethod]
        public string ObtenerNombreModulos(int IdSistema)
        {
            List<string> lstModulo = new List<string>();
            WBSBussines daoWBS = new WBSBussines();
            lstModulo = daoWBS.ObteneNombreModulo(IdSistema);
            string cNombreModulo = "";
            int icontador = 1;
            foreach (var item in lstModulo)
            {
                if (icontador < lstModulo.Count())
                {
                    cNombreModulo += item + ",";
                }
                else
                {
                    cNombreModulo += item;
                }
                icontador++;
            }
            return cNombreModulo;
        }


        [WebMethod]
        public string ObtenerIdModulos(int IdSistema)
        {
            List<int> lstModulo = new List<int>();
            WBSBussines daoWBS = new WBSBussines();
            lstModulo = daoWBS.ObteneIdModulo(IdSistema);
            string cIdModulo = "";
            int icontador = 1;
            foreach (var item in lstModulo)
            {
                if (icontador < lstModulo.Count())
                {
                    cIdModulo += item + ",";
                }
                else
                {
                    cIdModulo += item;
                }
                icontador++;
            }
            return cIdModulo;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string WebServiceMeridaCerrarTicket()
        {
            try
            {
				wsTFSExterno.wsTFSExterno webTFS = new wsTFSExterno.wsTFSExterno();
				webTFS.UseDefaultCredentials = true;
				var prueba = webTFS.ObtenerUsuarios("PRUEBASIAC", "BLUEOCEAN");
				return prueba;
				//var request = (HttpWebRequest)WebRequest.Create("http://bot-fswws/reportes/wstfsExterno.asmx/ObtenerUsuarios");
				//request.UseDefaultCredentials=true;
				///*var postData = "folio=" + idSISU;
				//postData += "&estatus=ESP";
				//postData += "&respUsuario=" + respUsuario;
				//postData += "&respInterna=" + respInterna;
				//postData += "&usuario=" + usuario;*/
				////var data = Encoding.UTF8.GetBytes(postData);

				//request.Method = "POST";
				//request.ContentType = "application/json; charset=utf-8";
				//request.ContentLength = 0;

				///*using (var stream = request.GetRequestStream())
				//{
				//    stream.Write(data, 0, data.Length);
				//}*/

				//var response = (HttpWebResponse)request.GetResponse();

				//var responseString = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("UTF-8")).ReadToEnd();
				//return responseString;
			}
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        [WebMethod]
        public string ObtenerPlan(Guid iIdEquipo)
        {
            List<tblCat_Plan> lstPlan = new List<tblCat_Plan>();
            WBSBussines daoWBS = new WBSBussines();
            lstPlan = daoWBS.ObtenerPlan(iIdEquipo);
            string json = "{'Planes': [";
            int icontador = 1;
			var tamaño = lstPlan.Count;
            foreach (var item in lstPlan)
            {
				//if (icontador < lstPlan.Count())
				//{
				//    cPlan += item + ",";
				//}
				//else
				//{
				//    cPlan += item;
				//}
				//icontador++;
				if (icontador < tamaño)
				{
					json += "{'iIdPlan': '" + item.iIdPlan + "', 'dtFechaCreacion': '" + item.dtFechaCreacion + "'},";
				}
				else
				{
					json += "{'iIdPlan': '" + item.iIdPlan + "', 'dtFechaCreacion': '" + item.dtFechaCreacion + "'}]}";
				}
				icontador++;

			}
			if (icontador == 1)
			{
				json += "]}";
			}
            return json;
        }

        [WebMethod]
        public string dtAltaPlan(int resultado)
        {
            WBSBussines daoWBS = new WBSBussines();
            DateTime fecha= daoWBS.ObtenerdtAltaPlan(resultado);
            string temp = fecha.ToString();
            return temp;
        }

        [WebMethod]
        public string GenerarRowProcesoNuevo(int iIdProceso, int iIdRQM, int iIdPlan)
        {
            string htmlRow = "";
            ArrayList datosProceso = new ArrayList();
            WBSBussines daoWBS = new WBSBussines();
            List<tblCat_Proceso> lstTitle = daoWBS.ObtenerTitle(iIdProceso);
            Generico.Generico gen = new Generico.Generico();
            List<tblCat_DetalleProceso> lstWBS = daoWBS.ObtenerProcesoNuevo(iIdProceso);
			List<tblCat_TipoTarea> lstTipoTarea = daoWBS.ObtenerTipoTarea();
            //if (lstWBS.Count < 1)
            //{
            //    return htmlRow;
            //}
            //else
            //{
            htmlRow = gen.NuevoGrid(lstTitle, lstWBS, iIdRQM, iIdPlan, lstTipoTarea);
            return htmlRow;
            //}

        }

        [WebMethod]
        public string UsuariosGuardados(int iIdRQM,int iIdProceso, int iIdPlan)
        {
            List<Guid> lstUsuarios = new List<Guid>();
            WBSBussines daoWBS = new WBSBussines();
            lstUsuarios = daoWBS.UsuariosGuardados(iIdRQM, iIdProceso, iIdPlan);
            string cUsuarios = "";
            int icontador = 1;
            foreach (var item in lstUsuarios)
            {
                if (icontador < lstUsuarios.Count())
                {
                    cUsuarios += item + ",";
                }
                else
                {
                    cUsuarios += item;
                }
                icontador++;
            }
            return cUsuarios;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string NombreRQM(int Id, string sProyecto, string sColeccion)
        {
            try
            {
                wsTFSExterno.wsTFSExterno webTFS = new wsTFSExterno.wsTFSExterno();
                webTFS.UseDefaultCredentials = true;
                var prueba = webTFS.ObtenerTituloElementoTFS(Id.ToString(), sProyecto, sColeccion);
                return prueba;
                //HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://bot-fswws/reportes/wstfs.asmx");
                //request.Method = "ObtenerTituloElementoTFS";
                //request.UseDefaultCredentials = true;
                //var postData = "IdTFS=" + Id;
                ////postData += "&estatus=ESP";
                ////postData += "&respUsuario=" + respUsuario;
                ////postData += "&respInterna=" + respInterna;
                ////postData += "&usuario=" + usuario;
                //var data = Encoding.UTF8.GetBytes(postData);

                //request.Method = "POST";
                //request.ContentType = "application/json; charset=utf-8";
                //request.ContentLength = data.Length;

                //using (var stream = request.GetRequestStream())
                //{
                //    stream.Write(data, 0, data.Length);
                //}
                //var response = (HttpWebResponse)request.GetResponse();

                //var responseString = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("UTF-8")).ReadToEnd();
                //return responseString;
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }


        [WebMethod]
        public decimal TotalOriginalEstimado()
        {
            WBSBussines daoWBS = new WBSBussines();
            decimal total = daoWBS.TotalOriginalEstimado();
            return total;
        }

        [WebMethod]
        public List<decimal> ArregloTotalOriginalEstimado(int iIdPlan, int iIdRQM, int iIdProceso)
        {
            WBSBussines daoWBS = new WBSBussines();
            List<decimal> originalEstimados = new List<decimal>();
            originalEstimados = daoWBS.ObtenerOriginalEstimados(iIdPlan, iIdRQM, iIdProceso);
            return originalEstimados;
        }

        [WebMethod]
        public List<string> prueba(int iIdRQM, int iIdProceso, int iIdPlan)
        {
            WBSBussines daoWBS = new WBSBussines();
            List<tblCat_WBS> lstWBS = daoWBS.ObtenerWBS(iIdRQM, iIdProceso, iIdPlan);
            List<string> cadenas = new List<string>();
            int longi = lstWBS.Count;
            int contador = 1;
            string separador = "+";
            foreach (var item in lstWBS)
            {
                if (contador == longi)
                {
                    separador = "";
                }
                string temp = "{'iIdUsuario': '" + item.iIdUsuario + "',"
                    + "'iIdProcesos': '" + item.iIdProcesos + "',"
                    + "'iRequerimiento': '" + item.iRequerimiento + "',"
                    + "'cWork_Item_Type': '" + item.cWork_Item_Type + "',"
                    + "'iIdDetalleProceso': '" + item.iIdDetalleProceso + "',"
                    + "'dRemaining_Work': '" + item.dRemaining_Work + "',"
                    + "'dOriginal_Estimate': '" + item.dOriginal_Estimate + "',"
                    + "'dTiempo_Total_del_proceso': '" + item.dTiempo_Total_del_proceso + "',"
                    + "'dtamanios': '" + item.dtamanios + "',"
                    + "'dRate': '" + item.dRate + "',"
                    + "'isemana': '" + item.isemana + "',"
                    + "'dValor_ganado_acumulado': '" + item.dValor_ganado_acumulado + "',"
                    + "'dValor_ganado_semanal': '" + item.dValor_ganado_semanal + "',"
                    + "'cTipo_de_tarea': '" + item.iIdTipoTarea + "',"
                    + "'cUnidad_de_medida': '" + item.cUnidad_de_medida + "',"
                    + "'dtFecha_de_inicio': '" + item.dtFecha_de_inicio + "',"
                    + "'dtHoras_Acumuladas': '" + item.dtHoras_Acumuladas + "',"
                    + "'dtModificacion': '" + item.dtModificacion + "',"
                    + "'dtAlta': '" + item.dtAlta + "',"
                    + "'lActivo': '" + item.lActivo + "',"
                    + "'iIdPlan': '" + item.iIdPlan + "',"
                    + "'iIdTFS': '" + item.iIdTFS + "',"
                    + "'iIdWBS': '" + item.iIdWBS + "'}";
                cadenas.Add(temp);
                //var WBS = new tblCat_WBS
                //{
                //    //iIdUsuario = item.iIdUsuario,
                //    //iIdProcesos = item.iIdProcesos,
                //    //iRequerimiento = item.iRequerimiento,
                //    //cWork_Item_Type = item.cWork_Item_Type,
                //    //iIdDetalleProceso = item.iIdDetalleProceso,
                //    //dRemaining_Work = item.dRemaining_Work,
                //    //dOriginal_Estimate = item.dOriginal_Estimate,
                //    //dTiempo_Total_del_proceso = item.dTiempo_Total_del_proceso,
                //    //dPorcentaje_de_tareas = item.dPorcentaje_de_tareas,
                //    //dtamanios = item.dtamanios,
                //    //dRate = item.dRate,
                //    //dValor_ganado = item.dValor_ganado,
                //    //isemana = item.isemana,
                //    //dValor_ganado_acumulado = item.dValor_ganado_acumulado,
                //    //dValor_ganado_semanal = item.dValor_ganado_semanal,
                //    //cTipo_de_tarea = item.cTipo_de_tarea,
                //    //cUnidad_de_medida = item.cUnidad_de_medida,
                //    //dtFecha_de_inicio = item.dtFecha_de_inicio,
                //    //dtHoras_Acumuladas = item.dtHoras_Acumuladas,
                //    //dtModificacion = item.dtModificacion,
                //    //dtAlta = item.dtAlta,
                //    //lActivo = item.lActivo,
                //    //iIdPlan = item.iIdPlan,
                //    //lTFS = item.lTFS,
                //    //iIdTFS = item.iIdTFS,
                //    //iIdWBS = item.iIdWBS


                //};
            }
            return cadenas;
        }


        [WebMethod]
        public string CargarEquipos()
        {
            string json = "{'Equipos': [";
            WBSBussines service = new WBSBussines();
            List<tblCat_Equipo> equipos =  service.CargarEquipos();
            int cont = 1;
            int tamaño = equipos.Count;
            foreach (var item in equipos)
            {
                if (cont < tamaño)
                {
                    json += "{'iIdEquipo': '" + item.iIdEquipo + "', 'cNombreEquipo': '" + item.cNombreEquipo + "'},";
                }
                else
                {
                    json += "{'iIdEquipo': '" + item.iIdEquipo + "', 'cNombreEquipo': '" + item.cNombreEquipo + "'}]}";
                }
                cont++;
            }
            
            return json;
        }

        [WebMethod]
        public Guid NuevoEquipo(string cNombreEquipo, string dtFechaInicio, string dtFechaFinal)
        {
            WBSBussines service = new WBSBussines();
            DateTime fechaInicio;
            DateTime fechaFinal;

            fechaInicio = DateTime.ParseExact(dtFechaInicio.Replace("-", "/"), "yyyy/M/d", null);
            fechaFinal= DateTime.ParseExact(dtFechaFinal.Replace("-", "/"), "yyyy/M/d", null);

            DateTime a = fechaInicio.Date;
            DateTime b = fechaFinal.Date;
            var nuevoEquipo = new tblCat_Equipo
            {
                cNombreEquipo = cNombreEquipo
            };
            Guid iIdEquipo = service.NuevoEquipo(nuevoEquipo);
            var nuevoEquipoFecha = new tblRel_EquipoFecha
            {
                iIdEquipo = iIdEquipo,
                dtFechaInicio = fechaInicio,
                dtFechaFin = fechaFinal
            };
            service.NuevoRelEquipoFecha(nuevoEquipoFecha);

            return iIdEquipo;
        }

        [WebMethod]
        public void UsuariosaBD(UsuarioDTO[] usuarios)
        {
            WBSBussines service = new WBSBussines();
            foreach(var item in usuarios)
            {
                service.AgregarUsuariosaBD(item);
            }
            
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ObtenerIteraciones(string sProyecto, string sColeccion)
        {
            try
            {
                wsTFSExterno.wsTFSExterno webTFS = new wsTFSExterno.wsTFSExterno();
                webTFS.UseDefaultCredentials = true;
                var prueba = webTFS.ObtenerIteraciones(sProyecto, sColeccion);
                return prueba;
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ObtenerCapacidadSprint(string _sSprint, string _sUserName, string _sPassword, string _sProyecto, string _sColeccion)
        {
            try
            {
                wsTFSExterno.wsTFSExterno webTFS = new wsTFSExterno.wsTFSExterno();
                webTFS.UseDefaultCredentials = true;
                var capacidadSprint = webTFS.ObtenerCapacidadSprint(_sSprint, _sUserName, _sPassword, _sProyecto, _sColeccion);
                return capacidadSprint.ToString();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

		[WebMethod]
		public List<tblCat_WBS> ObtenerDatosByPlan(int plan)
		{
			WBSBussines daoWBS = new WBSBussines();
			List<tblCat_WBS> datos = daoWBS.ObtenerDatosByPlan(plan);
			return datos;
		}

		[WebMethod]
		public List<int> ObtenerRequerimientosByPlan(int plan)
		{
			WBSBussines daoWBS = new WBSBussines();
			List<int> reqs = daoWBS.ObtenerRequerimientoByPlan(plan);
			return reqs;
		}

		[WebMethod]
		public List<WBSOrdenProcesoDTO> obtenerProcesosByPlanRqm(int plan, int rqm)
		{
			WBSBussines daoWBS = new WBSBussines();
			List<WBSOrdenProcesoDTO> procesos = daoWBS.obtenerProcesosByPlanRqm(plan, rqm);
			return procesos;
		}


		[WebMethod]
		public List<IGrouping<int, tblCat_WBS>> ObtenerDatosByPlanRqmProceso(int plan, int rqm, int proceso)
		{
			WBSBussines daoWBS = new WBSBussines();
			List<IGrouping<int, tblCat_WBS>> procesos = daoWBS.ObtenerDatosByPlanRqmProceso(plan, rqm, proceso);
			return procesos;
		}

		[WebMethod]
		public int ObtenerMaxGrupo()
		{
			WBSBussines daoWBS = new WBSBussines();
			int MaxGrupo = daoWBS.ObtenerMaxGrupo();
			return MaxGrupo;
		}

		[WebMethod]
		public tblCat_Plan AgregarPlan()
		{
			WBSBussines daoWbs = new WBSBussines();
			tblCat_Plan nuevoPlan = daoWbs.AgregarPlan();
			return nuevoPlan;
		}

		[WebMethod]
		public int ObtenerMaxFolioPlan(int plan)
		{
			WBSBussines daoWBS = new WBSBussines();
			int maxFolio = daoWBS.ObtenerMaxFolioPlan(plan);
			return maxFolio;
		}

		[WebMethod]
		public tblCat_Plan GuardarPlanEquipo(Guid iIdEquipo, string cNombreEquipo)
		{
			WBSBussines daoWBS = new WBSBussines();
			//iIdPlan = daoWBS.GuardarPlan(iIdPlan);
			var NuevoPlan = AgregarPlan();
			var iIdPlan = NuevoPlan.iIdPlan;
			var tblEquipo = new tblCat_Equipo
			{
				iIdEquipo = iIdEquipo,
				cNombreEquipo = cNombreEquipo
			};

			daoWBS.GuardarEquipo(tblEquipo);
			var relEquipoPlan = new tblRel_EquipoPlan
			{
				iIdPlan = iIdPlan,
				iIdEquipo = iIdEquipo
			};
			daoWBS.GuardarPlanEquipo(relEquipoPlan);
			return NuevoPlan;
		}

		[WebMethod]
		public string EnviarTFS(string JsonWbs, string sColeccion, string sProyecto)
		{
			//ElementosHijosWBS Tarea;
			//List<JsonWBS> oListaWBS = Newtonsoft.Json.JsonConvert.DeserializeObject<List<JsonWBS>>(JsonWbs);
			//return JsonWbs;
			//foreach (var itemPadre in oListaWBS)
			//{
			//	//Aqui accedo a las propiedades del primer nivel
			//	if (itemPadre.Raiz.Count > 0 && itemPadre.Modo == "Hibrido")
			//	{
			//		//para considerar el componente o contenedor del modo hibrido(a consideracion o mejora)
			//	}
			//	foreach (var itemElementos in itemPadre.elementos)
			//	{
			//		//Aqui accedo a los elementos al nivel de procesos(analisis, diseño y construccion)
			//		foreach (var itemHijos in itemElementos.Hijos)
			//		{
			//			//Aqui accedo a los elementos a nivel de tareas(elab de caso de uso, reviews, peer review, etc)
			//			Tarea = itemHijos.elementos[0];
			//		}
			//		//Proceso = itemElementos + Tarea;
			//	}
			//	//padre = itemPadre + Proceso
			//}

			wsTFSExterno.wsTFSExterno wsExterno = new wsTFSExterno.wsTFSExterno();
			wsExterno.UseDefaultCredentials = true;
			string prueba = wsExterno.EnviarTFS(JsonWbs, sColeccion, sProyecto);
			return prueba;

		}

		[WebMethod]
		public void EliminarRegistroByPlanRequerimiento(int iIdPlan, int iIdRequerimiento)
		{
			WBSBussines daoWBS = new WBSBussines();
			daoWBS.EliminarRegistroByPlanRequerimiento(iIdPlan, iIdRequerimiento);
		}
	}

	public class DatosEquipos
	{
		public int iIdPlan { get; set; }
		public Guid iIdEquipo { get; set; }
		public string cNombreEquipo { get; set; }
	}
}
