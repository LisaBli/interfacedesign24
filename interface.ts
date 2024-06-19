class SoundCanvasApp {
    private shapes: HTMLElement[] = [];
    private sounds: { [key: string]: string } = {
        "Monday": "./assets/monday.mp3",
        "Tuesday": "./assets/tuesday.mp3",
        "Wednesday": "./assets/wednesday.mp3",
        "Thursday": "./assets/thursday.mp3",
        "Friday": "./assets/friday.mp3",
        "Saturday": "./assets/saturday.mp3",
        "Sunday": "./assets/sunday.mp3"
    };
    private selectedSounds: { [key: string]: string } = {};
    private currentPage: HTMLElement;
    private selectedShape: HTMLElement | null = null;

    constructor() {
        this.currentPage = document.getElementById('start-page') as HTMLElement;

        document.getElementById('start-button')?.addEventListener('click', () => this.handleButtonClick('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.handleButtonClick('board-page'));
        document.getElementById('save-button')?.addEventListener('click', () => this.handleButtonClick('save'));
        document.getElementById('new-button')?.addEventListener('click', () => this.handleButtonClick('new'));

        const soundButtons = document.querySelectorAll('.sound-button');
        soundButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sound = (button as HTMLElement).dataset.sound;
                if (this.selectedShape && sound) {
                    this.assignSound(this.selectedShape, sound);
                }
            });
        });

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
            'rectangle', 'quarter-circle', 'long-rectangle'
        ];

        shapeClasses.forEach(shapeClass => {
            const shape = document.createElement('div');
            shape.classList.add('shape', shapeClass);
            shape.dataset.shape = shapeClass; // Store the shape type
            shape.addEventListener('click', () => this.selectShape(shape));
            shapeContainer.appendChild(shape);
            this.shapes.push(shape);
        });
    }

    private selectShape(shape: HTMLElement) {
        this.selectedShape = shape;
    }

    private assignSound(shape: HTMLElement, sound: string) {
        this.selectedSounds[shape.dataset.shape as string] = this.sounds[sound];
        shape.style.backgroundColor = this.getRandomColor();
        shape.classList.add('assigned');
        this.playFeedbackSound(); // Feedback-Sound abspielen
    }

    private showBoard() {
        const boardContainer = document.getElementById('board-container') as HTMLElement;
        boardContainer.innerHTML = ''; // Board Container leeren

        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true) as HTMLElement;
            if (this.selectedSounds[shape.dataset.shape as string]) {
                boardShape.addEventListener('click', () => this.playSound(boardShape));
                boardShape.classList.add('assigned');
            }
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

    private playFeedbackSound() {
        const feedbackSound = new Audio("./assets/click-button.mp3");
        feedbackSound.play();
    }

    private handleButtonClick(action: string) {
        this.playFeedbackSound(); // Feedback-Sound bei Klick abspielen

        if (action === 'shape-page') {
            this.showPage('shape-page');
        } else if (action === 'board-page') {
            this.showBoard();
        } else if (action === 'save') {
            this.saveSong();
        } else if (action === 'new') {
            this.resetApp();
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
        // Hier implementiere die Funktion zum Speichern und Herunterladen des Songs
    }

    private resetApp() {
        location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
