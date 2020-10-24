
listar();
function listar() {
    $.get("Curso/listarCursos", function (data) {

        crearListado(["IdCurso", "Nombre", "Descripcion"], data);
    }
);

}



//asignar el contenido del boton buscar
var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    //aqui ajax
    var Nombre = document.getElementById("txtNombre").value;
    $.get("Curso/buscarCursoNombre/?Nombre=" + Nombre, function (data) {
        crearListado(["IdCurso","Nombre","Descripcion"],data)
        //fin ajax
    });

    
}



// limpiar botones
var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    $.get("Curso/listarCursos", function (data) {

        crearListado(["IdCurso","Nombre","Descripcion"],data);
    }
);
    document.getElementById("txtNombre").value = "";
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


function eliminar(id) {
    var frm = new FormData();
    frm.append("IIDCURSO", id);
    if (confirm("Desea realmente guardar los cambios?") == 1) {
        //funcion ajax para insertar
        $.ajax({
            type: "POST",
            url: "Curso/eliminarCurso",
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

function abrirModal(id) {
    //borrar o limpiar x en los formularios.
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (id == 0){       
        borrarDatos();
    }
    else {
        $.get("Curso/recuperarDatos/?idcurso=" + id, function (data) {
            document.getElementById("txtIDCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombreCurso").value = data[0].NOMBRE;
            document.getElementById("txtDescripcion").value = data[0].DESCRIPCION;
        });
    }
}

function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

function Agregar() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var id = document.getElementById("txtIDCurso").value;
        var nombre = document.getElementById("txtNombreCurso").value;
        var descripcion = document.getElementById("txtDescripcion").value;
        frm.append("IIDCURSO", id);
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);
        if (confirm("Desea realmente guardar los cambios?") == 1) {
            //funcion ajax para insertar
            $.ajax({
                type: "POST",
                url: "Curso/guardarDatos",
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

 

//function crearListado(data) {

//    var contenido = "";
//    contenido += "<table id='tabla-curso' class='table'>";
//    contenido += "<thead>";
//    contenido += "<tr>";
//    contenido += "<td>IDCurso</td>";
//    contenido += "<td>Nombre</td>";
//    contenido += "<td>Descripcion</td>";
//    contenido += "</tr>";
//    contenido += "</thead>";
//    contenido += "<tbody>";
//    for (var i = 0; i < data.length; i++) {
//        contenido += "<tr>";
//        contenido += "<td>" + data[i].IIDCURSO + "</td>";
//        contenido += "<td>" + data[i].NOMBRE + "</td>";
//        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
//        contenido += "</tr>";
//    }

//    contenido += "</tbody>";

//    contenido += "</table>";
//    document.getElementById("tabla").innerHTML = contenido;
//    $("#tabla-curso").dataTable(
//        {
//            searching: false
//        }
//        );
//}