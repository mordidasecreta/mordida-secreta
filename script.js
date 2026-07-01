/* ===========================
   CONFIGURACIÓN
=========================== */

const callejeraDisponible = false;

/* ===========================
   FUNCIONES AUXILIARES
=========================== */

function obtenerCantidad(id){

    return parseInt(
        document.getElementById(id).innerText
    );

}

function obtenerCantidades(){

    return {

        explosiva: obtenerCantidad("explosiva"),

        comboExplosiva: obtenerCantidad("comboExplosiva"),

        callejera: obtenerCantidad("callejera"),

        comboCallejera: obtenerCantidad("comboCallejera"),

        coca: obtenerCantidad("coca")

    };

}
function calcularTotal(cantidades){

    let total = 0;

    for(const id in cantidades){

        total += cantidades[id] * PRECIOS[id];

    }

    return total;

}

/* ===========================
         PRECIOS
=========================== */

const PRECIOS = {

  explosiva: 18000,

  comboExplosiva: 21000,

  callejera: 20000,

  comboCallejera: 23000,

  coca: 4000

};
const NOMBRES = {

  explosiva: "💥 La Explosiva",

  comboExplosiva: "🥤 Combo Explosiva (con Coca-Cola)",

  callejera: "🥩 La Callejera",

  comboCallejera: "🥤 Combo Callejera (con Coca-Cola)",

  coca: "🥤 Coca-Cola 400 ml"

};


/* ===========================
   CAMBIAR CANTIDAD
=========================== */

function cambiarCantidad(id, cambio) {

  let elemento = document.getElementById(id);

  let valor = parseInt(elemento.innerText);

  valor += cambio;

  if(valor < 0){
    valor = 0;
  }

  elemento.innerText = valor;
   if(cambio > 0){

    const boton = event.target;

    const rect = boton.getBoundingClientRect();

    mostrarPlusUno(

        rect.left + rect.width/2,

        rect.top

    );

}

  actualizarTotal();
}
/* ===========================
   ACTUALIZAR TOTAL
=========================== */

function actualizarTotal(){

const cantidades = obtenerCantidades();

   const {
    explosiva,
    comboExplosiva,
    callejera,
    comboCallejera,
    coca
} = cantidades;

const cantidadTotal =
    explosiva +
    comboExplosiva +
    callejera +
    comboCallejera +
    coca;

document.getElementById("cantidad-total").innerText =
    cantidadTotal + " seleccionados";


const total = calcularTotal(cantidades);

  document.getElementById("total").innerText =
      "$" + total.toLocaleString("es-CO");
     let mensajeAhorro = "";

  if(comboExplosiva > 0 || comboCallejera > 0){
      mensajeAhorro = "⭐ Incluye Coca-Cola 400 ml";
  }

  document.getElementById("mensaje-ahorro").innerText =
      mensajeAhorro;

}
/* ===========================
   PEDIR POR WHATSAPP
=========================== */
function pedirWhatsapp() {

const explosiva = obtenerCantidad("explosiva");

const comboExplosiva = obtenerCantidad("comboExplosiva");

const callejera = obtenerCantidad("callejera");

const comboCallejera = obtenerCantidad("comboCallejera");

const coca = obtenerCantidad("coca");

  let nombre =
  document.getElementById('nombre').value;

  let barrio =
  document.getElementById('barrio').value;

  let direccion =
  document.getElementById('direccion').value;

  let pago =
  document.querySelector('input[name="pago"]:checked').value;

  if(nombre === "" || barrio === "" || direccion === ""){
    alert("Por favor completa todos los campos.");
    return;
  }

  if(
    parseInt(explosiva) === 0 &&
    parseInt(comboExplosiva) === 0 &&
    parseInt(callejera) === 0 &&
    parseInt(comboCallejera) === 0 &&
    parseInt(coca) === 0
  ){
    alert("Selecciona al menos un producto.");
    return;
  }

const cantidades = {
    explosiva,
    comboExplosiva,
    callejera,
    comboCallejera,
    coca
};

const total = calcularTotal(cantidades);
  let productos = "";


for(const id in cantidades){

  if(cantidades[id] > 0){

    productos += `${NOMBRES[id]}: ${cantidades[id]}\n`;

  }

}

  let mensaje =
`Hola Mordida Secreta.

Quiero realizar el siguiente pedido:

${productos}

Nombre: ${nombre}

Barrio: ${barrio}

Dirección: ${direccion}

Método de pago: ${pago}

Total aproximado: $${total.toLocaleString('es-CO')}`;

  window.open(
    "https://wa.me/573183785587?text=" +
    encodeURIComponent(mensaje),
    "_blank"
  );
}
/* ===========================
   INICIO DE LA PÁGINA
=========================== */

window.onload = function(){

    if(!callejeraDisponible){

        document.getElementById("estado-callejera").innerHTML =
        '<div class="agotado">❌ AGOTADA</div>';

        document.getElementById("estado-combo-callejera").innerHTML =
        '<div class="agotado">❌ AGOTADO</div>';

        document.querySelector("#card-callejera .cantidad").style.display = "none";

        document.querySelector("#card-combo-callejera .cantidad").style.display = "none";

    }

    actualizarTotal();

};


/* ===========================
   EFECTO +1
=========================== */

function mostrarPlusUno(x, y){

    const aviso = document.createElement("div");

    aviso.className = "plus-one";

    aviso.innerHTML = "+1 🥪";

    aviso.style.left = x + "px";

    aviso.style.top = y + "px";

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.remove();

    },900);

}
