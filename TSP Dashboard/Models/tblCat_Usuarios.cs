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
    
    public partial class tblCat_Usuarios
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblCat_Usuarios()
        {
            this.tblRel_Equipos = new HashSet<tblRel_Equipos>();
            this.tblRel_UsuarioPerfil = new HashSet<tblRel_UsuarioPerfil>();
            this.tblCat_WBS = new HashSet<tblCat_WBS>();
        }
    
        public System.Guid iIdUsuario { get; set; }
        public string cNombreUsuario { get; set; }
        public string cClaveUsuario { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblRel_Equipos> tblRel_Equipos { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblRel_UsuarioPerfil> tblRel_UsuarioPerfil { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCat_WBS> tblCat_WBS { get; set; }
    }
}
