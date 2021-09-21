import greenSound from './audio/simonSound1.mp3';
import redSound from './audio/simonSound2.mp3';
import yellowSound from './audio/simonSound3.mp3';
import blueSound from './audio/simonSound4.mp3';

export class Simon {
  constructor() {
    this.playing = false;           //for disabling start button
    this.playerTurn = false;        //for disabling play buttons
    this.strict = false;
    this.counter = 0;
    this.computerSequence = [];
    this.playerSequence = [];
    this.winningNumber = 10;

    this.screenCounter = document.querySelector('.simon__center__counter-screen');

    this.greenSound = new Audio(greenSound);
    this.redSound = new Audio(redSound);
    this.yellowSound = new Audio(yellowSound);
    this.blueSound = new Audio(blueSound);
    this.colorSounds = [this.greenSound, this.redSound, this.yellowSound, this.blueSound];

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
    if (button == "start") this.handleStart();
    if (button == "strict") this.setStrict();
    if (button == "reset") this.handleReset();
  }

  handleStart() {    
    if (this.playing == false) {
      this.setPlaying(true);
      this.incrementCounter();
      this.handleComputerTurn();
    }
  }

  handleReset() {
    this.setPlaying(false);
    this.setPlayerTurn(false);
    if (this.strict) this.setStrict(false);
    this.resetCounter();
    this.resetSequence(this.computerSequence);
    this.resetSequence(this.playerSequence);
  }

  handlePlayButtons(button) {
    if (this.playerTurn) {
      this.playNumber(button);
      this.addNumberToSequence(button, this.playerSequence);
      this.compareSequences();     
    }
  }


  /*---------------- PLAYING METHODS ---------------- */

  getRandomNumber() {
    return Math.round(Math.random() * 3);
  }

  playSequence(sequence) {
    let i = 0;                                            
    let interval = setInterval(() => {    
      this.playNumber(sequence[i]);
      i++;
      if (i >= sequence.length) clearInterval(interval);
    }, 750);                                                //Time Gap between numbers in sequence playing
  }

  playNumber(num) {
    this.colorSounds[num].play();
    this.flashButtonLight(num);  
  }

  flashButtonLight(num) {
    let element = this.playButtons[num];
    let color = this.playButtons[num].dataset.color;
    let selector = "simon__play-button--" + color + "--lit"
    
    element.classList.toggle(selector);
    setTimeout(() => { element.classList.toggle(selector); }, 500);   //Time gap between turning off button light
  }

  handleComputerTurn() {
    this.setPlayerTurn(false);
    this.addNumberToSequence(this.getRandomNumber(), this.computerSequence);
    this.playSequence(this.computerSequence);
    this.setPlayerTurn(true); //Error Here
  }

  compareSequences() {
    this.playerSequence.forEach((buttonNumber, index) => {
      if (buttonNumber != this.computerSequence[index]) {
        this.flashCounterMessage("!!!", 4);
        this.playWrongAnswer();
        this.resetSequence(this.playerSequence);
        if (this.strict) setTimeout(() => { this.handleReset(); }, 2000);                                                                
        return;
      }
    });

    if (this.playerSequence.length == this.computerSequence.length) {
      if (this.computerSequence.length == this.winningNumber) {
        this.setPlayerTurn(false);
        this.playWinSequence();
      }
      else {                                      //Player has the correct sequence, now computer's turn
        this.resetSequence(this.playerSequence);
        this.incrementCounter();
        setTimeout(() => { this.handleComputerTurn(); }, 1000);  //Gap between playerTurn and ComputerTurn
      }
    } 
  }
  
  playWrongAnswer() {
    setTimeout(() => {          
      [0,1,2,3].forEach(num => this.playNumber(num));
    }, 750);  
  }

  playWinSequence() {
    this.flashCounterMessage("WIN", 12);
    let sequence = [0,1,3,2,0,1,3,2,0,1,3,2,0,1,3,2];
    let i = 0;

    setTimeout(() => {
      let interval = setInterval(() => {
        this.playNumber(sequence[i]);
        i++;
        if (i >= sequence.length) clearInterval(interval);
      }, 300);
    }, 1000);

    setTimeout(() => { this.handleReset(); }, 8000);
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

  setStrict() {
    this.strict = !this.strict;
    document.querySelector('.simon__center__strict-light').classList.toggle('simon__center__strict-light--on');
  }

  resetSequence(sequence) {
    sequence.length = 0;
  }

  resetCounter() {
    this.counter = 0;
    this.screenCounter.textContent = "--";
  }

  incrementCounter() {  
    if (this.computerSequence.length > 0 ) this.counter++;   
    this.screenCounter.textContent = this.counter;
  }

  flashCounterMessage(message, numberOfFlashes) {
    let i = 0;    
    let interval = setInterval(() => {
      this.screenCounter.textContent = i % 2 ? message : "";
      i++;
      if (i >= (numberOfFlashes*2)) clearInterval(interval);
    }, 250);
  }
}