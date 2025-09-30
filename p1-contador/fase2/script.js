// ========================
// Estado en memoria
// ========================

// Estado simple en memoria: { nombre: valor }
// Usamos un Map porque nos permite asociar cada nombre con su valor (contador)
const estado = new Map(); 

// ========================
// Referencias a elementos del DOM
// ========================
const lista = document.getElementById("lista"); // Contenedor donde se generan las tarjetas de personas
const estadoUI = document.getElementById("estado"); // Mensajes de estado accesibles (aria-live)
const btnCargar = document.getElementById("btn-cargar-nombres"); // Botón para cargar nombres.txt
const btnReset = document.getElementById("btn-reset"); // Botón para reiniciar todos a 10
const btnSumarPuntos = document.getElementById("btn-sumarPuntos"); // Botón global +1
const btnMasMedioPunto = document.getElementById("btn-masMedioPunto"); // Botón global +0.1
const btnRestarPuntos = document.getElementById("btn-restarPuntos"); // Botón global -1
const btnMenosMedioPunto = document.getElementById("btn-menosMedioPunto"); // Botón global -0.1
const inputArchivo = document.getElementById("input-archivo"); // Input file para subir un archivo local
const tpl = document.getElementById("tpl-persona"); // Template HTML para clonar una persona

// ========================
// Utilidades
// ========================

// Elimina acentos/diacríticos y espacios extras → usado para ordenar alfabéticamente
function normalizaNombre(s) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
}

// Crea un nodo HTML <.persona> a partir de un nombre y valor inicial
function renderPersona(nombre, valor = 10) {
  const node = tpl.content.firstElementChild.cloneNode(true); // Clona el template
  node.dataset.nombre = nombre; // Guarda el nombre en un data-atributo
  node.querySelector(".nombre").textContent = nombre; // Inserta el nombre en la tarjeta
  const span = node.querySelector(".contador");
  span.textContent = valor;
  span.dataset.valor = String(valor);

  // Color inicial según valor
  span.classList.remove("verde", "verdeSuave","naranja", "rojo");
  if (valor >= 9) {
    span.classList.add("verde");
  } else if(valor >= 7){
    span.classList.add("verdeSuave");
  } else if (valor >= 5) {
    span.classList.add("naranja");
  } else {
    span.classList.add("rojo");
  } 
  return node;
}

// Pequeña animación "bump" (rebote visual en el número al cambiar)
function bump(el) {
  el.classList.add("bump");
  setTimeout(() => el.classList.remove("bump"), 160);
}

// Renderiza toda la lista de estudiantes desde el estado
// Se ordena alfabéticamente con normalización (ignora acentos/espacios extras)
function renderLista() {
  lista.innerHTML = "";
  const nombres = Array.from(estado.keys()).sort((a, b) =>
    normalizaNombre(a).localeCompare(normalizaNombre(b))
  );
  for (const n of nombres) {
    const v = estado.get(n) ?? 10;
    lista.appendChild(renderPersona(n, v));
  }
}

// Actualiza el mensaje de estado (para feedback accesible con aria-live)
function setEstado(msg) {
  estadoUI.textContent = msg ?? "";
}

// ========================
// Carga de nombres desde archivos
// ========================

// Carga nombres desde un archivo del servidor (txt o json)
async function cargarNombresDesdeTxt(url = "nombres.txt") {
  setEstado("Cargando nombres…");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo leer ${url}`);
  const text = await res.text();

  // Permite leer archivos .txt (una línea = un nombre) o .json (array de strings)
  let nombres;
  if (url.endsWith(".json")) {
    const arr = JSON.parse(text);
    nombres = Array.isArray(arr) ? arr : [];
  } else {
    nombres = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  }

  if (nombres.length === 0) throw new Error("El archivo no contiene nombres.");

  // Si un nombre no existía en el estado, se inicializa con valor 10
  for (const n of nombres) {
    if (!estado.has(n)) estado.set(n, 10);
  }
  renderLista();
  setEstado(`Cargados ${nombres.length} nombres.`);
}

// Carga nombres desde un archivo local (seleccionado con <input type="file">)
async function cargarDesdeArchivoLocal(file) {
  const text = await file.text();
  let nombres;
  if (file.name.endsWith(".json")) {
    const arr = JSON.parse(text);
    nombres = Array.isArray(arr) ? arr : [];
  } else {
    nombres = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  }

  if (nombres.length === 0) throw new Error("El archivo no contiene nombres.");

  for (const n of nombres) {
    if (!estado.has(n)) estado.set(n, 10);
  }
  renderLista();
  setEstado(`Cargados ${nombres.length} nombres desde archivo local.`);
}

// ========================
// Interacción con la UI (tarjetas individuales)
// ========================

// Delegación de eventos: un solo listener para todos los botones dentro de lista
lista.addEventListener("click", (ev) => {
  const btn = ev.target.closest("button");
  if (!btn) return;
  const card = btn.closest(".persona");
  if (!card) return;

  const nombre = card.dataset.nombre;
  if (!estado.has(nombre)) return;

  const span = card.querySelector(".contador");
  let valor = Number(span.dataset.valor || "10");

  // Ajustes según el botón pulsado
  if (btn.classList.contains("btn-redondeado-mas")) valor += 0.1;
  if (btn.classList.contains("btn-mas")) valor += 1;
  if (btn.classList.contains("btn-redondeado-menos")) valor -= 0.1;
  if (btn.classList.contains("btn-menos")) valor -= 1;
  
  // Limitar rango [0,10]
  if (valor > 10) valor = 10;
  if (valor < 0) valor = 0;

  // Botones especiales
  if (btn.classList.contains("btn-muerte")) valor = 0; // Calavera → directo a 0
  if (btn.classList.contains("btn-magico")) valor = Number((Math.random() * 10).toFixed(1)); // Aleatorio 0-10

  // Actualiza estado y UI
  estado.set(nombre, valor);
  span.dataset.valor = String(valor);
  span.textContent = Number(valor.toFixed(1)); // Siempre con 1 decimal
  bump(span);

  // Reaplica color dinámico según valor
  span.classList.remove("verde", "verdeSuave","naranja", "rojo");
  if (valor >= 9) {
    span.classList.add("verde");
  } else if(valor >= 7){
    span.classList.add("verdeSuave");
  } else if (valor >= 5) {
    span.classList.add("naranja");
  } else {
    span.classList.add("rojo");
  }
});

// ========================
// Botones globales
// ========================

// Reinicia todos los contadores a 10
btnReset.addEventListener("click", () => {
  for (const n of estado.keys()) estado.set(n, 10);
  renderLista();
  setEstado("Todos los contadores han sido reiniciados a 10.");
});

// Función auxiliar: devuelve lista de estudiantes seleccionados (checkbox marcado)
function getSeleccionados() {
  return Array.from(lista.querySelectorAll(".persona"))
    .filter(card => card.querySelector(".puntuacion")?.checked)
    .map(card => card.dataset.nombre);
}

// +0.1 a seleccionados
btnMasMedioPunto.addEventListener("click", () => {
  const seleccionados = getSeleccionados();
  if (seleccionados.length === 0) {
    setEstado("No hay estudiantes seleccionados.");
    return;
  }
  for (const n of seleccionados) {
    let nuevoValor = (estado.get(n) ?? 10) + 0.1;
    if (nuevoValor > 10) nuevoValor = 10;
    estado.set(n, Number(nuevoValor.toFixed(1)));
  }
  renderLista();
  setEstado("Se ha sumado 0.1 puntos a los estudiantes seleccionados.");
});

// +1 a seleccionados
btnSumarPuntos.addEventListener("click", () => {
 const seleccionados = getSeleccionados();
  if (seleccionados.length === 0) {
    setEstado("No hay estudiantes seleccionados.");
    return;
  }
  for (const n of seleccionados) {
    let nuevoValor = (estado.get(n) ?? 10) + 1;
    if (nuevoValor > 10) nuevoValor = 10;
    estado.set(n, Number(nuevoValor.toFixed(1)));
  }
  renderLista();
  setEstado("Se ha sumado 1 punto a los estudiantes seleccionados.");
});

// -0.1 a seleccionados
btnMenosMedioPunto.addEventListener("click", () => {
 const seleccionados = getSeleccionados();
  if (seleccionados.length === 0) {
    setEstado("No hay estudiantes seleccionados.");
    return;
  }
  for (const n of seleccionados) {
    let nuevoValor = (estado.get(n) ?? 10) - 0.1;
    if (nuevoValor < 0) nuevoValor = 0;
    estado.set(n, Number(nuevoValor.toFixed(1)));
  }
  renderLista();
  setEstado("Se ha restado 0.1 puntos a los estudiantes seleccionados.");
});

// -1 a seleccionados
btnRestarPuntos.addEventListener("click", () => {
 const seleccionados = getSeleccionados();
  if (seleccionados.length === 0) {
    setEstado("No hay estudiantes seleccionados.");
    return;
  }
  for (const n of seleccionados) {
    let nuevoValor = (estado.get(n) ?? 10) - 1;
    if (nuevoValor < 0) nuevoValor = 0;
    estado.set(n, Number(nuevoValor.toFixed(1)));
  }
  renderLista();
  setEstado("Se ha restado 1 punto a los estudiantes seleccionados.");
});

// ========================
// Carga inicial
// ========================

// Intenta cargar nombres.txt automáticamente
// Si falla, muestra consejo al usuario para cargar un archivo local
btnCargar.addEventListener("click", async () => {
  try {
    await cargarNombresDesdeTxt("nombres.txt");
  } catch (err) {
    console.error(err);
    setEstado("No se pudo cargar nombres.txt. Puedes subir un archivo local.");
  }
});

// Input file: carga archivo de nombres desde disco local
inputArchivo.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    await cargarDesdeArchivoLocal(file);
  } catch (err) {
    console.error(err);
    setEstado("No se pudo leer el archivo local.");
  } finally {
    inputArchivo.value = ""; // Limpia para permitir volver a cargar el mismo archivo
  }
});

// Bootstrap inicial: intenta cargar nombres.txt al abrir la página
cargarNombresDesdeTxt("nombres.txt").catch(() => {
  setEstado("Consejo: coloca un nombres.txt junto a esta página o usa 'Cargar archivo local'.");
});
