using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarDocente()
        {
            //consulta linq
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaDocente = (from docente in bd.Docente
                                where docente.BHABILITADO.Equals(1)
                                select new
                                {
                                    docente.IIDDOCENTE,
                                    docente.NOMBRE,
                                    docente.APPATERNO,
                                    docente.APMATERNO,
                                    docente.EMAIL
                                }).ToList();
            return Json(listaDocente, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarModalidadContrato()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaModalidad = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    //LE DAMOS NOMBRE AL ID PARA QUE MUESTRE EN EL COMBO DEL JAVASCRIPT
                    IID = p.IIDMODALIDADCONTRATO,
                    p.NOMBRE

                }
                ).ToList();
            return Json(listaModalidad, JsonRequestBehavior.AllowGet);
        }


        public JsonResult filtrarDocentexModalidad(Int32 IDModalidad)
        {
            //consulta linq
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaDocente = (from docente in bd.Docente
                                where docente.BHABILITADO.Equals(1) &&
                                docente.IIDMODALIDADCONTRATO.Equals(IDModalidad)
                                select new
                                {
                                    docente.IIDDOCENTE,
                                    docente.NOMBRE,
                                    docente.APPATERNO,
                                    docente.APMATERNO,
                                    docente.EMAIL
                                }).ToList();
            return Json(listaDocente, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarInformacion(int idDocente)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var Lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDDOCENTE.Equals(idDocente))
                .Select(
                p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APMATERNO,
                    p.APPATERNO,                    
                    p.DIRECCION,
                    p.TELEFONOCELULAR,
                    p.TELEFONOFIJO,                    
                    p.EMAIL,
                    p.IIDSEXO,
                    FCONTRATO = ((DateTime)p.FECHACONTRATO).ToShortDateString(),
                    p.IIDMODALIDADCONTRATO,
                    FOTOMOSTRAR = Convert.ToBase64String(p.FOTO.ToArray()), 
                    p.BHABILITADO
                   
                }
                    );

            return Json(Lista, JsonRequestBehavior.AllowGet);
        }


        public int EliminarDocente(int idDocente)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nroregistros = 0;
            try
            {
                Docente Docsel = bd.Docente.Where(p => p.IIDDOCENTE.Equals(idDocente)).First();
                Docsel.BHABILITADO = 0;
                bd.SubmitChanges();
                nroregistros = 1;
            }
            catch (Exception ex)
            {
                nroregistros = 0;
            }
            return nroregistros;
        }
        public int guardarDocente(Docente docente , string cadenaFoto )
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                //nuevo
                int iddocente = docente.IIDDOCENTE;
                if (iddocente.Equals(0))
                {
                    docente.FOTO = Convert.FromBase64String(cadenaFoto);
                    bd.Docente.InsertOnSubmit(docente);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1; 
                }
                //editar
                else
                {
                    Docente docsel = bd.Docente.Where(p => p.IIDDOCENTE.Equals(docente.IIDDOCENTE)).First();
                    docsel.NOMBRE = docente.NOMBRE;
                    docsel.APPATERNO = docente.APPATERNO;
                    docsel.APMATERNO = docente.APMATERNO;
                    docsel.DIRECCION = docente.DIRECCION;
                    docsel.TELEFONOFIJO = docente.TELEFONOFIJO;
                    docsel.TELEFONOCELULAR = docente.TELEFONOCELULAR;
                    docsel.EMAIL = docente.EMAIL;
                    docsel.IIDSEXO = docente.IIDSEXO;
                    docsel.FECHACONTRATO = docente.FECHACONTRATO;
                    docsel.IIDMODALIDADCONTRATO = docente.IIDMODALIDADCONTRATO;
                    docsel.FOTO = Convert.FromBase64String(cadenaFoto);
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


    }
}