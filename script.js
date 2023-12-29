// script.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    let lastPlayed = []; // Armazena as últimas notas tocadas e os intervalos de tempo
    let lastNoteTime = performance.now(); // Registra o tempo da última nota tocada

    // Criação da grade
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.note = notes[i];
            cell.addEventListener('click', () => {
                playAndRecord(notes[i]);
                highlightCell(cell);
            });
            grid.appendChild(cell);
        }
    }

    // Event listener para teclas
    document.addEventListener('keydown', (event) => {
        let note;
        switch (event.key) {
            case 'ArrowLeft':
                note = 'C4';
                break;
            case 'ArrowRight':
                note = 'D4';
                break;
            case 'ArrowUp':
                note = 'E4';
                break;
            case 'ArrowDown':
                note = 'F4';
                break;
            case ' ':
                note = 'G4'; // Espaço para Sol
                break;
            case 'Enter':
                note = 'A4'; // Enter para Lá
                break;
            case 'w':
            case 'W':
                note = 'B4'; // W para Si
                break;
            case 'a':
            case 'A':
                replayLastPlayed();
                return;
        }
        if (note) {
            playAndRecord(note);
            highlightCells(note);
        }
    });

    function playAndRecord(note) {
        const now = performance.now();
        const interval = now - lastNoteTime;
        lastNoteTime = now;
        playNote(note);
        lastPlayed.push({ note, interval });
        if (lastPlayed.length > 7) {
            lastPlayed.shift();
        }
    }

    function replayLastPlayed() {
        let cumulativeDelay = 0;
        lastPlayed.forEach(entry => {
            setTimeout(() => playNote(entry.note), cumulativeDelay);
            cumulativeDelay += entry.interval;
        });
    }
});

function playNote(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, '8n');
}

function highlightCells(note) {
    document.querySelectorAll(`[data-note="${note}"]`).forEach(cell => {
        const color = getRandomColor();
        cell.style.borderColor = color;
        cell.style.backgroundColor = color;
    });
}

function highlightCell(cell) {
    const color = getRandomColor();
    cell.style.borderColor = color;
    cell.style.backgroundColor = color;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
