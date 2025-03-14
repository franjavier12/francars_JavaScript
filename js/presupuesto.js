//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-CALCULO DEL PRESUPUESTO*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function calcularPresupuesto() {
    
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('#extras input[type="checkbox"]:checked');
    
    const precioBase = productoSelect.options[productoSelect.selectedIndex] ? parseInt(productoSelect.options[productoSelect.selectedIndex].dataset.price) : 0;
    
    const plazo = parseInt(plazoInput.value) || 0;
    let descuento = 0;
    let dto
    if (plazo >= 24) {
        descuento = 0.1;
        dto = "10% dto"
    }
    else if (plazo >= 12) {
        descuento = 0.05;
        dto = "5% dto"
    }

    let total = precioBase * (1 - descuento);

    extrasCheckboxes.forEach(function(checkbox) {
        total += parseInt(checkbox.dataset.price) || 0;
    });

    document.getElementById('presupuesto-final').textContent = `${total.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'})} | (${dto})`
}

function validarNombre(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    return regex.test(input.value) && input.value.length <= 15;
}

function validarApellidos(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    return regex.test(input.value) && input.value.length <= 40;
}

function validarTelefono(input) {
    const regex = /^\d{1,9}$/;
    return regex.test(input.value);
}

function validarEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value);
}



// Validación de campos
document.addEventListener('DOMContentLoaded', function() {


    // Event listeners para validación en tiempo real
    document.getElementById('nombre').addEventListener('input', function(e) {
        const resultado = validarNombre(e.target)
        document.getElementById('errorNombre').style.display = resultado ? 'none' : 'block';
        document.getElementById('nombre').style.accentColor = resultado ? '' : 'red'; 
        document.getElementById('nombre').style.borderColor =  resultado ? '' : 'red'; 
    });

    document.getElementById('apellidos').addEventListener('input', function(e) {
        const resultado = validarApellidos(e.target)
        document.getElementById('errorApellidos').style.display = resultado ? 'none' : 'block';
        document.getElementById('apellidos').style.accentColor = resultado ? '' : 'red'; 
        document.getElementById('apellidos').style.borderColor =  resultado ? '' : 'red';
    });

    document.getElementById('telefono').addEventListener('input', function(e) {
        const resultado = validarTelefono(e.target)
        console.log(resultado)
        document.getElementById('errorTelefono').style.display = resultado ? 'none' : 'block';
        document.getElementById('telefono').style.accentColor = resultado ? '' : 'red'; 
        document.getElementById('telefono').style.borderColor =  resultado ? '' : 'red'; 
    });

    document.getElementById('email').addEventListener('input', function(e) {
        const resultado = validarEmail(e.target)
        document.getElementById('errorEmail').style.display = resultado ? 'none' : 'block';
        document.getElementById('email').style.accentColor = resultado ? '' : 'red'; 
        document.getElementById('email').style.borderColor =  resultado ? '' : 'red'; 
    });



    // Event listeners para actualización automática
    document.getElementById('producto').addEventListener('change', calcularPresupuesto);
    document.getElementById('plazo').addEventListener('input', calcularPresupuesto);
    document.querySelectorAll('#extras input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    // Validación del formulario
    document.getElementById('presupuestoForm').addEventListener('submit', function(e) {
        const telefonoValue = document.getElementById("telefono").value
        console.log("tel:" + telefonoValue)
        
        if (telefonoValue.length >= 9) {
            e.preventDefault()
            alert("El teléfono debe de contener al menos 9 dígitos")
            return false
        }
        const camposValidos = [
            validarNombre(document.getElementById('nombre')),
            validarApellidos(document.getElementById('apellidos')),
            validarTelefono(document.getElementById('telefono')),
            validarEmail(document.getElementById('email')),
            document.getElementById('condiciones').checked
        ];

        if (!camposValidos.every(function(valor) { return valor; })) {
            e.preventDefault();
            alert('Por favor complete todos los campos correctamente y acepte las condiciones');
        }
    });

    
});