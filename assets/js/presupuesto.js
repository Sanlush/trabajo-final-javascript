// script.js
let form = document.getElementById("form-presupuesto");
let total = document.getElementById("total-price");
let producto = document.getElementById("producto");
let plazo = document.getElementById("plazo");
let extras = document.querySelectorAll(".extra");

// funcion para calcular el precio
function calcularPrecio() {
    let precio = parseFloat(producto.value);
    let meses = parseInt(plazo.value);
    let descuento = 0;

    if (meses > 6) {
        descuento = 0.2;
    } else if (meses > 3) {
        descuento = 0.1;
    }

    let precioFinal = precio - (precio * descuento);

    // sumar los extras
    let totalExtras = 0;
    for (var i = 0; i < extras.length; i++) {
        if (extras[i].checked) {
            totalExtras = totalExtras + parseFloat(extras[i].value);
        }
    }

    let resultado = precioFinal + totalExtras;
    total.innerHTML = "€" + resultado.toFixed(2);
}

producto.addEventListener("change", calcularPrecio);
plazo.addEventListener("change", calcularPrecio);

// aqui pongo los extras
extras.forEach(function(checkbox) {
    checkbox.addEventListener("change", calcularPrecio);
});

// validaciones
let nombre = document.getElementById("nombre");
let apellidos = document.getElementById("apellidos");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");

function validarNombre() {
    let error = document.getElementById("err-nombre");
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,15}$/;
    if (!regex.test(nombre.value)) {
        nombre.classList.add("touched");
        error.style.display = "block";
        return false;
    } else {
        nombre.classList.remove("touched");
        error.style.display = "none";
        return true;
    }
}

function validarApellidos() {
    let error = document.getElementById("err-apellidos");
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,40}$/;
    if (!regex.test(apellidos.value)) {
        apellidos.classList.add("touched");
        error.style.display = "block";
        return false;
    } else {
        apellidos.classList.remove("touched");
        error.style.display = "none";
        return true;
    }
}

function validarTelefono() {
    let error = document.getElementById("err-telefono");
    let regex = /^\d{9}$/;
    if (!regex.test(telefono.value)) {
        telefono.classList.add("touched");
        error.style.display = "block";
        return false;
    } else {
        telefono.classList.remove("touched");
        error.style.display = "none";
        return true;
    }
}

function validarEmail() {
    let error = document.getElementById("err-email");
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        email.classList.add("touched");
        error.style.display = "block";
        return false;
    } else {
        email.classList.remove("touched");
        error.style.display = "none";
        return true;
    }
}

nombre.addEventListener("blur", validarNombre);
apellidos.addEventListener("blur", validarApellidos);
telefono.addEventListener("blur", validarTelefono);
email.addEventListener("blur", validarEmail);

// submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let v1 = validarNombre();
    let v2 = validarApellidos();
    let v3 = validarTelefono();
    let v4 = validarEmail();

    var terminos = document.getElementById("terminos");

    if (v1 == true && v2 == true && v3 == true && v4 == true && terminos.checked) {
        alert("¡Pedido enviado con éxito! Nos pondremos en contacto contigo.");
        form.reset();
        calcularPrecio();
    } else {
        if (!terminos.checked) {
            alert("Debes aceptar las condiciones.");
        } else {
            alert("Por favor, revisa los errores en el formulario.");
        }
    }
});

calcularPrecio();