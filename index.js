class Provincia {

    constructor(nombre, distancia, valorHotel, datoProvincia) {
        this.nombre = nombre;
        this.distancia = distancia;
        this.valorHotel = valorHotel;
        this.datoProvincia = datoProvincia;
    }

}

const provincias = [

    {
        nombre: "cordoba",
        distancia: 800,
        valorHotel: 1500,
        datoProvincia: "En Cordoba podes visitar Tras La Sierra, zona de montes y rios ideal para disfrutar en verano."
    },
    {
        nombre: "santa fe",
        distancia: 500,
        valorHotel: 1000,
        datoProvincia: "En Santa Fe capital, se encuentra el rio Parana. Tomate un Amargo Obrero en la ribera."
    },
    {
        nombre: "chubut",
        distancia: 900,
        valorHotel: 2500,
        datoProvincia: "Si visitas la provincia de Chubut entre los meses de septiembre a diciembre, podras ver ballenas francas australes nadando por las costas de Puerto Madryn."
    },
    {
        nombre: "rio negro",
        distancia: 1000,
        valorHotel: 3000,
        datoProvincia: "Rio Negro, una de las provincias con mas atractivos turisticos de la Patagonica. Algunos destinos imperdibles son: Bariloche, San Martin de los Andes, Villa La Angostura y muchos mas. "
    },

]

let formulario = document.getElementById("formulario");
let nombreIngresado = document.getElementById("nombre");
let distanciaIngresada = document.getElementById("distancia");
let valorHotelIngresado = document.getElementById("valorhotel");
let datoProvinciaIngresado = document.getElementById("datocurioso");
let provinciaAgregada = document.getElementById("provinciaAgregada");

let formCalculadora = document.getElementById("formCalculadora");

let destino = document.getElementById("destino");
let presupuestoOtorgado = document.getElementById("presupuesto");
let cantidadDias = document.getElementById("dias");

let btnEnvio = document.getElementById("btnEnvio");
let btnCalcular = documentgetElementById("btnCalcular");

btnEnvio.addEventListener("click", validarFormulario);
btnCalcular.addEventListener("click", calculadora);

function traslado(kilometros, valor) {

    let valorKilometro = kilometros * valor;
    return valorKilometro;
}

function hospedaje(dias, valor) {

    let valorHospedaje = dias * valor;
    return valorHospedaje;
}

function costoViaje(valorHospedaje, valorKilometro) {

    costo = valorHospedaje + valorKilometro;
    return costo;
}

function destinoPosible(presupuesto, costoTotal) {

    if (parseFloat(presupuesto) > parseFloat(costoTotal)) {
        viajePosible.innerHTML =
            "Con el presupuesto dado podras darte unas buenas vacaciones!"
        return true;
    } else {
        viajePosible.innerHTML =
            "Con el presupuesto dado quizas puedas probar con otro destino o ir menos dias"
        return false;
    }
}

function verDato(provincia) {

    let datoCheck = document.getElementById("verDato").checked;

    if (datoCheck === true) {
        let dato = provincia["datoProvincia"];
        datoConteiner.innerHTML =
            `<p><strong>Aqui mas info : </strong> ${dato}</p>`
        return dato = provincia['datoProvincia'];
    }
}

function calculadora(event) {

    event.preventDefault();

    resultados.innerHTML = ""
    viajePosible.innerHTML = ""
    datoConteiner.innerHTML = ""

    let destinoSeleccionado = destino.value;

    let presupuesto = presupuestoOtorgado.value;

    let dias = cantidadDias.value;

    const provinciaEncontrada = provincias.find(provincia => provincia.nombre === destinoSeleccionado.toLowerCase());

    if (provinciaEncontrada !== "", presupuesto !== "", dias !== "") {

        const valorKilometro = 50;
        let costoHotel = provinciaEncontrada['valorHotel'];
        let costoTraslado = traslado(provinciaEncontrada['distancia'], valorKilometro);
        let costoHospedaje = hospedaje(dias, costoHotel);
        let costoTotal = costoViaje(costoTraslado, costoHospedaje);

        mostrarEnDomCalculadora(costoTotal);
        destinoPosible(presupuesto, costoTotal);
        verDato(provinciaEncontrada);
    } else {
        resultados.innerHTML =
            "Por favor, completa todos los datos solicitados"
    }

    formCalculadora.reset();

}

function mostrarEnDomCalculadora(costoTotal) {

    resultados.innerHTML =
        `<h2>Este es el resultado de tu viaje! </h2>
    <p><strong>Costo aproximado: </strong>$ ${costoTotal}</p>`
}

function validarFormulario(event) {

    event.preventDefault();

    let nombre = nombreIngresado.value;

    let distancia = parseFloat(distanciaIngresada.value);

    let valorHotel = parseFloat(valorHotelIngresado.value);

    let datoProvincia = datoProvinciaIngresado.value;

    let provincia = new Provincia(
        nombre,
        distancia,
        valorHotel,
        datoProvincia
    );

    provincias.push(provincia)
    formulario.reset();
    provinciaAgregada.innerHTML = '';
    mostrarEnDom(nombre, distancia, valorHotel, datoProvincia);
}

function mostrarEnDom(nombre, distancia, valorHotel, datoProvincia) {

    provinciaAgregada.innerHTML =
        `<h2>Tu destino ha sido agregado!</h2>
    <p><strong>Nombre: </strong> ${nombre}</p>
    <p><strong>Distancia: </strong> ${distancia}</p>
    <p><strong>Valor del Hotel: </strong> ${valorHotel}</p>
    <p><strong>Dato curioso: </strong> ${datoProvincia}</p>
    <h3>Muchas gracias por tu colaboracion :)</h3>`
}