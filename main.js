$(document).ready(initializeApp);

var firstName, lastName, email;
var emailList = [];
var counter = 0;

function initializeApp() {
  console.log("rock and roll");
  retrieveEmail();
  $("#button").on("click", sanitizeData);
}

function retrieveEmail() {
  var retrieveConfig = {
    datatype: "json",
    headers: { 'Content-Type': 'application/json' },
    url: "server/public/api/retrieve.php",

    success: function (response) {
      var emailList = response;
      // counter++;
      // console.log("counter is: ", counter);
      console.log("response is: ", response);
      // console.log("emailList is: ", emailList);
    }
  };
  $.ajax(retrieveConfig);
}

function sanitizeData() {

  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  if (emailChecker(email) && nameChecker(firstName, lastName) ) {
    registerNewUser(firstName, lastName, email)
  }

}

function nameChecker(firstName, lastName) {
  if (firstName.length > 1 && lastName.length > 1) {
    if ((/^\S*$/.test(firstName)) && /^[a-z ,.'-]+$/i.test(lastName)) {
      return true;
    } else {
      alert("failed name test: please double check your name");
    }
  } else {
    alert("failed name test: need at least 1 character");
  }
}

function emailChecker(email) {
  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    return true;
  } else {
    alert("Please enter an appropriate email")
  }
}

function registerNewUser(firstName, lastName, email) {

  var newUserInfo = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email
  })

  var addConfig = {
    type: "post",
    datatype: "json",
    url: "server/public/api/add.php",
    data: newUserInfo
  };
  $.ajax(addConfig)

  alert("new user added!");

  document.getElementById("firstName").value="";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
}
