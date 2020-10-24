
listarSeccion();

function listarSeccion(){
$.get("Seccion/listarSeccion", function (data) {

    crearListado(["IDSeccion", "Nombre"], data);
}
);
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
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-pencil'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
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