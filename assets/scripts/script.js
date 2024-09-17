// Index.html

let slideIndex = 1;
mostrarDiv(slideIndex);

function otroDiv(n) {
  mostrarDiv(slideIndex += n);
}

function actualDiv(n) {
  mostrarDiv(slideIndex = n);
}

function mostrarDiv(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > x.length) {
    slideIndex = 1;
  }
  if(n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";    
  }
  for(i=0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}