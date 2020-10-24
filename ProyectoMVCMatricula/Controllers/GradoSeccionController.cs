using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class GradoSeccionController : Controller
    {
        // GET: GradoSeccion
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult listarGradoSeccion()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var lista = (from gradosec in bd.GradoSeccion
                         join sec in bd.Seccion
                         on gradosec.IIDSECCION equals sec.IIDSECCION
                         join grad in bd.Grado
                         on gradosec.IIDGRADO equals grad.IIDGRADO
                         select new
                         {
                             gradosec.IID,
                             NOMBREGRADO = grad.NOMBRE,
                             NOMBRESECCION = sec.NOMBRE

                         }).ToList();
                
            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult recuperarInformacion(int id)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            GradoSeccion gradosec = bd.GradoSeccion.Where(p => p.IID.Equals(id)).First(); 
            return Json(gradosec, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarSeccion()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaSeccion = bd.Seccion.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    //LE DAMOS NOMBRE AL ID PARA QUE MUESTRE EN EL COMBO DEL JAVASCRIPT
                    IID=p.IIDSECCION,
                    p.NOMBRE

                }
                ).ToList();
            return Json(listaSeccion, JsonRequestBehavior.AllowGet);
        }


        public JsonResult listarGrado()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaGrado = bd.Grado.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    //LE DAMOS NOMBRE AL ID PARA QUE MUESTRE EN EL COMBO DEL JAVASCRIPT
                    IID=p.IIDGRADO,
                    p.NOMBRE

                }
                ).ToList();
            return Json(listaGrado, JsonRequestBehavior.AllowGet);
        }
    }
}