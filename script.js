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

const PRECIOS = {

  explosiva: 18000,

  comboExplosiva: 21000,

  callejera: 20000,

  comboCallejera: 23000,

  coca: 4000

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

  let explosiva =
  parseInt(document.getElementById("explosiva").innerText);

  let comboExplosiva =
  parseInt(document.getElementById("comboExplosiva").innerText);

  let callejera =
  parseInt(document.getElementById("callejera").innerText);

  let comboCallejera =
  parseInt(document.getElementById("comboCallejera").innerText);

  let coca =
  parseInt(document.getElementById("coca").innerText);

  let cantidadTotal =
      explosiva +
      comboExplosiva +
      callejera +
      comboCallejera +
      coca;

  document.getElementById("cantidad-total").innerText =
      cantidadTotal + " seleccionados";

  let total =
      (explosiva * 18000) +
      (comboExplosiva * 21000) +
      (callejera * 20000) +
      (comboCallejera * 23000) +
      (coca * 4000);

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

  let explosiva =
  document.getElementById('explosiva').innerText;

  let comboExplosiva =
  document.getElementById('comboExplosiva').innerText;

  let callejera =
  document.getElementById('callejera').innerText;

  let comboCallejera =
  document.getElementById('comboCallejera').innerText;

  let coca =
  document.getElementById('coca').innerText;

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
  (parseInt(explosiva) * 18000) +
  (parseInt(comboExplosiva) * 21000) +
  (parseInt(callejera) * 20000) +
  (parseInt(comboCallejera) * 23000) +
  (parseInt(coca) * 4000);

  let productos = "";

  if(parseInt(explosiva) > 0){
    productos += `💥 La Explosiva: ${explosiva}\n`;
  }

  if(parseInt(comboExplosiva) > 0){
    productos += `🥤 Combo Explosiva (con Coca-Cola): ${comboExplosiva}\n`;
  }

  if(parseInt(callejera) > 0){
    productos += `🥩 La Callejera: ${callejera}\n`;
  }

  if(parseInt(comboCallejera) > 0){
    productos += `🥤 Combo Callejera (con Coca-Cola): ${comboCallejera}\n`;
  }

  if(parseInt(coca) > 0){
    productos += `🥤 Coca-Cola 400 ml: ${coca}\n`;
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
