//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TSP_Dashboard.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblRel_ProcesoRevision
    {
        public int iIdRel_ProcesoRevision { get; set; }
        public int iIdProceso { get; set; }
        public int iIdEquipo { get; set; }
        public int iRevision { get; set; }
    
        public virtual tblCat_Equipo tblCat_Equipo { get; set; }
        public virtual tblCat_Proceso tblCat_Proceso { get; set; }
    }
}