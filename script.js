document.getElementById('boton-sorteo').addEventListener('click', function() {
    const inputFile = document.getElementById('input-excel');
    const file = inputFile.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const participantes = XLSX.utils.sheet_to_json(worksheet);
            mostrarGanador(participantes);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, selecciona un archivo Excel.');
    }
});

function mostrarGanador(participantes) {
    const ganador = participantes[Math.floor(Math.random() * participantes.length)];
    const infoDiv = document.getElementById('ganador-info');
    infoDiv.textContent = `Ganador: ${ganador.Nombre} - Cargo: ${ganador.Cargo}`;
}
