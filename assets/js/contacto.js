// mapa.js

// esperamos a que cargue la pagina
document.addEventListener("DOMContentLoaded", function() {

    // coordenadas de la tienda (Madrid)
    let latTienda = 40.4167;
    let lngTienda = -3.7037;

    // creamos el mapa
    let mapa = L.map("map").setView([latTienda, lngTienda], 13);

    // ponemos el estilo oscuro
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapa);

    // marcador de la tienda
    let marcador = L.marker([latTienda, lngTienda]);
    marcador.addTo(mapa);
    marcador.bindPopup("<b>Era Carmesí - Showroom</b><br>Tu tienda favorita.");
    marcador.openPopup();

    // boton de la ruta
    let btnRuta = document.getElementById("btn-ruta");

    btnRuta.addEventListener("click", function() {

        // comprobamos si el navegador soporta geolocalizacion
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización. ¡Búscanos en Google Maps!");
            return;
        }

        btnRuta.textContent = "Calculando...";
        btnRuta.disabled = true;

        // pedimos la posicion del usuario
        navigator.geolocation.getCurrentPosition(

            // si todo va bien
            function(position) {

                let latUsuario = position.coords.latitude;
                let lngUsuario = position.coords.longitude;

                // creamos la ruta
                L.Routing.control({
                    waypoints: [
                        L.latLng(latUsuario, lngUsuario),
                        L.latLng(latTienda, lngTienda)
                    ],
                    lineOptions: {
                        styles: [{ color: "#ffffff", weight: 5 }]
                    },
                    createMarker: function() {
                        return null;
                    }
                }).addTo(mapa);

                btnRuta.textContent = "¡Ruta trazada!";

                // despues de 3 segundos volvemos a poner el texto
                setTimeout(function() {
                    btnRuta.textContent = "¿Cómo llegar?";
                    btnRuta.disabled = false;
                }, 3000);
            },

            // si hay error
            function(error) {
                console.log("Error de geolocalización:", error);
                alert("No pudimos obtener tu ubicación. Asegúrate de dar permisos de GPS.");
                btnRuta.textContent = "¿Cómo llegar?";
                btnRuta.disabled = false;
            }
        );
    });
});