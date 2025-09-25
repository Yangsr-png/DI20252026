let contador = 20;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");

function actualizarContador() {
  spanContador.textContent = parseFloat(contador).toFixed(1);

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 350);
  efectoColorDelContador();
}
function efectoColorDelContador() {
  if(contador >1 && contador <=10) {
    spanContador.style.color = "red";
  } else if(contador > 10 && contador <= 15) {
    spanContador.style.color = "orange";
  } else if(contador > 15 && contador <= 20) {
    spanContador.style.color = "green";
  }

}

btnMas.addEventListener("click", () => {
  if(contador > 19.5) return;
  contador += 0.5;
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  if(contador < 0.5) return;
  contador -= 0.5;
  actualizarContador();
});

// Inicialización
actualizarContador();
