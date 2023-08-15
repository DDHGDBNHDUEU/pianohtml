const teclas = document.querySelectorAll('.tecla, .teclita');
const botonesNotas = document.querySelectorAll('.nota'); 
const botonInicio = document.querySelector('.boton-inicio');

teclas.forEach(boton => {
    boton.addEventListener('click', () => {
        const contenidoBoton = boton.textContent;
        console.log(`se toco la tecla ${contenidoBoton}`);
        const synth = new Tone.Synth().toDestination();
        const note = boton.getAttribute('data-note');
        synth.triggerAttackRelease(note, '8n');
    });
});

botonInicio.addEventListener('click', () => {
    botonInicio.disabled = true;

    function ReproducirNota(notaButton, delay) {
        return new Promise(resolve => {
            const note = notaButton.getAttribute('data-note');
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(note, '8n');
            setTimeout(() => {
                resolve();
            }, delay);
        });
    }

    const TiempoEntreNotas = 500;
    async function ReproducirNotas() {
        for (const botonNota of botonesNotas) {
            await ReproducirNota (botonNota,TiempoEntreNotas);
        }
        botonInicio.disabled = false;
    }

    ReproducirNotas();
});