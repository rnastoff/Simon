import greenSound from './audio/simonSound1.mp3';
import redSound from './audio/simonSound2.mp3';
import yellowSound from './audio/simonSound3.mp3';
import blueSound from './audio/simonSound4.mp3';

export class Simon {
  constructor() {
    this.playing = false;
    this.playerTurn = false;
    this.strict = false;
    this.counter = 0;
    this.computerSequence = [];
    this.playerSequence = [];

    this.greenSound = new Audio(greenSound);
    this.redSound = new Audio(redSound);
    this.yellowSound = new Audio(yellowSound);
    this.blueSound = new Audio(blueSound);

    this.playButtons = document.querySelectorAll('.simon__play-button');

    this.playButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        this.handlePlayButtons(e.target.dataset.button);
      });
    });

    document.querySelectorAll('.simon__center__button').forEach(button => {
      button.addEventListener("click", (e) => {        
        this.handleCenterButtons(e.target.dataset.button);
      });
    });

  }

  /*---------------- BUTTON METHODS ---------------- */

  handleCenterButtons(button) {
    if (button = "start") this.handleStart();
    if (button = "strict") this.handleStrict();
    if (button = "reset") this.handleReset();
  }

  handleStart() {    
    if (this.playing == false) {
      this.setPlaying(true);
      let randomNumber = this.getRandomNumber();
      this.addNumberToSequence(randomNumber, this.computerSequence);
      this.playSequence(this.computerSequence);
      this.setPlayerTurn(true); //may need some trickery to bypass asynchronous playSequence();
    }
  }

  handleStrict() {
    //setStrict();
  }

  handleReset() {
    //setPlaying(false);
    //setPlayButtonsOn(true);
    //setStrict(optional bool?);
    //resetCounter();
    //resetSequence(computerSequence);
    //resetSequence(playerSequence);
  }

  handlePlayButtons(button) {
    
  }

  /*---------------- HELPER METHODS ---------------- */

  getRandomNumber() {
    return Math.round(Math.random() * 3);
  }

  playSequence(sequence) {
    sequence.forEach(num => {
      this.playNumber(num);        //Get rid of forEach, use setInterval and variable to work through array
    });
  }

  playNumber(num) {
    let colorSounds = [this.greenSound, this.redSound, this.yellowSound, this.blueSound];
    colorSounds[num].play();
    this.flashButtonLight(num);
  } 

  flashButtonLight(num) {
    let element = this.playButtons[num];
    let color = this.playButtons[num].dataset.color;
    let selector = "simon__play-button--" + color + "--lit"
    
    element.classList.toggle(selector);
    setTimeout(() => { element.classList.toggle(selector); }, 500);
  }

 
  /*---------------- STATE CHANGING METHODS ---------------- */
  setPlaying(bool) {
    this.playing = bool;
  }

  addNumberToSequence(num, sequence) {
    sequence.push(num);
  }

  setPlayerTurn(bool) {
    this.playerTurn = bool;
  }
}