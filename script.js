// firebase initialization
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrZvNVygJnfm8nGA6q9eaW98H0a3VeuWs",
  authDomain: "quizapp2-ecffc.firebaseapp.com",
  projectId: "quizapp2-ecffc",
  storageBucket: "quizapp2-ecffc.appspot.com",
  messagingSenderId: "136352361404",
  appId: "1:136352361404:web:be3f0990d4a858734cd9b9",
  measurementId: "G-HCWJ3RR4PQ",
};
firebase.initializeApp(firebaseConfig);

var score = 0;

// var database = firebase.database().ref("todos");
// // generate key
// var key = database.push().key;
// console.log(key);
// // add object to db
// var todo = {
//   key: key,
//   value: "user1",
// };

// database.child(key).set(todo);
// // get data

// database.on("child_added", function (data) {
//   console.log(data.val());
// });

// old code

var main = document.getElementById("main");

function addTodo() {
  // console.log("add function runs");
  // var database = firebase.database().ref("quizQuestions");
  // var key = database.push().key;
  // var quesObj = {
  //   key: key,
  //   question: "Css stands for? ",
  //   option1: "cascading sheets",
  //   option2: "Cascading Style Sheet",
  //   option3: "Styling Sheet",
  //   corrAns: "2",
  // };
  // console.log(quesObj);
  // // add child to database
  // database.child(key).set(quesObj);
}
//
var quesArr = [];

function getData() {
  var database = firebase.database().ref("quizQuestions");
  database.on("child_added", function (data) {
    //     var todoElTxt = document.createTextNode(data.val().todo);

    //     // edit button
    //     editBtnEl.setAttribute("id", data.val().key);
    //  var data_key_to_pass = data.val().key;

    console.log(data.val());
    quesArr.push(data.val());
    console.log("-------------------");
    console.log(quesArr);
  });
}

getData();

// var pEl = document.createElement("p");
// var txt = document.createTextNode("hello world");
// pEl.appendChild(txt);
// main.appendChild(pEl);
var i = 0;

function dataMain() {
  dataDisp(i);
}

function dataDisp(i) {
  var userAns = "";

  /* loader */
  if (quesArr.length > 0) {
    var loader = document.getElementById("load");
    loader.classList.remove("loader");
  }
  /* -------------*/

  if (i < quesArr.length) {
    var pEl = document.createElement("h4");
    console.log("in data disp function");
    console.log(quesArr[0].question);
    var txt = document.createTextNode(
      "Q" + (i + 1) + ") " + quesArr[i].question
    );
    pEl.appendChild(txt);
    main.appendChild(pEl);

    var opt1 = document.createElement("p");
    var opt1TextNode = document.createTextNode("(1) " + quesArr[i].option1);
    opt1.appendChild(opt1TextNode);
    opt1.setAttribute("class", "opt1_class");
    opt1.setAttribute("data-aos", "fade-up");
    main.appendChild(opt1);

    var opt2 = document.createElement("p");
    var opt2TextNode = document.createTextNode("(2) " + quesArr[i].option2);
    opt2.appendChild(opt2TextNode);
    opt2.setAttribute("class", "opt2_class");
    opt2.setAttribute("data-aos", "fade-up");
    main.appendChild(opt2);

    var opt3 = document.createElement("p");
    var opt3TextNode = document.createTextNode("(3) " + quesArr[i].option3);
    opt3.appendChild(opt3TextNode);
    opt3.setAttribute("class", "opt3_class");
    opt3.setAttribute("data-aos", "fade-up");
    main.appendChild(opt3);

    var btn1 = document.createElement("button");
    btn1.textContent = "Option1";
    main.appendChild(btn1);

    var btn2 = document.createElement("button");
    btn2.textContent = "Option2";
    main.appendChild(btn2);

    var btn3 = document.createElement("button");
    btn3.textContent = "Option3";
    main.appendChild(btn3);

    btn1.onclick = function () {
      console.log("1");
      userAns = "1";
      btnNext.disabled = false;
      btn1.classList.toggle("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
    };
    btn1.setAttribute("class", "btn1_class");

    btn2.onclick = function () {
      console.log("2");
      userAns = "2";
      btnNext.disabled = false;
      btn2.classList.toggle("active");
      btn1.classList.remove("active");
      btn3.classList.remove("active");
    };
    btn2.setAttribute("class", "btn2_class");

    btn3.onclick = function () {
      console.log("3");
      userAns = "3";
      btnNext.disabled = false;
      btn3.classList.toggle("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
    };
    btn3.setAttribute("class", "btn3_class");
    // ----------------- next button ---------------------------------

    var btnNext = document.createElement("button");
    btnNext.textContent = "Next";
    main.appendChild(btnNext);
    btnNext.setAttribute("class", "next_class");
    btnNext.disabled = true;
    btnNext.onclick = function () {
      console.log;
      btnNext.disabled = true;
      if (userAns == quesArr[i].corrAns) {
        console.log("correct");
        score = score + 1;
        console.log("score: " + score);
      } else {
        console.log("false");
        console.log("score: " + score);
      }

      i++;
      main.innerHTML = "";
      dataDisp(i);
      // ----------------- next button ---------------------------------
    };
  } else if (i == quesArr.length) {
    console.log(i + 1);
    console.log(quesArr.length);
    var finishTest = document.createElement("p");
    var per = Math.round((score / quesArr.length) * 100);
    var finTextNode = document.createTextNode(
      `Test has completed you scored   ${[per]}%`
    );
    finishTest.appendChild(finTextNode);
    finishTest.setAttribute("class", "fin_test");
    finishTest.setAttribute("data-aos", "zoom_in_right");
    main.appendChild(finishTest);
  } else {
    console.log("network errro");
  }
}

setTimeout(dataMain, 7000);

/* timer */

let time = 600; // 10 minutes

// Function to update the timer
function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  // Add leading zero if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Display the timer
  document.getElementById("timer").textContent = minutes + ":" + seconds;

  // Decrease the time by 1 second
  time--;

  // Stop the timer when it reaches 0
  if (time < 0) {
    main.innerHTML = "";
    console.log("timee");

    console.log(i + 1);
    console.log(quesArr.length);
    var finishTest = document.createElement("p");
    var per = Math.round((score / quesArr.length) * 100);
    var finTextNode = document.createTextNode(
      `Test has completed you scored   ${[per]}%`
    );
    finishTest.appendChild(finTextNode);
    finishTest.setAttribute("class", "fin_test");
    finishTest.setAttribute("data-aos", "zoom_in_right");
    main.appendChild(finishTest);

    clearInterval(timerInterval);
  }
}

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
// Initial call to display the timer immediately

/* timer */
