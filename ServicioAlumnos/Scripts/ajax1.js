var url = "http://localhost:50260/api/";

var borrarTabla = function() {

    document.getElementById("contenido").removeChild(
        document.getElementById("tablaDatos"));
};

var cargarTabla = function(datos) {
    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tablaDatos");

    for (var i = 0; i < datos.length; i++) {
        var fila = document.createElement("tr");
        var c1 = document.createElement("td");
        var c2 = document.createElement("td");
        var c3 = document.createElement("td");
        var c4 = document.createElement("td");
        var t1 = document.createTextNode(datos[i].nombre);
        var t2 = document.createTextNode(datos[i].edad);
        var t3 = document.createTextNode(datos[i].nota);
        var t4 = document.createElement("a");
        t4.setAttribute("id", "Borrar-" + datos[i].id);
        t4.setAttribute("href", "#");
        t4.onclick = borrar;

        var t5 = document.createElement("a");
        t5.setAttribute("id", "Modificar-" + datos[i].id);
        t5.setAttribute("href", "#");
        t5.onclick = modificar;

        var tt4 = document.createTextNode("Borrar");
        var tt5 = document.createTextNode("Modificar");
        t5.appendChild(tt5);
        t4.appendChild(tt4);
        c1.appendChild(t1);
        c2.appendChild(t2);
        c3.appendChild(t3);
        c4.appendChild(t4);
        c4.appendChild(t5);
        fila.appendChild(c1);
        fila.appendChild(c2);
        fila.appendChild(c3);
        fila.appendChild(c4);

        tabla.appendChild(fila);
    }
    document.getElementById("contenido").appendChild(tabla);
};

var leerDatos = function() {
    var urlFinal = url + "alulmnos";

    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function() {

        if (ajax.readyState != 4)
            return;
            
         if(ajax.status >= 200 && ajax.status < 300) {
            borrarTabla();
            var datos = eval(ajax.responseText);
            cargarTabla(datos);

        } else {
            alert("Error recuperando informacion");
        }

    };
    ajax.send(null);

};

var modificar= function(evt) {
    var idelemento = evt.target.getAttribute("id");
    var urlFinal = url + "alulmnos/" + idelemento.split("-")[1];

    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            var obj = eval('('+ajax.responseText+')');
            document.getElementById("hdnId").value = obj.id;
            document.getElementById("txtNombre").value = obj.nombre;
            document.getElementById("txtEdad").value = obj.edad;
            document.getElementById("txtNota").value = obj.nota;


        } else {

            alert("Error leyendo datos");
        }

    };

    ajax.send(null);
}


var escribirDatos = function() {
    var urlFinal = url + "alulmnos";

    var ajax = new XMLHttpRequest();
    var id = document.getElementById("hdnId").value;
    var json = {
        nombre: document.getElementById("txtNombre").value,
        edad: document.getElementById("txtEdad").value,
        nota: document.getElementById("txtNota").value
    };
    if (isNaN(id)) {
        ajax.open("POST", urlFinal);


    } else {
        urlFinal += "/" + id;
        json.id = id;
        ajax.open("PUT", urlFinal);
    }


    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function() {
       
        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            document.getElementById("hdnId").value = "";
            leerDatos();

        } else {

            alert("Error escribiendo datos");
        }

    };
    

    var jsonText = JSON.stringify(json);
    ajax.send(jsonText);

};
var borrar = function(evt) {
    var idelemento = evt.target.getAttribute("id");
    var urlFinal = url + "alulmnos/"+idelemento.split("-")[1];

    var ajax = new XMLHttpRequest();
    ajax.open("DELETE", urlFinal);
    
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            leerDatos();

        } else {

            alert("Error borrando datos");
        }

    };
   
    ajax.send(null);


};
(function() {
    document.getElementById("btnGuardar").onclick = escribirDatos;
    leerDatos();
    //var enlaces = document.querySelectorAll("a");

    //for (var i = 0; i < enlaces.length; i++) {
    //    enlaces[i].onclick = borrar;

    //}

})();