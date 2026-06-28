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
