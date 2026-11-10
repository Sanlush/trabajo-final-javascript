// noticias.js

// Esperamos a que cargue la pagina
document.addEventListener("DOMContentLoaded", function() {

    let contenedor = document.getElementById("news-container");

    // comprobamos que existe el contenedor
    if (contenedor) {

        // usamos fetch para coger el json (AJAX)
        fetch("assets/json/noticias.json")
            .then(function(response) {
                // si hay error lanzamos excepcion
                if (!response.ok) {
                    throw new Error("Error al cargar las noticias");
                }
                return response.json();
            })
            .then(function(data) {
                // vaciamos el contenedor primero
                contenedor.innerHTML = "";

                // recorremos todas las noticias
                for (let i = 0; i < data.length; i++) {

                    let noticia = data[i];

                    let div = document.createElement("div");
                    div.className = "news-card";

                    // creamos la imagen
                    let img = document.createElement("img");
                    img.src = noticia.imagen;
                    img.alt = noticia.titulo;
                    div.appendChild(img);

                    // creamos el div del contenido
                    let contenido = document.createElement("div");
                    contenido.className = "news-card-content";

                    // titulo
                    let titulo = document.createElement("h3");
                    titulo.innerHTML = noticia.titulo;
                    contenido.appendChild(titulo);

                    // resumen
                    let parrafo = document.createElement("p");
                    parrafo.innerHTML = noticia.resumen;
                    contenido.appendChild(parrafo);

                    div.appendChild(contenido);

                    // lo metemos en el contenedor
                    contenedor.appendChild(div);
                }
            })
            .catch(function(error) {
                console.log("Error:", error);
                contenedor.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
            });

    }

});