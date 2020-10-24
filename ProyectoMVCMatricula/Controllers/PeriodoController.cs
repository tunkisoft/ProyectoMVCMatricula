using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPeriodo()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var ListaPeriodo = (bd.Periodo.Where(p => p.BHABILITADO.Equals(1))
                 .Select(p => new {
                     p.IIDPERIODO,
                     p.NOMBRE,
                     FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                     FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()
                 })).ToList();
            return Json(ListaPeriodo, JsonRequestBehavior.AllowGet);

        }


        public JsonResult buscarPeriodoPorNombre(String NombrePeriodo)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var ListaPeriodo = (bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(NombrePeriodo))
                 .Select(p => new {
                     p.IIDPERIODO,
                     p.NOMBRE,
                     FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                     FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()
                 })).ToList();
            return Json(ListaPeriodo, JsonRequestBehavior.AllowGet);

        }

        public JsonResult recuperarDatos(int idPeriodo)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var Lista = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.IIDPERIODO.Equals(idPeriodo))
                .Select(
                p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIOCADENA = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                    FECHAFINCADENA = ((DateTime)p.FECHAFIN).ToShortDateString()
                }
                    );
                    
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }
        public Int32 guardarPeriodo(Periodo periodo)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                //editar
                int idperiodo = periodo.IIDPERIODO;
                if (idperiodo >= 1)
                {
                    Periodo persel = bd.Periodo.Where(p => p.IIDPERIODO.Equals(periodo.IIDPERIODO)).First();
                    persel.NOMBRE = periodo.NOMBRE;
                    persel.FECHAINICIO = periodo.FECHAINICIO;
                    persel.FECHAFIN = periodo.FECHAFIN;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                  
                }
                //nuevo
                else
                {
                    bd.Periodo.InsertOnSubmit(periodo);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }

            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

      

        public int eliminar(Periodo oPer)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nroregistros = 0;
            try
            {
                int idPerio = oPer.IIDPERIODO;
                Periodo Persel = bd.Periodo.Where(p => p.IIDPERIODO.Equals(oPer.IIDPERIODO)).First();
                Persel.BHABILITADO = 0;
                bd.SubmitChanges();
                nroregistros = 1;
            }
            catch (Exception ex)
            {
                nroregistros = 0;
            }
            return nroregistros;
        }
    }
}