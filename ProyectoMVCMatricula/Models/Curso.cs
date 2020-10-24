using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoMVCMatricula.Models
{
    public class Curso
    {
        public Int32 IDCURSO
        {
            get;
            set;
        }

        public String NOMBRE { get; set; }
        public String DESCRIPCION { get; set; }
        public Int32 BHABILITADO { get; set; }
    }
}