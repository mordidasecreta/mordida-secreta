/* ===========================
   CONFIGURACIÓN
=========================== */

const callejeraDisponible = false;


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

    const explosiva =
    parseInt(document.getElementById("explosiva").innerText);

    const comboExplosiva =
    parseInt(document.getElementById("comboExplosiva").innerText);

    const callejera =
    parseInt(document.getElementById("callejera").innerText);

    const comboCallejera =
    parseInt(document.getElementById("comboCallejera").innerText);

    const coca =
    parseInt(document.getElementById("coca").innerText);

    const cantidadTotal =
    explosiva +
    comboExplosiva +
    callejera +
    comboCallejera +
    coca;

    document.getElementById("cantidad-total").innerText =
    cantidadTotal + " seleccionados";

    const total =
    explosiva * 18000 +
    comboExplosiva * 21000 +
    callejera * 20000 +
    comboCallejera * 23000 +
    coca * 4000;

    let mensaje = "";

    if(comboExplosiva > 0 || comboCallejera > 0){
        mensaje = "⭐ Incluye Coca-Cola 400 ml";
    }

    document.getElementById("mensaje-ahorro").innerText = mensaje;

    document.getElementById("total").innerText =
    "$" + total.toLocaleString("es-CO");

}
/* ===========================
   PEDIR POR WHATSAPP
=========================== */

function pedirWhatsapp(){

    const explosiva =
    parseInt(document.getElementById("explosiva").innerText);

    const comboExplosiva =
    parseInt(document.getElementById("comboExplosiva").innerText);

    const callejera =
    parseInt(document.getElementById("callejera").innerText);

    const comboCallejera =
    parseInt(document.getElementById("comboCallejera").innerText);

    const coca =
    parseInt(document.getElementById("coca").innerText);

    const nombre =
    document.getElementById("nombre").value;

    const barrio =
    document.getElementById("barrio").value;

    const direccion =
    document.getElementById("direccion").value;

    const pago =
    document.querySelector('input[name="pago"]:checked').value;

    if(nombre === "" || barrio === "" || direccion === ""){
        alert("Por favor completa todos los campos.");
        return;
    }

    if(
        explosiva === 0 &&
        comboExplosiva === 0 &&
        callejera === 0 &&
        comboCallejera === 0 &&
        coca === 0
    ){
        alert("Selecciona al menos un producto.");
        return;
    }

    const total =
    explosiva * 18000 +
    comboExplosiva * 21000 +
    callejera * 20000 +
    comboCallejera * 23000 +
    coca * 4000;

    let productos = "";

    if(explosiva > 0){
        productos += `💥 La Explosiva: ${explosiva}\n`;
    }

    if(comboExplosiva > 0){
        productos += `🥤 Combo Explosiva: ${comboExplosiva}\n`;
    }

    if(callejera > 0){
        productos += `🥩 La Callejera: ${callejera}\n`;
    }

    if(comboCallejera > 0){
        productos += `🥤 Combo Callejera: ${comboCallejera}\n`;
    }

    if(coca > 0){
        productos += `🥤 Coca-Cola 400 ml: ${coca}\n`;
    }

    const mensaje =
`Hola Mordida Secreta.

Quiero realizar el siguiente pedido:

${productos}

Nombre: ${nombre}

Barrio: ${barrio}

Dirección: ${direccion}

Método de pago: ${pago}

Total aproximado: $${total.toLocaleString("es-CO")}`;

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
