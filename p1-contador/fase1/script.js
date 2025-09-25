let contador = 10;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");
const btnReset = document.getElementById("btn-reset");
const btnMasDecimal = document.getElementById("btn-mas-decimal");
const btnMenosDecimal = document.getElementById("btn-menos-decimal");



function actualizarContador() {
  // Mostrar hasta 1 decimal si es necesario
  spanContador.textContent = Number.isInteger(contador) ? contador : contador.toFixed(1);

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}



function limitarContador(valor) {
  if (valor < 0) return 0;
  if (valor > 10) return 10;
  return valor;
}

btnMas.addEventListener("click", () => {
  contador = limitarContador(contador + 1);
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador = limitarContador(contador - 1);
  actualizarContador();
});

btnMasDecimal.addEventListener("click", () => {
  contador = limitarContador(Math.round((contador + 0.1) * 10) / 10);
  actualizarContador();
});

btnMenosDecimal.addEventListener("click", () => {
  contador = limitarContador(Math.round((contador - 0.1) * 10) / 10);
  actualizarContador();
});

btnReset.addEventListener("click", () => {
  if (contador < 10) {
    contador = 10;
    actualizarContador();
  }
});

btnReset.addEventListener("click", () => {
  for (const n of estado.keys()) estado.set(n, 10);
  renderLista();
  setEstado("Todos los contadores han sido reiniciados a 10.");
});


// Inicialización
actualizarContador();
