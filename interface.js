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
    selectedShape = null;
    constructor() {
        this.currentPage = document.getElementById('start-page');
        document.getElementById('start-button')?.addEventListener('click', () => this.handleButtonClick('shape-page'));
        document.getElementById('next-to-board-button')?.addEventListener('click', () => this.handleButtonClick('board-page'));
        document.getElementById('save-button')?.addEventListener('click', () => this.handleButtonClick('save'));
        document.getElementById('new-button')?.addEventListener('click', () => this.handleButtonClick('new'));
        const soundButtons = document.querySelectorAll('.sound-button');
        soundButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sound = button.dataset.sound;
                if (this.selectedShape && sound) {
                    this.assignSound(this.selectedShape, sound);
                }
            });
        });
        this.initShapes();
    }
    //zeigt jew. Seite
    showPage(pageId) {
        this.currentPage.classList.remove('visible');
        this.currentPage.classList.add('hidden');
        this.currentPage = document.getElementById(pageId);
        this.currentPage.classList.remove('hidden');
        this.currentPage.classList.add('visible');
    }
    //erzeugt Formen
    initShapes() {
        const shapeContainer = document.getElementById('shape-container');
        const shapeClasses = [
            'circle', 'square', 'triangle', 'half-circle', 'trapezoid',
            'quarter-circle', 'long-rectangle', 'pentagon'
        ];
        shapeClasses.forEach(shapeClass => {
            const shape = document.createElement('div');
            shape.classList.add('shape', shapeClass);
            shape.dataset.shape = shapeClass;
            shape.addEventListener('click', () => this.selectShape(shape));
            shapeContainer.appendChild(shape);
            this.shapes.push(shape);
        });
    }
    selectShape(shape) {
        this.selectedShape = shape;
    }
    //Sound zuordnen zu Formen
    assignSound(shape, sound) {
        this.selectedSounds[shape.dataset.shape] = this.sounds[sound];
        shape.style.backgroundColor = this.getRandomColor();
        shape.classList.add('assigned');
        this.playFeedbackSound(); // Feedback-Sound abspielen
    }
    //zeigt Soundboard
    showBoard() {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = ''; // Board Container leeren
        this.shapes.forEach(shape => {
            const boardShape = shape.cloneNode(true);
            if (this.selectedSounds[shape.dataset.shape]) {
                boardShape.addEventListener('click', () => this.playSound(boardShape));
                boardShape.classList.add('assigned');
            }
            boardContainer.appendChild(boardShape);
        });
        this.showPage('board-page');
    }
    //spielt Sound 
    playSound(shape) {
        const sound = this.selectedSounds[shape.dataset.shape];
        if (sound) {
            const audio = new Audio(sound);
            audio.play();
        }
    }
    //Sound für Buttonclicks 
    playFeedbackSound() {
        const feedbackSound = new Audio("./assets/click-button.mp3");
        feedbackSound.play();
    }
    //Fkt. für Button clicks 
    handleButtonClick(action) {
        this.playFeedbackSound(); // Feedback-Sound bei Klick abspielen
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
    //generiert random Farbe 
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    //speichern des songs
    saveSong() {
        alert('Song gespeichert!');
        //funktion speichern hat die Anwendung blockiert, deswegen in diesem Prototyp nur ein alert
    }
    //resetet die Anwendung
    resetApp() {
        location.reload();
    }
}
window.addEventListener('DOMContentLoaded', () => new SoundCanvasApp());
//# sourceMappingURL=interface.js.map