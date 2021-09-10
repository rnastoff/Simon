const fs = require("fs");
//console.log(process.cwd());
window.document.body.innerHTML = fs.readFileSync("./src/index.html");

const { Simon } = require('../simon.js');



describe('All Simon buttons', () => {
  let simon;
  beforeEach(() => {
    simon = new Simon();
  });

  test('handleCenterButtons should call handleStart', () => {
    simon.handleStart = jest.fn();
    simon.handleCenterButtons("start");
    expect(simon.handleStart).toHaveBeenCalled();
  });

  test('handleCenterButtons should call handleStrict', () => {
    simon.handleStrict = jest.fn();
    simon.handleCenterButtons("strict");
    expect(simon.handleStrict).toHaveBeenCalled();
  });

  test('handleCenterButtons should call handleReset', () => {
    simon.handleReset= jest.fn();
    simon.handleCenterButtons("reset");
    expect(simon.handleReset).toHaveBeenCalled();
  });

  test('handlePlayButtons should call...', () => {

  });


});


describe('handleStart', () => {
  
  test('should call addNumberToSequence', () => {

  });

  test('should call playSequence', () => {

  });





});