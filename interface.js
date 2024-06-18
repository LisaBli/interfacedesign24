class SoundCanvasApp {
    shapes = [];
    sounds = {
        "A": "/mnt/data/A.mp3",
        "C": "/mnt/data/C.mp3",
        "Kick": "/mnt/data/kick.mp3",
        "Laugh 1": "/mnt/data/laugh-1.mp3",
        "Laugh 2": "/mnt/data/laugh-2.mp3"
    };
    selectedSounds = {};
    currentPage;
    constructor() {
        this.currentPage = document.getElementById('start-page');
        document.getElementById('start-button')?.addEventListener('click', () => this.showPage('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.showBoard());
        document.getElementById('save-button')?.addEventListener('click', () => this.saveSong());
        document.getElementById('new-button')?.addEventListener('click', () => this.resetApp());
        this.initShapes();
    }
    showPage(pageId) {
        this.currentPage.classList.remove('visible');
        this.currentPage.classList.add('hidden');
        this.currentPage = document.getElementById(pageId);
        this.currentPage.classList.remove('hidden');
        this.currentPage.classList.add('visible');
    }
    initShapes() {
        const shapeContainer = document.getElementById('shape-container');
        const shapeClasses = [
            'circle', 'square', 'triangle', 'half-circle', 'trapezoid',
            'parallelogram', 'rectangle', 'quarter-circle', 'long-rectangle'
        ];
        shapeClasses.forEach(shapeClass => {
            const shape = document.createElement('div');
            shape.classList.add('shape', shapeClass);
            shape.dataset.shape = shapeClass; // Add this line to store the shape type
            shape.addEventListener('click', () => this.assignSound(shape));
            shapeContainer.appendChild(shape);
            this.shapes.push(shape);
        });
    }
    assignSound(shape) {
        const sound = prompt('Bitte wähle einen Ton (A, C, Kick, Laugh 1, Laugh 2):');
        if (sound && this.sounds[sound]) {
            this.selectedSounds[shape.dataset.shape] = this.sounds[sound];
            shape.style.backgroundColor = this.getRandomColor();
        }
    }
    showBoard() {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = ''; // Clear the board container
        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true);
            boardShape.addEventListener('click', () => this.playSound(boardShape));
            boardContainer.appendChild(boardShape);
        });
        this.showPage('board-page');
    }
    playSound(shape) {
        const sound = this.selectedSounds[shape.dataset.shape];
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    saveSong() {
        alert('Song gespeichert!');
        // Hier kannst du die Logik zum Speichern und Herunterladen des Songs hinzufügen
    }
    resetApp() {
        location.reload();
    }
}
window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
//# sourceMappingURL=interface.js.map