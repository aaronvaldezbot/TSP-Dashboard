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
    
    public partial class tblCat_Plan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblCat_Plan()
        {
            this.tblCat_WBS = new HashSet<tblCat_WBS>();
            this.tblRel_EquipoPlan = new HashSet<tblRel_EquipoPlan>();
        }
    
        public int iIdPlan { get; set; }
        public System.DateTime dtFechaCreacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCat_WBS> tblCat_WBS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblRel_EquipoPlan> tblRel_EquipoPlan { get; set; }
    }
}
