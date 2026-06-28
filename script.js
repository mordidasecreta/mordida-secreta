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

  actualizarTotal();
}
/* ===========================
   ACTUALIZAR TOTAL
=========================== */

function actualizarTotal(){

const explosiva = obtenerCantidad("explosiva");

const comboExplosiva = obtenerCantidad("comboExplosiva");

const callejera = obtenerCantidad("callejera");

const comboCallejera = obtenerCantidad("comboCallejera");

const coca = obtenerCantidad("coca");

  let cantidadTotal =
      explosiva +
      comboExplosiva +
      callejera +
      comboCallejera +
      coca;

  document.getElementById("cantidad-total").innerText =
      cantidadTotal + " seleccionados";

let total =
    (explosiva * PRECIOS.explosiva) +
    (comboExplosiva * PRECIOS.comboExplosiva) +
    (callejera * PRECIOS.callejera) +
    (comboCallejera * PRECIOS.comboCallejera) +
    (coca * PRECIOS.coca);

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

  let total =
(explosiva * PRECIOS.explosiva) +
(comboExplosiva * PRECIOS.comboExplosiva) +
(callejera * PRECIOS.callejera) +
(comboCallejera * PRECIOS.comboCallejera) +
(coca * PRECIOS.coca);
  let productos = "";

  let productos = "";

const cantidades = {
  explosiva,
  comboExplosiva,
  callejera,
  comboCallejera,
  coca
};

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
