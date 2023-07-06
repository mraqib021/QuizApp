// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtQLIdY3OLg7kcEA392jqNhms4Dn60MJc",
  authDomain: "jawanpakistan-b9ed6.firebaseapp.com",
  databaseURL: "https://jawanpakistan-b9ed6-default-rtdb.firebaseio.com",
  projectId: "jawanpakistan-b9ed6",
  storageBucket: "jawanpakistan-b9ed6.appspot.com",
  messagingSenderId: "455865725186",
  appId: "1:455865725186:web:f316c27f18d3f4395f121b",
  measurementId: "G-QDN6DEW5EW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

// console.log(db);

window.writeUserData = () => {
  // const dbf = ref(db);
  for (let i = 0; i < questions.length; i++) {
    var refer = ref(db, "questions/");
    console.log(refer);
    var x = {
      questions: questions[i].question,
      options: questions[i].options,
      correctAnswer: questions[i].correctAnswer,
    };
    push(refer, x);
  }
};

// writeUserData();
var ques = document.getElementById("Question");
var options = document.getElementById("options");
var currentQ = document.getElementById("currentQ");
var totalQ = document.getElementById("totalQ");
var next_btn = document.getElementById("next_btn");
var d_none = document.getElementById("d_none");
var index = 0;

// console.log(options)

var rnderquestion = () => {
  const dbf = ref(db);
  get(child(dbf, "questions/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        var data = Object.values(snapshot.val());
        // console.log(data);
        var q = data[index];
        ques.innerHTML += data[index].questions;
        currentQ.innerHTML = index + 1;
        totalQ.innerHTML = data.length;
        for (var i = 0; i < q.options.length; i++) {
          options.innerHTML += `<div class="col-12 col-md-6 p-1"><label for="option${i}" class="input-boxs p-2 rounded-pill custom_color " style="width: 100%;"><input type="radio" name="question" id="option${i}" value='${q.options[i]}'> ${q.options[i]} </label></div>`;
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
rnderquestion();
var nextquestion = () => {
  ques.innerHTML = "";
  options.innerHTML = "";
  index++;
  rnderquestion();
};

var marks = 0;
window.check = () => {
  var select = document.querySelector("input[type=radio]:checked");
  // console.log(select);
  if (!select) {
    alert("Please Select Any one Option");
  } else {
    // console.log(select.value);
    // console.log(questions[index].correctAnswer);
    if (questions[index].correctAnswer == select.value) {
      marks++;
    } else {
      marks;
    }
    // console.log(marks);
    // console.log(index);
    if (index == 5) {
      showresult();
    } else {
      nextquestion();
    }
  }
};
window.showresult = () => {
  options.innerHTML = " ";
  d_none.innerHTML = " ";
  ques.innerHTML = `Your Score is : ${marks} `;
  next_btn.removeAttribute("onclick");
  // console.log(next_btn);
  next_btn.innerText = "Finish";
  // console.log(next_btn);
};
