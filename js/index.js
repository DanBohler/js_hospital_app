var btnRecogerEdad = document.getElementById('recoger');
btnRecogerEdad.addEventListener('click', recogerEdad);

var btnLimpiar = document.getElementById('limpiar');
btnLimpiar.addEventListener('click', limpiarBusqueda);

var btnRecogerApellido = document.getElementById('recogerApellido');
btnRecogerApellido.addEventListener('click', recogerApellido)

//Recoge el apellido para el filtrado
function recogerApellido(e) {
    e.preventDefault();

    var apellido = document.getElementById('apellido').value;
    if (apellido != "") {
        filtrarPorApellido(listadoPacientes, apellido);
    }
    //vaciar los campos
    document.getElementById('apellido').value = "";

}

//Recoge la edad mínima y máxima para el filtrado
function recogerEdad(e) {
    e.preventDefault();

    var edadMinima = document.getElementById('edadMin').selectedIndex + 1;
    var edadMaxima = document.getElementById('edadMax').selectedIndex + 1;

    if (edadMinima <= edadMaxima) {
        filtrarPorEdad(listadoPacientes, edadMinima, edadMaxima);
    } else {
        alert('campos incorrectos');
    }
}

//Recoge la selección del diagnóstico
function recogerDiagnostico() {
    var selectDiagnostico = document.getElementById('diagnosticoPaciente');
    var optionSeleccion = selectDiagnostico.options[selectDiagnostico.selectedIndex].value;

    filtrarPorDiagnostico(listadoPacientes, optionSeleccion);
    //vaciar los campos
    document.getElementById('diagnosticoPaciente').value = "";
}


//Select tag de 1 a 100 hecho por programación
function pintarCienOptions() {
    var optionEdadMin = document.getElementById('edadMin');
    var optionEdadMax = document.getElementById('edadMax');

    for (i = 1; i <= 100; i++) {
        var selectMin = '<option value=' + i + '>' + i + '</option>';
        var selectMax = '<option value=' + i + '>' + i + '</option>';

        optionEdadMin.innerHTML += selectMin;
        optionEdadMax.innerHTML += selectMax;
    }
}
pintarCienOptions()

//Filtrado por Edad
function filtrarPorEdad(pLista, pEdadMin, pEdadMax) {
    var listaFiltrada = [];
    for (var filtrado of pLista) {
        if (filtrado.edad >= pEdadMin && filtrado.edad <= pEdadMax) {
            listaFiltrada.push(filtrado)
        } else {
            console.log('esta fuera de la búsqueda ' + filtrado.nombre);
        }
    }
    pintarPacientes(listaFiltrada);
}

//Filtrado por Diagnostico
function filtrarPorDiagnostico(pLista, pDiagnostico) {
    var listaFiltrada = [];
    for (paciente of pLista) {
        if (paciente.diagnostico.toLowerCase() == pDiagnostico.toLowerCase()) {
            listaFiltrada.push(paciente);
        }
    }
    pintarPacientes(listaFiltrada);
}

//Filtrado por apellido
function filtrarPorApellido(pLista, pApellido) {
    limpiarBusqueda();
    var listaFiltrada = [];
    for (paciente of pLista) {

        let pacienteSeleccionado = pApellido.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let pacienteBaseDatos = paciente.apellido.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (pacienteBaseDatos == pacienteSeleccionado) {
            listaFiltrada.push(paciente);
        }

    }
    pintarPacientes(listaFiltrada);
}

//Filtrado por Seguridad Social
function pacientesPorSeguridadSocial(pLista, pNumero) {

    var listaFiltrada = [];

    listaFiltrada = pLista.filter((paciente) => {
        var numeroSS = paciente.seg_social;
        var ultimoDigito = numeroSS[numeroSS.length - 1];
        return ultimoDigito == pNumero;
    })
    return listaFiltrada;
}

pacientesPorSeguridadSocial(listadoPacientes, "0");


function limpiarBusqueda() {
    var listado = document.getElementById('lista');
    listado.innerHTML = "";
}


//Pintar pacientes
function pintarPacientes(pLista) {

    limpiarBusqueda();

    var listado = document.getElementById('lista');

    var numeroEncontrados = pLista.length;

    var p = document.createElement('p');
    var numeroPacientes = document.createTextNode(numeroEncontrados + ' pacientes');

    p.appendChild(numeroPacientes);

    listado.appendChild(p);

    for (paciente of pLista) {

        var li = document.createElement('li');
        var strong = document.createElement('h3');
        var pDiagnostico = document.createElement('p');
        var pEdad = document.createElement('p');
        var pSeguridadSocial = document.createElement('p');


        var nombreCompleto = document.createTextNode(paciente.nombre + ' ' + paciente.apellido);
        var diagnostico = document.createTextNode('Diagnóstico: ' + paciente.diagnostico);
        var edad = document.createTextNode('Edad: ' + paciente.edad);
        var seguridadSocial = document.createTextNode('Seguridad social: ' + paciente.seg_social);


        strong.appendChild(nombreCompleto);
        pDiagnostico.appendChild(diagnostico);
        pEdad.appendChild(edad);
        pSeguridadSocial.appendChild(seguridadSocial);

        li.appendChild(strong);
        li.appendChild(pDiagnostico);
        li.appendChild(pEdad);
        li.appendChild(pSeguridadSocial);

        listado.appendChild(li);
    }
}