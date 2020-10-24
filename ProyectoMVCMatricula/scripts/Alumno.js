
$("#dtpFechaNacimiento").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
    );


listar();
function listar(){
$.get("Alumno/listarAlumnos", function (data) {
    
    crearListado(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);

});
}
$.get("Alumno/listarSexo", function (data) {
    llenarCombo(data,document.getElementById("cboSexo"),true)
    llenarCombo(data, document.getElementById("cboSexoAlumno"), true)
})


//EVENTO BUSCAR POR SEXO----------
var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function(){
    // todo lo que hace click
    var IDSexo = document.getElementById("cboSexo").value;
    if(IDSexo==""){
        listar();
    } else
    $.get("Alumno/filtroAlumnos/?IDSexo=" + IDSexo, function (data) {
        crearListado(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);
    }
    );
}
//------------------------------------


//BOTON LIMPIAR
var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    listar();
}



function llenarCombo(data, control,primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>-- Seleccione -- </option>";
    }
    for (var i = 0; i < data.length; i++) {

        contenido += "<option value='" + data[i].IID + "'>";

        contenido += data[i].NOMBRE;

        contenido += "</option>";
    }
    control.innerHTML = contenido;
}


//pasarlo a json 
function abrirModal(id) {
    //borrar o limpiar x en los formularios.
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        borrarDatos();
    }
    else {
        $.get("Alumno/recuperarDatos/?idAlumno=" + id, function (data) {
            document.getElementById("txtIDAlumno").value = data[0].IIDALUMNO;
            document.getElementById("txtNombreAlumno").value = data[0].NOMBRE;
            document.getElementById("txtApellidoPaterno").value = data[0].APPATERNO;
            document.getElementById("txtApellidoMaterno").value = data[0].APMATERNO;
            document.getElementById("dtpFechaNacimiento").value = data[0].FECHANACIMIENTO;
            document.getElementById("cboSexoAlumno").value = data[0].IIDSEXO;
            document.getElementById("txtTelPadre").value = data[0].TELEFONOPADRE;
            document.getElementById("txtTelMadre").value = data[0].TELEFONOMADRE;
            
        });
    }
}

//borrar
function datosObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

function crearListado(arrayColumnas, data) {

    var contenido = "";
    contenido += "<table id=tablas class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0]);
    contenido += "<tbody>";
    for (i = 0; i < data.length; i++) {
        contenido += "<tr>";
        for (j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLlaves];
            contenido += "</td>";
        }
        var llaveId = llaves[0];
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-pencil'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tablas").dataTable(
        {
            searching: false
        }
        );

}

//eliminar usando get
function eliminar(id) {
    
    if (confirm("Desea realmente guardar los cambios?") == 1) {
        //funcion get
        $.get("Alumno/EliminarAlumno/?idAlumno=" + id, function (data) {
            if (data == 0) {
                alert("ocurrio un error")
            }
            else {
                alert("se elimino correctamente")
                listar();
            }
        }

        ); 
    }
}


function Agregar() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var id = document.getElementById("txtIDAlumno").value; 
        var nombreAlumno = document.getElementById("txtNombreAlumno").value;
        var ApPaterno = document.getElementById("txtApellidoPaterno").value;
        var ApMaterno = document.getElementById("txtApellidoMaterno").value;
        var fechaNac = document.getElementById("dtpFechaNacimiento").value;
        var sexAlumno = document.getElementById("cboSexoAlumno").value;
        var TelPadre = document.getElementById("txtTelPadre").value;
        var TelMadre = document.getElementById("txtTelMadre").value;
        frm.append("IIDALUMNO", id);
        frm.append("NOMBRE", nombreAlumno);
        frm.append("APPATERNO", ApPaterno);
        frm.append("APMATERNO", ApMaterno);
        frm.append("FECHANACIMIENTO", fechaNac);
        frm.append("IIDSEXO", sexAlumno);
        frm.append("TELEFONOPADRE", TelPadre);
        frm.append("TELEFONOMADRE", TelMadre);
        frm.append("BHABILITADO", 1);
        if (confirm("Desea realmente guardar los cambios?") == 1) {
            //funcion ajax para insertar
            $.ajax({
                type: "POST",
                url: "Alumno/guardarAlumno",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        listar();
                        alert("se ejecuto correctamente");
                        document.getElementById("btnCancelar").click();

                    } else {
                        alert("ocurrio un error");
                    }

                }
            });
        }
    }
    else {

    }

}