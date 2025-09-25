let contador = 10.0;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");
const btnUnoMas= document.getElementById("btn-uno-mas");
const btnUnoMenos= document.getElementById("btn-uno-menos");
const btnMuerte = document.getElementById("btn-muerte");
const btnReset = document.getElementById("btn-reset");

function actualizarContador() {
  
//pprimero limitamos el contador 
  if (contador>=10){
    contador=10;
  }

  if (contador<=0){
    contador=0;
  }
  //despues lo mostramos
  //.toFixed redondera los decimales.
  spanContador.textContent = contador.toFixed(1);

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

//BOTONES CLICK
//subir 0.1
btnMas.addEventListener("click", () => {
  contador += 0.1;
  actualizarContador();
});
//bajar 0.1
btnMenos.addEventListener("click", () => {
  contador-=0.1;
  actualizarContador();
});
//subir 1
btnUnoMas.addEventListener("click", () =>{
  contador+=1;
  actualizarContador();
});
//bajar 1
btnUnoMenos.addEventListener("click", () => {
  contador-=1;
  actualizarContador();
});
//boton muerte
btnMuerte.addEventListener("click", () =>{
  contador=0;
   actualizarContador();
});

btnReset.addEventListener("click", () =>{
  contador=10;
  actualizarContador();
});

//TECLADO
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    contador += 0.1;
  actualizarContador();
  } else if (event.key === 'ArrowDown') {
      contador-=0.1;
  actualizarContador();
  }else if (event.key === 'ArrowLeft'){
    contador-=1;
    actualizarContador();
  }else if (event.key === 'ArrowRight'){
    contador+=1;
    actualizarContador();
  }
  
});

// Inicialización
actualizarContador();
