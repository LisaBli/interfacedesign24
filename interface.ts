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

    constructor() {
        this.currentPage = document.getElementById('start-page') as HTMLElement;

        document.getElementById('start-button')?.addEventListener('click', () => this.handleButtonClick('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.handleButtonClick('board-page'));
        document.getElementById('save-button')?.addEventListener('click', () => this.handleButtonClick('save'));
        document.getElementById('new-button')?.addEventListener('click', () => this.handleButtonClick('new'));

        this.initShapes();
    }

    private showPage(pageId: string) {
        this.currentPage.classList.remove('visible');
        this.currentPage.classList.add('hidden');
        this.currentPage = document.getElementById(pageId) as HTMLElement;
        this.currentPage.classList.remove('hidden');
        this.currentPage.classList.add('visible');
    }

   //Formen generieren 
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

    //Sounds Zuordnung 
    private assignSound(shape: HTMLElement) {
        const sound = prompt('Bitte wähle einen Ton (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday):');
        if (sound && this.sounds[sound]) {
            this.selectedSounds[shape.dataset.shape as string] = this.sounds[sound];
            shape.style.backgroundColor = this.getRandomColor();
            this.playFeedbackSound(); // spielt feedback sound nach Zuweisung eines Sounds
        }
    }

    //Formen 
    private showBoard() {
        const boardContainer = document.getElementById('board-container') as HTMLElement;
        boardContainer.innerHTML = ''; // board container leeren

        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true) as HTMLElement;
            boardShape.addEventListener('click', () => this.playSound(boardShape));
            boardContainer.appendChild(boardShape);
        });

        this.showPage('board-page');
    }

    //spielt Sounds ab
    private playSound(shape: HTMLElement) {
        const sound = this.selectedSounds[shape.dataset.shape as string];
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }

    //Button Sound Feedback
    private playFeedbackSound() {
        const feedbackSound = new Audio("./assets/click-button.mp3");
        feedbackSound.play();
    }

    //Fkt. Button click
    private handleButtonClick(action: string) {
        this.playFeedbackSound(); // Play feedback sound on button click

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

    //Fkt. random Farbe generieren
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
        // Fkt zum Speichern und Herunterladen des Songs 
    }

    //Neustart
    private resetApp() {
        location.reload();
    }
}

window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
