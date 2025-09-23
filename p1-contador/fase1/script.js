let contador = 5;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");

function actualizarContador() {
  spanContador.textContent = contador;

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

btnMas.addEventListener("click", () => {
  contador++;
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador--;
  actualizarContador();
});

// Inicialización
actualizarContador();
