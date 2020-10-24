$("#dtpFechaContrato").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
    );
listar();
listarComboModalidad();
listarComboSexo();

var cboTipoModalidad = document.getElementById("cboTipoModalidad");
cboTipoModalidad.onchange=function()
{
    var IDModalidad = document.getElementById("cboTipoModalidad").value;
    if (IDModalidad == "") {
        listar();
    } else {
        $.get("Docente/filtrarDocentexModalidad/?IDModalidad=" + IDModalidad, function (data) {
            crearListado(["IDDocente", "Nombre", "Apellido Materno", "Apellido Materno"
                 , "Email"], data);

        });
    }
}
 
function listar() {
    $.get("Docente/listarDocente", function (data) {
        crearListado(["IDDocente", "Nombre", "Apellido Materno", "Apellido Materno"
            ,"Email"],data)
    }
    );
}
function listarComboSexo(){
$.get("Alumno/listarSexo", function (data) {
    llenarCombo(data, document.getElementById("cboSexoDocente"), true)
   
})
}

function listarComboModalidad(){

    $.get("Docente/listarModalidadContrato" ,function(data){
        llenarCombo(data, document.getElementById("cboTipoModalidad"), true);       
        llenarCombo(data, document.getElementById("cboModalidadContrato"), true);

    }
        )
}
 
function llenarCombo(data, control, primerElemento) {
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
 
function abrirModal(id) {
    //borrar o limpiar x en los formularios.
    listarComboModalidad();
    listarComboSexo();
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        borrarDatos();
      
    }
    else {
       
        $.get("Docente/recuperarInformacion/?idDocente=" + id, function (data) {
            
            document.getElementById("txtIDDocente").value = data[0].IIDDOCENTE;
            document.getElementById("txtDNombre").value = data[0].NOMBRE;
            document.getElementById("txtDApellidoPaterno").value = data[0].APPATERNO;
            document.getElementById("txtDApellidoMaterno").value = data[0].APMATERNO;
            document.getElementById("txtDireccion").value = data[0].DIRECCION;
            document.getElementById("txtTelFijo").value = data[0].TELEFONOFIJO;
            document.getElementById("txtTelCelular").value = data[0].TELEFONOCELULAR;
            document.getElementById("txtEmail").value = data[0].EMAIL; 
            document.getElementById("cboSexoDocente").value = data[0].IIDSEXO;
            document.getElementById("dtpFechaContrato").value = data[0].FCONTRATO; 
            document.getElementById("cboModalidadContrato").value = data[0].IIDMODALIDADCONTRATO;
            document.getElementById("imgFoto").src = "data:image/png;base64,"+data[0].FOTOMOSTRAR;
        });
       

    }
}

function eliminar(id) {

    if (confirm("Desea realmente guardar los cambios?") == 1) {
        //funcion get
        $.get("Docente/EliminarDocente/?idDocente=" + id, function (data) {
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
        
        var iddocente = document.getElementById("txtIDDocente").value;
        var nombreDocente = document.getElementById("txtDNombre").value;
        var ApPaterno = document.getElementById("txtDApellidoPaterno").value;
        var ApMaterno = document.getElementById("txtDApellidoMaterno").value;
        var Direccion = document.getElementById("txtDireccion").value;
        var TelFijo = document.getElementById("txtTelFijo").value;
        var TelCel = document.getElementById("txtTelCelular").value;
        var Email = document.getElementById("txtEmail").value;
        var Sexo = document.getElementById("cboSexoDocente").value;
        var FechaContrato = document.getElementById("dtpFechaContrato").value;
        var Contrato = document.getElementById("cboModalidadContrato").value;
        var ImgFotos = document.getElementById("imgFoto").src.replace("data:image/png;base64,", "");
        var frm = new FormData();
        frm.append("IIDDOCENTE", iddocente);
        frm.append("NOMBRE", nombreDocente);
        frm.append("APPATERNO", ApPaterno);
        frm.append("APMATERNO", ApMaterno);
        frm.append("DIRECCION", Direccion);
        frm.append("TELEFONOFIJO", TelFijo);
        frm.append("TELEFONOCELULAR", TelCel);
        frm.append("EMAIL", Email);
        frm.append("IIDSEXO", Sexo);
        frm.append("FECHACONTRATO", FechaContrato);
        frm.append("CADENAFOTO", ImgFotos);
        frm.append("IIDMODALIDADCONTRATO", Contrato);        
        frm.append("BHABILITADO", 1);
        if (confirm("Desea realmente guardar los cambios?") == 1) {
            //funcion ajax para insertar
            $.ajax({
                type: "POST",
                url: "Docente/guardarDocente",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("ocurrio un error"); 

                    } else { 
                        alert("se ejecuto correctamente");
                        listar();
                        document.getElementById("btnCancelar").click();
                    }

                }
            });
        }
    }
     
}


var btnFoto = document.getElementById("btnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("btnFoto").files[0];
    var reader = new FileReader();//lee el archivo
    if (reader != null) {
        reader.onload = function () {
            var img = document.getElementById("imgFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);//convierte la imagen para mostrar
}