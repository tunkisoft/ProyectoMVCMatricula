using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }
        public string mensaje()
        {
            return "Hola a todos curso MVC5";
        }
        public JsonResult recuperarDatos(int idcurso)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var Lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.IIDCURSO.Equals(idcurso))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public string saludo(string nombre)
        {
            return "hola que tal " + nombre;
        }

        public string saludocompleto(string nombre, string apellido)
        {
            return "hola que tal" + nombre + " " + apellido;
        }
         

        public JsonResult listarCursos()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var Lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(Lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult buscarCursoNombre(String Nombre)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var busqueda = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(Nombre))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(busqueda, JsonRequestBehavior.AllowGet);
        }

        public Int32 guardarDatos(Curso curso)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                //Nuevo
                if (curso.IIDCURSO == 0)
                {
                    bd.Curso.InsertOnSubmit(curso);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                //Editar
                else
                {
                    Curso cursosel = bd.Curso.Where(p => p.IIDCURSO.Equals(curso.IIDCURSO)).First();
                    cursosel.NOMBRE = curso.NOMBRE;
                    cursosel.DESCRIPCION = curso.DESCRIPCION;
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

        public int eliminarCurso(Curso oCurs)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nroregistros = 0;
            try
            {
                Curso cursosel = bd.Curso.Where(p => p.IIDCURSO.Equals(oCurs.IIDCURSO)).First();
                cursosel.BHABILITADO = 0;
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