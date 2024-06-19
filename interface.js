class SoundCanvasApp {
    shapes = [];
    sounds = {
        "Monday": "./assets/monday.mp3",
        "Tuesday": "./assets/tuesday.mp3",
        "Wednesday": "./assets/wednesday.mp3",
        "Thursday": "./assets/thursday.mp3",
        "Friday": "./assets/friday.mp3",
        "Saturday": "./assets/saturday.mp3",
        "Sunday": "./assets/sunday.mp3"
    };
    selectedSounds = {};
    currentPage;
    constructor() {
        this.currentPage = document.getElementById('start-page');
        document.getElementById('start-button')?.addEventListener('click', () => this.handleButtonClick('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.handleButtonClick('board-page'));
        document.getElementById('save-button')?.addEventListener('click', () => this.handleButtonClick('save'));
        document.getElementById('new-button')?.addEventListener('click', () => this.handleButtonClick('new'));
        this.initShapes();
    }
    showPage(pageId) {
        this.currentPage.classList.remove('visible');
        this.currentPage.classList.add('hidden');
        this.currentPage = document.getElementById(pageId);
        this.currentPage.classList.remove('hidden');
        this.currentPage.classList.add('visible');
    }
    //Formen generieren 
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
    //Sounds Zuordnung 
    assignSound(shape) {
        const sound = prompt('Bitte wähle einen Ton (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday):');
        if (sound && this.sounds[sound]) {
            this.selectedSounds[shape.dataset.shape] = this.sounds[sound];
            shape.style.backgroundColor = this.getRandomColor();
            this.playFeedbackSound(); // spielt feedback sound nach Zuweisung eines Sounds
        }
    }
    //Formen 
    showBoard() {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = ''; // board container leeren
        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true);
            boardShape.addEventListener('click', () => this.playSound(boardShape));
            boardContainer.appendChild(boardShape);
        });
        this.showPage('board-page');
    }
    //spielt Sounds ab
    playSound(shape) {
        const sound = this.selectedSounds[shape.dataset.shape];
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }
    //Button Sound Feedback
    playFeedbackSound() {
        const feedbackSound = new Audio("./assets/click-button.mp3");
        feedbackSound.play();
    }
    //Fkt. Button click
    handleButtonClick(action) {
        this.playFeedbackSound(); // Play feedback sound on button click
        if (action === 'shape-page') {
            this.showPage('shape-page');
        }
        else if (action === 'board-page') {
            this.showBoard();
        }
        else if (action === 'save') {
            this.saveSong();
        }
        else if (action === 'new') {
            this.resetApp();
        }
    }
    //Fkt. random Farbe generieren
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
        // Fkt zum Speichern und Herunterladen des Songs 
    }
    //Neustart
    resetApp() {
        location.reload();
    }
}
window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
//# sourceMappingURL=interface.js.map