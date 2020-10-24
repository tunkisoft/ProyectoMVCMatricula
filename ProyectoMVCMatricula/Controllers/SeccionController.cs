using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarSeccion()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var ListaSeccion = (bd.Seccion.Where(p => p.BHABILITADO.Equals(1))
                 .Select(p => new {
                     p.IIDSECCION,
                     p.NOMBRE
                 })).ToList();
            return Json(ListaSeccion, JsonRequestBehavior.AllowGet);

        }
    }
}