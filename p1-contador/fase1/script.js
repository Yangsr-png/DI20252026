let contador = 10;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");

function actualizarContador() {
  spanContador.textContent = contador;

  // habilitar/deshabilitar botones según el valor del contador
  if (contador >= 10) {
    btnMas.disabled = true;
  } else if (contador < 10) {
    btnMas.disabled = false;
  }
  if (contador <= 0) {
    btnMenos.disabled = true;
  } else if (contador > 0) {
    btnMenos.disabled = false;
  }

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

btnMas.addEventListener("click", () => {
  contador += 0.1;
  contador = Math.round(contador * 10) / 10;

  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador -= 0.1;
  contador = Math.round(contador * 10) / 10;
  
  actualizarContador();
});

// Inicialización
actualizarContador();
