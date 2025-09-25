let contador = 10; // Variable que guarda el valor actual del contador
// Referencias a los elementos del DOM
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");

function actualizarContador() {
  // toFixed(1) obliga a redondear y formatear el número a un solo decimal
  spanContador.textContent = contador.toFixed(1);
  console.log("mensaje");// Mensaje de depuración en la consola

  // Cambiar color según rango
  if (contador >= 8 && contador <= 10) {
    spanContador.style.color = "green";
  } else if (contador >= 5 && contador < 8) {
    spanContador.style.color = "orange";
  } else {
    spanContador.style.color = "red";
  }

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
   // Después de 200ms se quita la clase para que pueda repetirse el efecto
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

btnMas.addEventListener("click", () => {
  contador+=.1;
  if(contador>10) contador=10;
  
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador-=.1;
  if(contador<0) contador=0;
  actualizarContador();
});

// Inicialización
//Llamada inicial para mostrar el contador en pantalla al cargar
actualizarContador();
