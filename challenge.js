//need to declare this in global scope so that data persists from one like event to the other
let likedObj = {};

// to ensure JS engine runs this code/file only after all of the DOM elements have been loaded
// in case script tag for src="challenge.js" is higher up in index.html
document.addEventListener("DOMContentLoaded", main)

function main(){
  initializeTimer();

  initializeIncrementButton();
  initializeDecrementButton();

  initializeLikeFeature();

  initializeCommentForm();

  initializePauseFeature();
}


//////////////////TIMER/////////////////////////////////////////////
function initializeTimer() {
  let counter = document.getElementById('counter');

  let intervalID = setInterval(function() {
    let currentValue = parseInt(counter.innerText);
    let newValue = currentValue + 1;

    counter.innerText = newValue;
  }, 1000)

  // add intervalID (property that comes with setInterval) to DOM
  counter.dataset.intervalID = intervalID; //adds attr to HTML element 'counter', with new intervalID# every time (referring to new setInterval)
}


//////////////INCREMENT BUTTON//////////////////////////////////////
function initializeIncrementButton() {
  let incrementButton = document.getElementById('+')
  incrementButton.addEventListener('click', incrementHandler);
}

function incrementHandler() {
  let counter = document.getElementById('counter');
  let currentValue = parseInt(counter.innerText);
  let newValue = currentValue + 1;

  counter.innerText = newValue;
}


//////////////DECREMENT BUTTON//////////////////////////////////////
function initializeDecrementButton() {
  let decrementButton = document.getElementById('-')
  decrementButton.addEventListener('click', decrementHandler)
}

function decrementHandler() {
  let counter = document.getElementById('counter');
  let currentValue = parseInt(counter.innerText);
  let newValue = currentValue - 1;

  counter.innerText = newValue;
}


//////////////////LIKE BUTTON///////////////////////////////////////
function initializeLikeFeature() {
  let likeButton = document.getElementById('<3');
  likeButton.addEventListener('click', likeNumberHandler);
}

function likeNumberHandler() {
  let number = parseInt(document.getElementById('counter').innerText);
  if (likedObj[number]) {
    likedObj[number] ++;
  } else {
    likedObj[number] = 1;
  }; //building likeObj object (hash-like structure)

  let ul = document.querySelector('.likes');
  ul.innerHTML = ''; //removing all ul children/past "like" statements (or else they'll be repeated)
  // console.log(likedObj)
  for (key in likedObj) {
    let li = document.createElement('li')
    if (likedObj[key] === 1) {
      li.innerText = `${key} has been liked ${likedObj[key]} time`
    } else {
      li.innerText = `${key} has been liked ${likedObj[key]} times`
    }
    ul.appendChild(li)
  };
}


//////////////ADDING COMMENTS//////////////////////////////////////////
function initializeCommentForm() {
  let form = document.getElementById('comment-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); //on the event object itself (to prevent form's default action of refreshing page)
    // make a new comment be present in DOM
    let inputText = (document.getElementById('user-input')).value;

    let commentArea = document.getElementById('list');

    // add inputText to some DOM eleement and add it to commentArea
    let newComment = document.createElement('p');
    newComment.innerText = inputText;
    commentArea.appendChild(newComment);

    // clear what was previously written in input tag. Built-in JS function, avail on forms (clear their value properties)
    form.reset();
  })
}


//////////////PAUSE BUTTON//////////////////////////////////////
function initializePauseFeature() {
  let pauseButton = document.getElementById('pause');
  let counter = document.getElementById('counter');

  pauseButton.addEventListener('click', () => {
    //get the buttons / DOM elements
    let buttons = document.querySelectorAll('.disableable')

    // if counter.dataset.intervalID != "none" (aka not some number), means there is a timer/interval
    if (counter.dataset.intervalID != "none") {
      //clear interval to stop timer, using counter's intervalID (return of setInterval == that setInterval's ID)
      clearInterval(parseInt(counter.dataset.intervalID))
      //then set counter.dataset.intervalID (key) equal to none
      counter.dataset.intervalID = "none"
      pauseButton.innerText = "resume"

      buttons.forEach((btn) =>
        //to disable each HTML button, set its property of disabled to true
        btn.disabled = true
      )
    // else, toggle the interval back on via initializeTimer()
    } else {
      initializeTimer()
      pauseButton.innerText = "pause"

      buttons.forEach((btn) => {
        // enable each button
        btn.disabled = false
      })
    }
  })
}
