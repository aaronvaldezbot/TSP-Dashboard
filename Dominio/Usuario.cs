using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Dominio
{
    public class Usuario
    {
        public Usuario()
        {
        }
        [Key]
        public int IdUsuario { get; set; }

        [Required]
        public string cNombreUsuario { get; set; }

        [Required]
        public string cClaveUsuario { get; set; }

    }
}
