// ===============================
// BIOCABEL LANDING PAGE
// script.js
// ===============================

// Navbar cambia al hacer scroll
window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 80) {

        navbar.classList.add("shadow-lg");
        navbar.style.padding = "10px 0";
        navbar.style.background = "#ffffff";

    } else {

        navbar.classList.remove("shadow-lg");
        navbar.style.padding = "18px 0";
        navbar.style.background = "#F7F2E8";

    }

});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// Animación de aparición
const elementos = document.querySelectorAll(".problem-card, .benefit-card");

const mostrar = new IntersectionObserver((entradas)=>{

    entradas.forEach((entrada)=>{

        if(entrada.isIntersecting){

            entrada.target.classList.add("visible");

        }

    });

});

elementos.forEach((el)=>{

    el.classList.add("oculto");

    mostrar.observe(el);

});

// Botón flotante WhatsApp
const whatsapp = document.createElement("a");

whatsapp.href="https://wa.me/573104816156";

whatsapp.target="_blank";

whatsapp.className="whatsapp";

whatsapp.innerHTML='<i class="bi bi-whatsapp"></i>';

document.body.appendChild(whatsapp);

// Contador simple (si luego agregas estadísticas)
function contador(id, max){

    let numero=0;

    const intervalo=setInterval(()=>{

        numero++;

        document.getElementById(id).innerHTML=numero;

        if(numero>=max){

            clearInterval(intervalo);

        }

    },20);

}

// Validación básica del formulario
const formulario=document.querySelector("form");

if(formulario){

formulario.addEventListener("submit",function(e){

e.preventDefault();

alert("✅ Gracias por escribirnos. Muy pronto un asesor de BioCabel se comunicará contigo.");

formulario.reset();

});

}

// Animación del Hero
const producto=document.querySelector(".hero-product");

if(producto){

window.addEventListener("mousemove",(e)=>{

let x=(window.innerWidth/2-e.pageX)/70;

let y=(window.innerHeight/2-e.pageY)/70;

producto.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`;

});

}

// Botón volver arriba
const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="btn btn-success";

topButton.style.position="fixed";
topButton.style.right="25px";
topButton.style.bottom="100px";
topButton.style.borderRadius="50%";
topButton.style.display="none";
topButton.style.zIndex="999";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// Fade Hero
window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

let valor=1-window.scrollY/700;

hero.style.opacity=valor;

});

// Mensaje en consola
console.log("BioCabel Landing cargada correctamente 🌿");

// =========================================
// SECCIONES INDEPENDIENTES
// =========================================

function mostrarSeccion(id) {

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll(".pagina");

    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });

    // Mostrar la sección seleccionada
    const seccionSeleccionada = document.getElementById(id);

    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add("activa");

        // Volver arriba
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

// Mostrar Inicio al cargar la página
document.addEventListener("DOMContentLoaded", () => {

    const primeraSeccion = document.querySelector(".pagina");

    if (primeraSeccion) {
        primeraSeccion.classList.add("activa");
    }

});

