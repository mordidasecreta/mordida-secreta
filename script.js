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
const MENSAJES={

explosiva:[
"🔥 Nuestra receta secreta",
"🤤 Imposible comer solo uno",
"🤤 Esa nunca falla",
"🔥 Buena elección",
"😮💨 Vas a querer otra",
"💥 La favorita de la casa"
],

comboExplosiva:[
"🥤 La combinación perfecta",
"🍟 Todo sabe mejor en combo",
"😋 Excelente elección",
 "🥤 Así sabe mejor",
"😎 El combo ganador",
"🔥 Buena decisión",
"🤤 No le falta nada"
],

callejera:[
"🥩 Sabor auténtico",
"🔥 Mucho carácter",
"😎 Puro estilo callejero"
],

comboCallejera:[
"🥤 Combo completo",
"🍟 No le falta nada",
"🤩 Una gran elección"
],

coca:[
"🧊 ¡Bien fría!",
"❄️ Refrescante",
"🥶 Salida del hielo",
"🥤 El complemento perfecto",
"❤️ La pareja perfecta",
"😮💨 Ahora sí",
"🥤 No puede faltar"
]

};


/* ===========================
   CAMBIAR CANTIDAD
=========================== */

function cambiarCantidad(id, cambio, e) {

    let elemento = document.getElementById(id);

    let valor = parseInt(elemento.innerText);

    valor += cambio;

    if(valor < 0){
        valor = 0;
    }

    elemento.innerText = valor;
   elemento.classList.remove("numero-pop");

void elemento.offsetWidth;

elemento.classList.add("numero-pop");
   if(cambio>0){

    mostrarMensajeCard(id);

}
   const tarjeta =
    elemento.closest(".producto-v3") ||
    elemento.closest(".card");
   
   if(tarjeta){

    tarjeta.classList.remove("pop");

    void tarjeta.offsetWidth;

    tarjeta.classList.add("pop");

}
   const imagen = tarjeta.querySelector("img");

if(imagen){

    imagen.classList.remove("imagen-pop");

    void imagen.offsetWidth;

    imagen.classList.add("imagen-pop");

}

    if(cambio > 0 && e){

        const rect = e.target.getBoundingClientRect();

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
 
let listaHTML = "";

for(const id in cantidades){

    if(cantidades[id] > 0){

        listaHTML += `
        <div class="producto-item">
            <span>${NOMBRES[id]}</span>
            <span>x${cantidades[id]}</span>
        </div>`;
    }

}

const lista = document.getElementById("lista-productos");

if(lista){
    lista.innerHTML = listaHTML;
}


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

document.getElementById("barra-cantidad").innerText =
cantidadTotal + (cantidadTotal===1 ? " producto" : " productos");

document.getElementById("barra-total").innerText =
"$" + total.toLocaleString("es-CO");

const barra = document.getElementById("barra-compra");

barra.classList.toggle("visible", cantidadTotal > 0);

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
/* ==function pedirWhatsapp() {

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

 const urlWhatsapp =
"https://wa.me/573183785587?text=" +
encodeURIComponent(mensaje);

animacionEnviarPedido(urlWhatsapp);
}== */
/* ===========================
   MOSTRAR FORMULARIO
=========================== */

function mostrarFormulario(){

    pasoActual = 0;

    mostrarPaso();

    document
    .getElementById("barra-compra")
    .classList.remove("visible");

    document
    .getElementById("asistentePedido")
    .classList.add("activo");

}
/* ===========================
   ANIMACIÓN SCROLL
=========================== */

function iniciarAnimaciones(){

    const elementos =
    document.querySelectorAll(".animar");

    const observer =
    new IntersectionObserver((entradas)=>{

        entradas.forEach((entrada)=>{

            if(entrada.isIntersecting){

                entrada.target.classList.add("visible");

            }

        });

    },{
        threshold:.15
    });

    elementos.forEach((elemento)=>{

        elemento.classList.add("oculto");

        observer.observe(elemento);

    });

}
/* ===========================
   INICIO DE LA PÁGINA
=========================== */


window.onload = function(){

    if(!callejeraDisponible){


        document.querySelector("#card-callejera .cantidad").style.display = "none";

        document.querySelector("#card-combo-callejera .cantidad").style.display = "none";

       document
.getElementById("card-callejera")
.classList
.add("no-disponible");

document
.getElementById("card-combo-callejera")
.classList
.add("no-disponible");

    }

    actualizarTotal();

    iniciarAnimaciones();

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
/* ===========================
   EFECTO LUZ PREMIUM
=========================== */

document.querySelectorAll(".card, .producto-v3").forEach(card=>{

    const luz = document.createElement("div");

    luz.className = "mouse-light";

    card.appendChild(luz);

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        luz.style.left = (e.clientX - rect.left) + "px";
        luz.style.top = (e.clientY - rect.top) + "px";
        luz.style.opacity = "1";

    });

    card.addEventListener("mouseleave",()=>{

        luz.style.opacity = "0";

    });

});

function mostrarMensajeCard(id){

    const lista = MENSAJES[id];

    const boton = document
        .getElementById(id)
        .parentElement
        .querySelector("button:last-child");

    const mensaje = document.createElement("div");

    mensaje.className = "mensaje-flotante";

    mensaje.innerHTML =
        lista[Math.floor(Math.random()*lista.length)];

    boton.parentElement.appendChild(mensaje);

    clearTimeout(mensaje.timer);

    setTimeout(()=>{

        mensaje.classList.add("mostrar");

    },10);

    setTimeout(()=>{

        mensaje.classList.remove("mostrar");

        setTimeout(()=>{

            mensaje.remove();

        },300);

    },1800);

}
/* ===========================
   tarjeta se abra
=========================== */

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("click",(e)=>{

        // No abrir si se tocaron los botones + o -
        if(e.target.closest(".cantidad")){
            return;
        }

        // Cerrar las demás tarjetas
        document.querySelectorAll(".card").forEach(c=>{

            if(c!==card){
                c.classList.remove("abierta");
            }

        });

        // Abrir o cerrar la actual
        card.classList.toggle("abierta");

    });

});
/*==let pasoActual = 1;

const titulos = {

1:"¿Cómo te llamas?",

2:"¿En qué barrio estás?",

3:"¿Cuál es la dirección?",

4:"¿Cómo deseas pagar?"

};

const iconos = {

1:"👤",

2:"📍",

3:"🏠",

4:"💳"

};

const btnPaso = document.getElementById("btnPaso");

if(btnPaso){

btnPaso.onclick=function(){

if(pasoActual<4){

document
.getElementById("paso"+pasoActual)
.classList.remove("activo");

pasoActual++;

document
.getElementById("paso"+pasoActual)
.classList.add("activo");

document
.getElementById("checkout-titulo")
.innerHTML=titulos[pasoActual];

document
.getElementById("checkout-icon")
.innerHTML=iconos[pasoActual];

const bolitas=document.querySelectorAll(".checkout-progress span");

bolitas.forEach((b,i)=>{

b.classList.toggle("activo",i<pasoActual);

});

if(pasoActual===4){

btnPaso.innerHTML="🟢 Enviar pedido";

}

}else{

pedirWhatsapp();

}

}

}===*/
/*==================================
SECRETO AUTOMÁTICO V3
==================================*/

function mostrarSecreto(card){

    const secreto = card.querySelector(".ingredientes");
    const hint = card.querySelector(".hint-secreto");

    if(secreto.classList.contains("mostrar")) return;

    secreto.classList.add("mostrar");

    hint.style.display="none";

    card.style.transform="scale(1.02)";

    clearTimeout(secreto.timer);

    secreto.timer=setTimeout(()=>{

        secreto.classList.remove("mostrar");

        hint.style.display="block";

        card.style.transform="scale(1)";

    },3000);

}
/*=====================================
EVENTO TARJETA V3
=====================================*/

document.querySelectorAll(".producto-v3").forEach(card=>{

    card.addEventListener("click",(e)=>{

        if(e.target.closest(".cantidad")) return;

        mostrarSecreto(card);

    });

});
/*==================================
ASISTENTE DE PEDIDO
==================================*/

let pasoActual = 0;

const pedido = {

    nombre: "",

    barrio: "",

    direccion: "",

    pago: "Efectivo"

};

const pasos = [

{
icono:"👋",
titulo:"¿Cómo te llamas?",
placeholder:"Escribe tu nombre",
boton:"Continuar →"
},

{
icono:"📍",
titulo:"",
placeholder:"Escribe tu barrio",
boton:"Continuar →"
},

{
icono:"🏠",
titulo:"",
placeholder:"Escribe tu dirección",
boton:"Continuar →"
},

{
icono:"💳",
titulo:"",
placeholder:"",
boton:"Revisar pedido →"
},

{
icono:"🤫",
titulo:"",
placeholder:"",
boton:"🟢 Enviar por WhatsApp"
}

];
function mostrarPaso(){

    const paso = pasos[pasoActual];

    document.getElementById("asistenteIcono").textContent = paso.icono;

   const titulo =
document.getElementById("asistenteTitulo");

if(pasoActual===0){

    titulo.innerHTML="¿Cómo te llamas?";

}

else if(pasoActual===1){

    titulo.innerHTML=
    `Mucho gusto <span style="color:#d4af37">${pedido.nombre}</span>.<br>¿A qué barrio llevamos tu mordida?`;

}

else if(pasoActual===2){

    titulo.innerHTML=
    `Perfecto.<br>Entonces vamos para <span style="color:#d4af37">${pedido.barrio}</span>.<br>¿Cuál es la dirección?`;

}

else if(pasoActual===3){

    titulo.innerHTML=
    `Excelente.<br>Ya sabemos dónde entregar.<br>¿Cómo deseas pagar?`;

}

else{

    titulo.innerHTML=
    `Perfecto <span style="color:#d4af37">${pedido.nombre}</span>.<br>Solo revisa tu pedido.`;

}

    document.getElementById("btnContinuarAsistente").textContent = paso.boton;

    const input = document.getElementById("asistenteInput");

    const pago = document.getElementById("contenedorPago");

    const resumen = document.getElementById("resumenPedido");

    // Ocultamos todo
    input.style.display = "none";
    pago.style.display = "none";
    resumen.style.display = "none";

    // Paso 1,2,3
    if(pasoActual <= 2){

    input.style.display = "block";

    input.placeholder = paso.placeholder;

    input.value = "";

    input.focus();

}

    // Paso 4
    if(pasoActual === 3){

        pago.style.display = "block";

    }

    // Paso 5
   if(pasoActual === 4){

    resumen.style.display = "block";

    actualizarFactura();
      // Número del pedido
document.getElementById("numeroPedido").innerText =
"#" + Math.floor(1000 + Math.random()*9000);

// Fecha
const hoy = new Date();

document.getElementById("fechaPedido").innerText =
hoy.toLocaleDateString("es-CO");

}
const puntos =
document.querySelectorAll("#progresoPedido span");

puntos.forEach((punto, indice)=>{

    // El último se controla aparte
    if(indice < 4){

        punto.classList.toggle("activo", indice <= pasoActual);

    }

});

const ultimo =
document.getElementById("ultimoPaso");

if(pasoActual === 4){

    ultimo.classList.add("activo");
    ultimo.innerHTML = "✓";

}else{

    ultimo.classList.remove("activo");
    ultimo.innerHTML = "";

}
}
function siguientePaso(){

    // PASO 1
    if(pasoActual === 0){

        const valor = document
        .getElementById("asistenteInput")
        .value
        .trim();

        if(valor === ""){

    alert("Escribe tu nombre.");

    return;

}

        pedido.nombre = valor;

    }

    // PASO 2
    if(pasoActual === 1){

        const valor = document
        .getElementById("asistenteInput")
        .value
        .trim();

        if(valor === ""){

    mostrarError("Escribe tu barrio.");

    return;

}

limpiarError();

        pedido.barrio = valor;

    }

    // PASO 3
    if(pasoActual === 2){

        const valor = document
        .getElementById("asistenteInput")
        .value
        .trim();

     if(valor === ""){

    alert("Escribe tu dirección.");

    return;

}

limpiarError();

        pedido.direccion = valor;

    }

    // PASO 4
    if(pasoActual === 3){

        pedido.pago =
        document.querySelector(
        'input[name="pago"]:checked'
        ).value;

    }

    if(pasoActual < 4){

        pasoActual++;

        mostrarPaso();

    }else{

    enviarPedidoWhatsApp();

}
   
}

function volverPaso(){

    if(pasoActual > 0){

        pasoActual--;

        mostrarPaso();

    }else{

        cerrarAsistente();

    }

}
function mostrarError(texto){

    const error =
    document.getElementById("mensajeError");

    error.textContent = texto;

    error.classList.add("mostrar");

}

function limpiarError(){

    const error =
    document.getElementById("mensajeError");

    error.textContent = "";

    error.classList.remove("mostrar");

}

function cerrarAsistente(){

    document
    .getElementById("asistentePedido")
    .classList.remove("activo");

    document
    .getElementById("barra-compra")
    .classList.add("visible");

}
document.getElementById("asistenteInput").addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        e.preventDefault();

        siguientePaso();

    }

});
function actualizarFactura(){

    // Cliente
    document.getElementById("facturaCliente").innerHTML = `
        👤 <strong>${pedido.nombre}</strong><br>
        📍 ${pedido.barrio}<br>
        🏠 ${pedido.direccion}
    `;

    // Productos
    const cantidades = obtenerCantidades();

    let html = "";

    for(const id in cantidades){

        if(cantidades[id] > 0){

            html += `
            <div class="factura-item">
                <span>${NOMBRES[id]}</span>
                <span>x${cantidades[id]}</span>
            </div>
            `;

        }

    }

    document.getElementById("facturaProductos").innerHTML = html;

    // Pago
    document.getElementById("facturaPago").innerHTML = `
        💳 <strong>Método de pago</strong><br>
        ${pedido.pago}
    `;

    // Total
    const total = calcularTotal(cantidades);

    document.getElementById("facturaTotalValor").innerHTML =
        "$" + total.toLocaleString("es-CO");

}
function enviarPedidoWhatsApp(){

    const cantidades = obtenerCantidades();

    let productos = "";

    for(const id in cantidades){

        if(cantidades[id] > 0){

            productos +=
            `• ${NOMBRES[id]} x${cantidades[id]}\n`;

        }

    }

    const total = calcularTotal(cantidades);

    const mensaje =
`🍔 *MORDIDA SECRETA*

📝 *Nuevo pedido*

👤 ${pedido.nombre}

📍 ${pedido.barrio}

🏠 ${pedido.direccion}

-------------------------

${productos}

-------------------------

💳 Pago: ${pedido.pago}

💰 Total: $${total.toLocaleString("es-CO")}`;

    const numero = "573183785587";

    const urlWhatsapp =
`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    animacionEnviarPedido(urlWhatsapp);

}   // ← ESTA LLAVE FALTABA
   
function animacionEnviarPedido(urlWhatsapp){

    const overlay = document.getElementById("overlayEnvio");
    const barra = document.getElementById("progresoEnvio");
    const texto = document.getElementById("textoEnvio");

    overlay.classList.add("activo");

    barra.style.width = "0%";

    let progreso = 0;

    const intervalo = setInterval(()=>{

        progreso += 2;

        barra.style.width = progreso + "%";

        if(progreso < 35){
            texto.innerText = "Un momento.";
        }else if(progreso < 70){
            texto.innerText = "Un momento..";
        }else{
            texto.innerText = "Un momento...";
        }

        if(progreso >= 100){

            clearInterval(intervalo);

            texto.innerText = "¡Todo listo!";

            setTimeout(()=>{

                overlay.classList.remove("activo");

                window.open(urlWhatsapp,"_blank");

            },300);

        }

    },25);

}
