function myFunction(presionado) {

  let estilos = document.getElementsByClassName("anadir");

for(let i=0; i<estilos.length; i++){
    estilos[i].classList.remove("w3-red");
  }
  
  presionado.classList.add("w3-red");
}