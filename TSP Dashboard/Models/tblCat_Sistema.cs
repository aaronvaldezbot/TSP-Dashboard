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
    
    public partial class tblCat_Sistema
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblCat_Sistema()
        {
            this.tblCat_Modulo = new HashSet<tblCat_Modulo>();
        }
    
        public int iIdSistema { get; set; }
        public string cNombreSistema { get; set; }
        public string cDescripcion { get; set; }
        public string cRuta { get; set; }
        public int iOrden { get; set; }
        public int iImagen { get; set; }
        public System.DateTime dtAlta { get; set; }
        public Nullable<System.DateTime> dtModificacion { get; set; }
        public bool lActivo { get; set; }
        public string cCheckSum { get; set; }
        public bool lFrontEnd { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCat_Modulo> tblCat_Modulo { get; set; }
    }
}