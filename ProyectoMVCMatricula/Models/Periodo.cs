using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoMVCMatricula.Models
{
    public class Periodo
    {
       
       
            public Int32 IIDPERIODO { get; set; }
            public String NOMBRE { get; set; }
            public DateTime FECHAINICIO { get; set; }
            public DateTime FECHAFIN { get; set; }
            public Int32 BHABILITADO { get; set; }
        
    }
}