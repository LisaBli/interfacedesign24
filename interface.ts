class SoundCanvasApp {
    private shapes: HTMLElement[] = [];
    private sounds: { [key: string]: string } = {
        "A": "/mnt/data/A.mp3",
        "C": "/mnt/data/C.mp3",
        "Kick": "/mnt/data/kick.mp3",
        "Laugh 1": "/mnt/data/laugh-1.mp3",
        "Laugh 2": "/mnt/data/laugh-2.mp3"
    };
    private selectedSounds: { [key: string]: string } = {};
    private currentPage: HTMLElement;

    constructor() {
        this.currentPage = document.getElementById('start-page') as HTMLElement;

        document.getElementById('start-button')?.addEventListener('click', () => this.showPage('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.showBoard());
        document.getElementById('save-button')?.addEventListener('click', () => this.saveSong());
        document.getElementById('new-button')?.addEventListener('click', () => this.resetApp());

        this.initShapes();
    }

    private showPage(pageId: string) {
        this.currentPage.classList.remove('visible');
        this.currentPage.classList.add('hidden');
        this.currentPage = document.getElementById(pageId) as HTMLElement;
        this.currentPage.classList.remove('hidden');
        this.currentPage.classList.add('visible');
    }

    private initShapes() {
        const shapeContainer = document.getElementById('shape-container') as HTMLElement;

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

    private assignSound(shape: HTMLElement) {
        const sound = prompt('Bitte wähle einen Ton (A, C, Kick, Laugh 1, Laugh 2):');
        if (sound && this.sounds[sound]) {
            this.selectedSounds[shape.dataset.shape as string] = this.sounds[sound];
            shape.style.backgroundColor = this.getRandomColor();
        }
    }

    private showBoard() {
        const boardContainer = document.getElementById('board-container') as HTMLElement;
        boardContainer.innerHTML = ''; // Clear the board container

        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true) as HTMLElement;
            boardShape.addEventListener('click', () => this.playSound(boardShape));
            boardContainer.appendChild(boardShape);
        });

        this.showPage('board-page');
    }

    private playSound(shape: HTMLElement) {
        const sound = this.selectedSounds[shape.dataset.shape as string];
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }

    private getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private saveSong() {
        alert('Song gespeichert!');
        // Hier kannst du die Logik zum Speichern und Herunterladen des Songs hinzufügen
    }

    private resetApp() {
        location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
