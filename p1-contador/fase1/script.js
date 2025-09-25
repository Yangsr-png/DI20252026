let contador = 10;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");
const btnMuerte = document.getElementById("btn-muerte");

function actualizarContador() {
  spanContador.textContent = parseFloat(contador).toFixed(1);
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

btnMas.addEventListener("click", () => {
  contador += 0.1;
  if (contador > 10) contador = 10;
  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador -= 0.1;
  if (contador < 0) contador = 0;
  actualizarContador();
});

btnMuerte.addEventListener("click", () => {
  contador = 0;
  actualizarContador();
});

// Inicialización
actualizarContador();


//------------ALUMNOS------------//

const alumnos = document.querySelectorAll(".alumno span.contador");

// Inicializar valores
alumnos.forEach(span => {
  span.textContent = parseFloat(span.getAttribute("data-contador")).toFixed(1);
});

// Botones de la muerte por alumno
const btnsMuerteAlumno = document.querySelectorAll(".btn-muerte-alumno");

btnsMuerteAlumno.forEach(btn => {
  btn.addEventListener("click", () => {
    const span = btn.previousElementSibling;
    span.setAttribute("data-contador", 0);
    span.textContent = parseFloat(0).toFixed(1);
    span.classList.add("changed");
    setTimeout(() => span.classList.remove("changed"), 200);
  });
});

//------------ BOTÓN PARA RESTAR 1 A TODOS ------------//
const btnMenosMultiples = document.getElementById("btn-menos-multiples");

btnMenosMultiples.addEventListener("click", () => {
  alumnos.forEach(span => {
    let valor = parseFloat(span.getAttribute("data-contador"));
    valor -= 1;
    if (valor < 0) valor = 0;
    span.setAttribute("data-contador", valor);
    span.textContent = valor.toFixed(1);
    span.classList.add("changed");
    setTimeout(() => span.classList.remove("changed"), 200);
  });
});
