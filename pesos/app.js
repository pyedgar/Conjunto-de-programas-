const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/convertir-pesos', (req, res) => {

    const { pesosMXN } = req.body;

    const pesos = parseFloat(pesosMXN);
    const tipoCambio = 17.16; 

    if (isNaN(pesos)) {
        return res.status(400).json({ error: "Cantidad en pesos inválida" });
    }

    const dolares = pesos / tipoCambio;
    
    let mensaje = "";
    if (dolares >= 1000) {
        mensaje = "Cantidad considerable: Más de $1000 USD";
    } else if (dolares >= 100) {
        mensaje = "Conversión moderada: Entre $100 y $999.99 USD";
    } else if (dolares > 0) {
        mensaje = "Conversión baja: Menos de $100 USD";
    } else {
        mensaje = "Cantidad en cero o negativa";
    }

    res.json({
        pesosOriginal: pesos,
        dolares: dolares,
        mensaje: mensaje,
        tipoCambioUsado: tipoCambio
    });

});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});