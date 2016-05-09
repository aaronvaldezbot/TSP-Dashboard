using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.Framework.Client;
using Microsoft.TeamFoundation.Framework;
using Microsoft.TeamFoundation.Server;
using Microsoft.TeamFoundation.Framework.Common;
using System.Collections.ObjectModel;
using Microsoft.TeamFoundation.WorkItemTracking.Client;
using System.Collections;
using TSPDAO;
using System.Data.Entity;
using System.Data;
using Dominio;
using TSP_Dashboard.DTO;

namespace TSP_Dashboard
{
    public class TeamWrapper : IDisposable
    {
        private readonly TfsTeamProjectCollection teamProjectCollection;
        private readonly TfsTeamService teamService;
        private readonly ProjectInfo projectInfo;
        private readonly IIdentityManagementService2 identityManagementService;
        TfsConfigurationServer configServer;
        WorkItemStore store;

        public TeamWrapper(Uri collectionUri)
            : this(collectionUri, null)
        {
        }

        public TeamWrapper(Uri collectionUri, string teamProjectName)
        {
            try
            {
                this.teamProjectCollection = new TfsTeamProjectCollection(collectionUri);
                this.teamService = this.teamProjectCollection.GetService<TfsTeamService>();
                this.identityManagementService = this.teamProjectCollection.GetService<IIdentityManagementService2>();
                ICommonStructureService4 cssService = this.teamProjectCollection.GetService<ICommonStructureService4>();
                this.configServer = TfsConfigurationServerFactory.GetConfigurationServer(collectionUri);
                this.store = (WorkItemStore)teamProjectCollection.GetService(typeof(WorkItemStore));
                if (!string.IsNullOrWhiteSpace(teamProjectName))
                {
                    this.projectInfo = cssService.GetProjectFromName(teamProjectName);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void Dispose()
        {
            this.teamProjectCollection.Dispose();
        }

        public string CrearTarea(TareaWBS oTareaWBS, string nombreSistema, string nombreModulo, string descripcion, int idSISU, string nombreAsignado)
        {
            try {
                teamProjectCollection.Authenticate();
                teamProjectCollection.EnsureAuthenticated();
                if(nombreSistema == "0")
                {
                    nombreSistema = "Sin Especificar";
                }
                if(nombreModulo == "undefined")
                {
                    nombreModulo = "Sin Especificar";
                }
                WorkItemType wiType = store.Projects["PRUEBASIAC"].WorkItemTypes["Bug"];
                WorkItem newWI = new WorkItem(wiType);
                newWI.Title = idSISU.ToString() + " Creación Automática desde APP Tickets";
                newWI.State = "Proposed";
                newWI.Fields["System.AssignedTo"].Value = nombreAsignado;
                newWI.Fields["Microsoft.VSTS.CMMI.Symptom"].Value = descripcion;
                newWI.Fields["BlueOcean.MainREQ.Sistema"].Value = nombreSistema;
                newWI.Fields["BlueOcean.MainREQ.Modulo"].Value = nombreModulo;
                newWI.Fields["Tags"].Value = "SISU";
                newWI.Fields["BlueOcean.Pruebas.Navegadores"].Value = "Todos";
                newWI.Fields["BlueOcean.Comun.VersionProducto"].Value = "4.6.0";
                newWI.Fields["BlueOcean.MainREQ.Cliente"].Value = "Ayuntamiento de Mérida";
                newWI.Fields["BlueOcean.MainREQ.Origen"].Value = "Cliente";
                newWI.Fields["BlueOcean.Test.RequireTestIn"].Value = "Creado Automáticamente desde APP Tickets";
                //Faltan campos obligatorios
                newWI.Save();
                //using (var ctx = new TSPDBContext())
                //{
                //    BugCreado oBug = new BugCreado();
                //    oBug.idSISU = idSISU;
                //    oBug.idTFS = newWI.Id;
                //    ctx.BugCreado.Add(oBug);
                //    ctx.SaveChanges();
                //}
                return newWI.Id.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}