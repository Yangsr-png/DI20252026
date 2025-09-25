/*let contador = 10;
const spanContador = document.getElementById("contador");
const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");

function actualizarContador() {
  spanContador.textContent = parseFloat(contador).toFixed(1);

  // Efecto visual para marcar el cambio
  spanContador.classList.add("changed");
  setTimeout(() => spanContador.classList.remove("changed"), 200);
}

btnMas.addEventListener("click", () => {
  contador = contador +0.1;
  if (contador > 10) {
  contador = 10;
}

  actualizarContador();
});

btnMenos.addEventListener("click", () => {
  contador = contador -0.1;
  if (contador < 0) {
  contador = 0;
}

  actualizarContador();
});

// Inicialización
actualizarContador();

document.addEventListener*/

//LISTA DE TODAS LAS TARJETAS GUARDADA EN tarjetas
const tarjetas = document.querySelectorAll(".contador")

tarjetas.forEach((tarjeta) => {
  const spanValor = tarjeta.querySelector(".valor");
  const btnMas = tarjeta.querySelector(".btn-mas");
  const btnMenos = tarjeta.querySelector(".btn-menos");
  const btnMuerte = tarjete.querySelector(".btn-muerte")

  btnMas.addEventListener("click", ()=>{
  let valor = parseFloat(spanValor.textContent);
  valor = valor +0.1;
      if(valor>10){
      valor=10;
    }
  spanValor.textContent = valor.toFixed(1);
  });

  btnMenos.addEventListener("click", ()=>{
    let valor = parseFloat(spanValor.textContent);
    valor = valor -0.1;
        if(valor<0){
      valor=0;
    }
    spanValor.textContent = valor.toFixed(1);
  })

  btnMuerte.addEventListener("click", ())


});

