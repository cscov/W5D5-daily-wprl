class Clock {
  constructor() {
    const time = new Date();
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);

  }

  printTime(){
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    this.incrementSeconds();
    this.printTime();

  }

  incrementSeconds(){
    this.seconds ++;
    if(this.seconds === 60){
      this.seconds = 0;
      this.incrementMinutes();
    }
  }

  incrementMinutes(){
    this.minutes ++;
    if(this.minutes === 60){
      this.minutes = 0;
      this.incrementHours();
    }
  }

  incrementHours(){
    this.hours ++;
    if(this.hours === 24){
      this.hours = 0;
    }
  }
}

// const clock = new Clock();


const readline = require('readline');

const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question('Please enter a number:', function(res) {
      const parsedInt = parseInt(res);
      sum += parsedInt;
      numsLeft--;
      console.log(`current sum: ${sum}`);
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}


// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question(`Is ${el1} greater than ${el2}? (y/n)`, function (res) {
    if (res === 'y') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.

  if(i === arr.length -1) {
    outerBubbleSortLoop(madeAnySwaps);
  }

  askIfGreaterThan(arr[i], arr[i + 1], function (isGreaterThan){
    if (isGreaterThan) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
}


// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {

  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if(madeAnySwaps){
      innerBubbleSortLoop(arr,0,false,outerBubbleSortLoop);
    }else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });


Function.prototype.myBind = function (context) {
  return function () {
    Function.prototype.apply(this, [context]);
  };
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

 // should not work the way we want it to
 turnOn();

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
