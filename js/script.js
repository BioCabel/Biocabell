

function mostrarSeccion(id) {

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll(".pagina");

    secciones.forEach(function(seccion) {
        seccion.style.display = "none";
    });

    // Mostrar solamente la seleccionada
    document.getElementById(id).style.display = "block";

    // Subir al inicio
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Mostrar la sección enlazada o, por defecto, el producto.
const seccionInicialId = window.location.hash.slice(1);
const seccionInicial = document.getElementById(seccionInicialId);
mostrarSeccion(seccionInicial && seccionInicial.classList.contains("pagina") ? seccionInicialId : "c");

const diapositivasModelo = Array.from(document.querySelectorAll(".modelo-slide")).reverse();
const puntosModelo = Array.from(document.querySelectorAll(".modelo-punto"));
let indiceModelo = 0;
let temporizadorModelo;

function mostrarDiapositiva(indice) {
    indiceModelo = (indice + diapositivasModelo.length) % diapositivasModelo.length;

    diapositivasModelo.forEach(function(diapositiva, posicion) {
        const activa = posicion === indiceModelo;
        diapositiva.classList.toggle("activa", activa);
        diapositiva.setAttribute("aria-hidden", String(!activa));
        diapositiva.toggleAttribute("inert", !activa);
    });

    puntosModelo.forEach(function(punto, posicion) {
        const activo = posicion === indiceModelo;
        punto.classList.toggle("activa", activo);
        punto.setAttribute("aria-current", String(activo));
    });
}

function iniciarCarrusel() {
    window.clearInterval(temporizadorModelo);
    temporizadorModelo = window.setInterval(function() {
        mostrarDiapositiva(indiceModelo + 1);
    }, 60000);
}

if (diapositivasModelo.length > 1) {
    mostrarDiapositiva(indiceModelo);

    document.querySelectorAll("[data-carrusel]").forEach(function(boton) {
        boton.addEventListener("click", function() {
            const desplazamiento = boton.dataset.carrusel === "siguiente" ? 1 : -1;
            mostrarDiapositiva(indiceModelo + desplazamiento);
            iniciarCarrusel();
        });
    });

    puntosModelo.forEach(function(punto) {
        punto.addEventListener("click", function() {
            mostrarDiapositiva(Number(punto.dataset.indice));
            iniciarCarrusel();
        });
    });

    iniciarCarrusel();
}

const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("siteSearchPanel");
const searchForm = document.getElementById("siteSearchForm");
const searchInput = document.getElementById("siteSearchInput");
const searchStatus = document.getElementById("siteSearchStatus");
const searchResults = document.getElementById("siteSearchResults");
const searchItems = Array.from(document.querySelectorAll(
    ".pagina h1, .pagina h2, .pagina h3, .pagina h4, .pagina p, .pagina summary, .pagina li"
)).map(function(element) {
    return {
        element: element,
        page: element.closest(".pagina"),
        text: element.textContent.trim()
    };
}).filter(function(item) {
    return item.page && item.text;
});
let currentSearchResults = [];

function normalizarBusqueda(texto) {
    return texto
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[¿?¡!,.;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function cerrarBusqueda(devolverFoco) {
    searchPanel.hidden = true;
    searchToggle.setAttribute("aria-expanded", "false");
    if (devolverFoco) searchToggle.focus();
}

function buscarEnSitio() {
    const terminos = normalizarBusqueda(searchInput.value).split(" ").filter(Boolean);
    searchResults.replaceChildren();
    currentSearchResults = [];

    if (!terminos.length) {
        searchStatus.textContent = "Escribe para buscar en el contenido del sitio.";
        return;
    }

    currentSearchResults = searchItems.filter(function(item) {
        const contenido = normalizarBusqueda(item.text);
        return terminos.every(function(termino) {
            return contenido.includes(termino);
        });
    });

    if (!currentSearchResults.length) {
        searchStatus.textContent = "No encontramos resultados. Prueba con otras palabras.";
        return;
    }

    const maxResultados = 8;
    const resultadosVisibles = currentSearchResults.slice(0, maxResultados);
    searchStatus.textContent = currentSearchResults.length > maxResultados
        ? "Mostrando " + maxResultados + " de " + currentSearchResults.length + " resultados."
        : currentSearchResults.length + (currentSearchResults.length === 1 ? " resultado." : " resultados.");

    resultadosVisibles.forEach(function(item, index) {
        const resultado = document.createElement("li");
        const boton = document.createElement("button");
        const titulo = document.createElement("span");
        const contexto = document.createElement("span");

        boton.type = "button";
        boton.dataset.searchResult = String(index);
        titulo.className = "site-search-result-title";
        titulo.textContent = item.text.length > 100 ? item.text.slice(0, 97) + "..." : item.text;
        contexto.className = "site-search-result-context";
        contexto.textContent = item.page.querySelector("h1, h2")?.textContent.trim() || "BioCabel";

        boton.append(titulo, contexto);
        resultado.appendChild(boton);
        searchResults.appendChild(resultado);
    });
}

searchToggle.addEventListener("click", function() {
    const abrir = searchPanel.hidden;
    searchPanel.hidden = !abrir;
    searchToggle.setAttribute("aria-expanded", String(abrir));
    if (abrir) searchInput.focus();
});

searchInput.addEventListener("input", buscarEnSitio);

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    buscarEnSitio();
    const primerResultado = searchResults.querySelector("button");
    if (primerResultado) primerResultado.focus();
});

searchResults.addEventListener("click", function(event) {
    const boton = event.target.closest("[data-search-result]");
    if (!boton) return;

    const item = currentSearchResults[Number(boton.dataset.searchResult)];
    if (!item || !item.page.id) return;

    if (item.element.matches("summary")) {
        item.element.closest("details").open = true;
    }

    mostrarSeccion(item.page.id);
    cerrarBusqueda(false);
    window.setTimeout(function() {
        item.element.scrollIntoView({ behavior: "smooth", block: "center" });
        item.element.classList.add("site-search-highlight");
        window.setTimeout(function() {
            item.element.classList.remove("site-search-highlight");
        }, 1800);
    }, 80);
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !searchPanel.hidden) {
        cerrarBusqueda(true);
    }
});
