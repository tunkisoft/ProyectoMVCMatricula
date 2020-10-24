$("#datepickerInicio").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear:true
    }
    );
$("#datepickerFin").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
    );
listar();

function listar() {
    $.get("Periodo/listarPeriodo", function (data) {
        crearListado(["IdPeriodo", "Nombre", "Fecha Inicio", "Fecha Fin"], data);

    });
}


// crear busqueda sensitiva automatica con onkeyup
var nombrePeriodo = document.getElementById("txtNombrePeriodo");
nombrePeriodo.onkeyup = function () {
    //llamada asincrona
    var nombre = document.getElementById("txtNombrePeriodo").value;
    $.get("Periodo/buscarPeriodoPorNombre/?NombrePeriodo=" + nombre,function(data){
        crearListado(["IdPeriodo","Nombre","Fecha Inicio","Fecha Fin"],data);
});    
}


function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

//CLASS = Obligatorio
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
        $.get("Periodo/recuperarDatos/?idPeriodo=" + id, function (data) {
            document.getElementById("txtIDPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("txtNombrePeriodo").value = data[0].NOMBRE;
            document.getElementById("datepickerInicio").value = data[0].FECHAINICIOCADENA;
            document.getElementById("datepickerFin").value = data[0].FECHAFINCADENA;
        });
    }
}

function eliminar(id) {
    var frm = new FormData();
    frm.append("IIDPERIODO", id);
    if (confirm("Desea realmente guardar los cambios?") == 1) {
        //funcion ajax para insertar
        $.ajax({
            type: "POST",
            url: "Periodo/eliminar",
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

function Agregar() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var id = document.getElementById("txtIDPeriodo").value;
        var nombre = document.getElementById("txtNombrePeriodo").value;
        var fechaInicio = document.getElementById("datepickerInicio").value;
        var fechaFin = document.getElementById("datepickerFin").value;
        frm.append("IIDPERIODO", id);
        frm.append("NOMBRE", nombre);
        frm.append("FECHAINICIO", fechaInicio);
        frm.append("FECHAFIN", fechaFin);
        frm.append("BHABILITADO", 1);
        if (confirm("Desea realmente guardar los cambios?") == 1) {
            //funcion ajax para insertar
            $.ajax({
                type: "POST",
                url: "Periodo/guardarPeriodo",
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