// galeria.js

// esperamos a que cargue la pagina
document.addEventListener("DOMContentLoaded", function() {

    let galeria = document.getElementById("gallery-grid");
    let botones = document.querySelectorAll(".filter-btn");

    // aqui guardamos todos los productos
    let todosLosProductos = [];

    // cargamos los productos del json
    fetch("../assets/json/productos.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            todosLosProductos = data;
            mostrarProductos(todosLosProductos);
        })
        .catch(function(error) {
            console.log("Error cargando productos:", error);
            galeria.innerHTML = "<p>Error al cargar la galería.</p>";
        });

    // funcion para mostrar los productos
    function mostrarProductos(productos) {

        // limpiamos la galeria antes de meter los nuevos
        galeria.innerHTML = "";

        for (let i = 0; i < productos.length; i++) {

            let producto = productos[i];

            let card = document.createElement("div");
            card.className = "product-card";

            // creamos la imagen
            let img = document.createElement("img");
            img.src = producto.imagen;
            img.alt = producto.nombre;
            card.appendChild(img);

            // nombre del producto
            let nombre = document.createElement("h3");
            nombre.innerHTML = producto.nombre;
            card.appendChild(nombre);

            // precio
            let precio = document.createElement("p");
            precio.className = "price";
            precio.innerHTML = "€" + producto.precio.toFixed(2);
            card.appendChild(precio);

            // añadimos la card a la galeria
            galeria.appendChild(card);
        }
    }

    // filtrado
    for (let j = 0; j < botones.length; j++) {

        botones[j].addEventListener("click", function(e) {

            // quitamos la clase active de todos los botones
            for (let k = 0; k < botones.length; k++) {
                botones[k].classList.remove("active");
            }

            // se la ponemos al que hemos pulsado
            e.target.classList.add("active");

            let filtro = e.target.getAttribute("data-filter");

            if (filtro == "all") {
                mostrarProductos(todosLosProductos);
            } else {
                // filtramos por categoria
                let filtrados = [];
                for (let m = 0; m < todosLosProductos.length; m++) {
                    if (todosLosProductos[m].categoria == filtro) {
                        filtrados.push(todosLosProductos[m]);
                    }
                }
                mostrarProductos(filtrados);
            }
        });
    }

});