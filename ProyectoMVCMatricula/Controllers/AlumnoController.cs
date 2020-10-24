using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoMVCMatricula.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        //combo box sexo
        public JsonResult listarSexo()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();

            var lista = bd.Sexo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                {
                    IID = p.IIDSEXO,
                    p.NOMBRE
                }

                ).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //listar alumnos
        public JsonResult listarAlumnos()
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new
                {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.TELEFONOPADRE
                }
                ).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtroAlumnos(Int32 IDSexo)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var listaFiltro = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(IDSexo))
                .Select(p => new
                {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.TELEFONOPADRE

                }).ToList();
            return Json(listaFiltro, JsonRequestBehavior.AllowGet);

        }

        public JsonResult recuperarDatos(int idAlumno)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            var Lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDALUMNO.Equals(idAlumno))
                .Select(
                p => new
                {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    FECHANACIMIENTO = ((DateTime)p.FECHANACIMIENTO).ToShortDateString(),
                    p.IIDSEXO,
                    p.TELEFONOPADRE,
                    p.TELEFONOMADRE,
                    p.NUMEROHERMANOS,
                    p.BHABILITADO
                    //p.IIDTIPOUSUARIO,
                    //p.bTieneUsuario 
                }
                    );

            return Json(Lista, JsonRequestBehavior.AllowGet);
        }


        public int EliminarAlumno(int idAlumno)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nroregistros = 0;
            try
            { 
                Alumno Alumsel = bd.Alumno.Where(p => p.IIDALUMNO.Equals(idAlumno)).First();
                Alumsel.BHABILITADO = 0;
                bd.SubmitChanges();
                nroregistros = 1;
            }
            catch (Exception ex)
            {
                nroregistros = 0;
            }
            return nroregistros;
        }


        public Int32 guardarAlumno(Alumno alumno)
        {
            BDMatriculaDataContext bd = new BDMatriculaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                //editar
                int idalumno = alumno.IIDALUMNO;
                if (idalumno >= 1)
                {
                    Alumno alumsel = bd.Alumno.Where(p => p.IIDALUMNO.Equals(alumno.IIDALUMNO)).First();
                    alumsel.NOMBRE = alumno.NOMBRE;
                    alumsel.APPATERNO = alumno.APPATERNO;
                    alumsel.APMATERNO = alumno.APMATERNO;
                    alumsel.FECHANACIMIENTO = alumno.FECHANACIMIENTO;                    
                    alumsel.IIDSEXO = alumno.IIDSEXO;
                    alumsel.TELEFONOPADRE = alumno.TELEFONOPADRE;
                    alumsel.TELEFONOMADRE = alumno.TELEFONOMADRE; 
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;

                }
                //nuevo
                else
                {
                    bd.Alumno.InsertOnSubmit(alumno);
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