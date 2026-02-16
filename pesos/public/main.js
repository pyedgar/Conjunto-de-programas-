// la funcion principal del main es:

//  1. Obtiene los valores del formulario 
//  2. Valida que los campos tengan información
//  3. La funcion fetch hace las peticiones al servidor
//  4. /convertir-pesos es la ruta a donde se estan enviando la petición
//  5. method: 'POST' → Vamos a enviar datos
//  6. headers → Estamos enviando JSON
//  7. body → Aquí van los datos convertidos a texto JSON

document.getElementById('btnConvertir').addEventListener('click', () => {

    const pesosMXN = document.getElementById('pesosMXN').value;

    if (!pesosMXN) {
        alert('Por favor ingresa la cantidad en pesos');
        return;
    }

    fetch('/convertir-pesos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pesos: pesosMXN
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('dolaresUSD').value = data.dolares.toFixed(2);
        document.getElementById('mensajeConversion').value = data.mensaje;
    })
    .catch(err => console.error(err));

});

// Boton para limpiar las cajas del formulario
document.getElementById('btnLimpiar').addEventListener('click', () => {
    document.getElementById('pesosMXN').value = '';
    document.getElementById('dolaresUSD').value = '';
    document.getElementById('mensajeConversion').value = '';
});