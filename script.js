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
"💥 La favorita de la casa"
],

comboExplosiva:[
"🥤 La combinación perfecta",
"🍟 Todo sabe mejor en combo",
"😋 Excelente elección"
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
"🥤 El complemento perfecto"
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

document.getElementById("lista-productos").innerHTML = listaHTML;


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
cantidadTotal + " productos";

document.getElementById("barra-total").innerText =
"$" + total.toLocaleString("es-CO");
   const barra = document.getElementById("barra-compra");

if(cantidadTotal > 0){

    barra.classList.add("visible");

}else{

    barra.classList.remove("visible");

}

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
   MOSTRAR FORMULARIO
=========================== */

function mostrarFormulario(){

    document
        .getElementById("checkout")
        .classList.add("abierto");

    document
        .getElementById("overlay")
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

document.querySelectorAll(".card").forEach(card=>{

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

    const card=document.getElementById(id).closest(".card");

    let mensaje=card.querySelector(".mensaje-card");

    if(!mensaje){

        mensaje=document.createElement("div");

        mensaje.className="mensaje-card";

        card.appendChild(mensaje);

    }

    const lista=MENSAJES[id];

    mensaje.innerHTML=
    lista[Math.floor(Math.random()*lista.length)];

    mensaje.classList.remove("mostrar");

void mensaje.offsetWidth;

mensaje.classList.add("mostrar");

    clearTimeout(mensaje.timer);

    mensaje.timer=setTimeout(()=>{

        mensaje.classList.remove("mostrar");

    },2500);

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
let pasoActual = 1;

const titulos = {

    1:"¿Cómo te llamas?",

    2:"¿En qué barrio estás?",

    3:"¿Cuál es la dirección?",

    4:"¿Cómo deseas pagar?"

};

document

.getElementById("btnPaso")

.onclick=function(){

    if(pasoActual<4){

        document

        .getElementById("paso"+pasoActual)

        .classList.remove("activo");

        pasoActual++;

        document

        .getElementById("paso"+pasoActual)

        .classList.add("activo");

        document

        .getElementById("numeroPaso")

        .innerHTML=pasoActual;

        document

        .getElementById("tituloPaso")

        .innerHTML=titulos[pasoActual];

    }

    else{

        pedirWhatsapp();

    }

}
/*==================================
SECRETO AUTOMÁTICO V3
==================================*/

function mostrarSecreto(card){

    // Si el usuario seleccionó texto, no hacer nada
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
