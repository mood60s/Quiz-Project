// Select Elements,
let countSpan = document.querySelector('.count span');
let bulletsSpanContainer = document.querySelector('.bullets .spans-container');
let quizArea = document.querySelector('.quiz-area');
let answerArea = document.querySelector('.answers-area');
let submitButton = document.querySelector('.submit-button');
let bullets = document.querySelector('.bullets');
let ResultContainer = document.querySelector('.results');
let countdownElement = document.querySelector('.count-down');
//Set Options DownBelow
let currentIndex = 0; // Logic
let rightAnswerIndex = 0;
let countdownInterval;
// Done Select
function getQuestions() {
  //Need Data From Json Object
  let myRequest = new XMLHttpRequest();
  myRequest.open('GET', 'htmlQuestions.json', true);
  myRequest.send();
  /*
====

====
*/
  /*
====
Check Response Downbelow
====
*/
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Convert JSON To JavaScript Object Down Below
      let questionObject = JSON.parse(this.responseText); // Done
      // Need To know How many Elements i have In my Object, Downbelow
      let qCount = questionObject.length; // Done

      // Create Bullets + set Questions Count Depend in Length Object i get it upstarts,
      createBullets(qCount); // done i send Length to Fn
      // Add Question Data, And Sent Object and Length to it
      // To make Elements Dyanmic Depend in Object Length,
      addQuestionData(questionObject[currentIndex], qCount);
      // Click On Submit
      //CountDown
      countdown(5,qCount)
      //
      submitButton.onclick = (_) => {
        // Get Right Answer From Object
        let theRightAnswer = questionObject[currentIndex].right_answer;
        // Increase IndeX<
        currentIndex++;
        // Check The Answer Only happen In Click,
        checkAnswer(theRightAnswer, qCount);
        // Remove Old Content, Questions, Logic DownBelow
        // Empty Quiz Answer call The Function Again
        quizArea.innerHTML = '';
        answerArea.innerHTML = '';
        addQuestionData(questionObject[currentIndex], qCount);
        //Handle Bullets Classes,
        handleBullets();
        clearInterval(countdownInterval)
        countdown(5,qCount)
        // Show Results,
        showResults(qCount);
      };
      // End submit Function NClick,
    }
  };
}
// Calling  functiosn DownBelow
getQuestions();
// Function Create Bullet Dynamic Downbelow
function createBullets(num) {
  countSpan.innerHTML = num;
  // Create Bullet, depend On Length Object,
  for (let i = 0; i < num; i++) {
    let theBullet = document.createElement('span');
    // Need condition to add Class, On First Child Only,
    if (i === 0) theBullet.className = 'on';

    bulletsSpanContainer.appendChild(theBullet);
  }
  //
}
// 5 length object
// 0,1,2,3,4
/*
What mean Current index < count
Current Index start from 0
Count Start from 1
*/
function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement('h2');
    let questionText = document.createTextNode(obj['title']); // Dynamic Title Fetch it from Object
    questionTitle.append(questionText);
    quizArea.appendChild(questionTitle);
    // Create Answer Dynamic,From ObjecT
    for (let i = 1; i <= 4; i++) {
      let container = document.createElement('div');
      container.className = 'answer';
      let radioInput = document.createElement('input');
      // Add Type + Name + id + Data-Attribute,
      radioInput.name = 'question';
      radioInput.type = 'radio';
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`]; // Return value from Object
      if (i === 1) radioInput.checked = true;
      //Create LAbEL
      let theLabel = document.createElement('label');
      theLabel.htmlFor = `answer_${i}`;
      // Text LABEL
      let theLabeLText = document.createTextNode(obj[`answer_${i}`]);
      theLabel.append(theLabeLText);
      container.appendChild(radioInput);
      container.appendChild(theLabel);
      answerArea.appendChild(container);
    }
  }
}

//Slash,
function checkAnswer(Ranswer, count) {
  let Answers = document.getElementsByName('question');
  let theChoosenAnswer; // Empty Variable,
  for (let i = 0; i < Answers.length; i++) {
    if (Answers[i].checked) {
      theChoosenAnswer = Answers[i].dataset.answer;
    }
  }
  if (Ranswer === theChoosenAnswer) {
    rightAnswerIndex++;
    console.log(`Good Answer Index Right = ${rightAnswerIndex}`);
  }
}
// Loop In Sequences spans add Class on,Via Fn
function handleBullets() {
  let spans = document.querySelectorAll('.bullets .spans-container span');
  let ArrayFromSpan = Array.from(spans);
  ArrayFromSpan.forEach((span, index) => {
    if (currentIndex === index) span.className = 'on';
  });
}
// *---Show Result Delete ALL Elements,
function showResults(length) {
  let theResults;
  if (currentIndex === length) {
    quizArea.remove();
    answerArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswerIndex > length / 2 && rightAnswerIndex < length) {
      theResults = `<span class="good">GOOD</span> ${rightAnswerIndex} from ${length}`;
    } else if (rightAnswerIndex === length) {
      theResults = `<span class="perfect">Perfect</span> ${rightAnswerIndex} From ${length}`;
    } else {
      theResults = `<span class="bad">BAD</span> Answers ${rightAnswerIndex} From ${length}`;
    }
    ResultContainer.innerHTML = theResults;
    ResultContainer.style.padding = '10px';
    ResultContainer.style.marginTop = '10px';
  }
}
// Counter
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ?`0${minutes}` :minutes
      seconds = seconds< 10 ?`0${seconds}` :seconds
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
       submitButton.click()
      }
    }, 1000);
  }
}
/*
 PlayList javascript and tutorial example
*/
