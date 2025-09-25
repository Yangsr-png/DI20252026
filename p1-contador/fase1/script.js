let contador = 10;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");
const btnMasdec = document.getElementById("btn-masdec");
const btnMenosdec = document.getElementById("btn-menosdec");
const btnReset = document.getElementById("btn-reset");
const inputPaso = document.getElementById("input-paso");
let paso = parseInt(inputPaso.value) || 1;

function actualizarContador() {
  // Mostrar sin decimales si es entero, con un decimal si no lo es
  spanContador.textContent = (contador % 1 === 0) ? contador.toFixed(0) : contador.toFixed(1);
  console.log("mensaje");
  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
  actualizarBotones();

  // Cambiar color del contador

  //Eliminar color
  spanContador.classList.remove("color-rojo", "color-amarillo", "color-verde");

  //Añadir color
  if (contador >= 0 && contador <= 4.9) {
    spanContador.classList.add("color-rojo");
  } else if (contador >= 5 && contador <= 7.9) {
    spanContador.classList.add("color-amarillo");
  } else if (contador >= 8 && contador <= 10) {
    spanContador.classList.add("color-verde");
  }


}

// Redondear a un decimal después de cada suma/resta
btnMas.addEventListener("click", () => {
  contador = +(contador + paso).toFixed(1);
  if (contador > 10) {
    contador = 10;
  }
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador = +(contador - paso).toFixed(1);
  if (contador < 0) {
    contador = 0;
  }
  actualizarContador();
});

btnMasdec.addEventListener("click", () => {
  contador = +(contador + paso/10).toFixed(1); // Redondear a un decimal
  if (contador > 10) {
    contador = 10;
  }
  actualizarContador();
});

btnMenosdec.addEventListener("click", () => {
  contador = +(contador - paso/10).toFixed(1); // Redondear a un decimal
  if (contador < 0) {
    contador = 0;
  }
  actualizarContador();
});


// Manejo de teclas
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (contador < 10) {
        contador = +(contador + 1).toFixed(1);
        if (contador > 10) contador = 10;
        actualizarContador();
      }
      break;
    case "ArrowDown":
      if (contador > 0) {
        contador = +(contador - 1).toFixed(1);
        if (contador < 0) contador = 0;
        actualizarContador();
      }
      break;
    case "ArrowRight":
      if (contador < 10) {
        contador = +(contador + 0.1).toFixed(1);
        if (contador > 10) contador = 10;
        actualizarContador();
      }
      break;
    case "ArrowLeft":
      if (contador > 0) {
        contador = +(contador - 0.1).toFixed(1);
        if (contador < 0) contador = 0;
        actualizarContador();
      }
      break;
  }
});

// Inicialización
actualizarContador();

//Desactivar botones
function actualizarBotones() {
  btnMas.disabled = contador >= 10;
  btnMenos.disabled = contador <= 0;
  btnMasdec.disabled = contador >= 10;
  btnMenosdec.disabled = contador <= 0;
}


//Boton para resetear el contador
btnReset.addEventListener("click", () => {
  contador = 0;
  actualizarContador();
});


// Indicar de cuanto en cuanto se va a incrementar o decrementar

//Cambiar los botones
function actualizarBotonesPaso() {
  btnMas.textContent = `+${paso}`;
  btnMenos.textContent = `-${paso}`;
  btnMasdec.textContent = `+${(paso / 10).toFixed(1)}`;
  btnMenosdec.textContent = `-${(paso / 10).toFixed(1)}`;
}

inputPaso.addEventListener("input", () => {
  let nuevoPaso = parseInt(inputPaso.value);
  if (!isNaN(nuevoPaso) && nuevoPaso >= 1 && nuevoPaso <= 10) {
    paso = nuevoPaso;
    actualizarBotonesPaso();
  }
});
