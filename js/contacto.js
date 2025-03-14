//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-CONTACTO*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

document.getElementById("calcularRutaButton").addEventListener("click", function () {
    let origen = document.getElementById("direccionUsuario").value.trim();
    let destino = "PLAZA ESPAÑA 4, ZARAGOZA";

    if (origen) {
        let url = `https://www.google.com/maps/dir/${encodeURIComponent(origen)}/${encodeURIComponent(destino)}`;
        window.open(url, "_blank");
    }
    else {
        alert("Por favor, ingresa una dirección de origen.");
    }
});
