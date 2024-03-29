$(document).ready(initializeApp);

var firstName, lastName, email;
var emailList = [];
var namesValidation = false;
var emailValidation = false;

function initializeApp() {
  console.log("rock and roll");
  retrieveEmail();
  $("#button").on("click", sanitizeData);
}

function retrieveEmail() {
  var retrieveConfig = {
    datatype: "json",
    url: "server/public/api/retrieve.php",

    success: function (response) {
      for (var index = 0; index < response.length; index++) {
        emailList.push(response[index]);
      }
    }
  };

  $.ajax(retrieveConfig);
}

function sanitizeData() {

  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  emailChecker(email);
  nameChecker(firstName, lastName);

  if (namesValidation && emailValidation) {
    registerNewUser(firstName, lastName, email);
  }

}

function nameChecker(firstName, lastName) {
  if (firstName.length > 1 && lastName.length > 1) {
    if ((/^\S*$/.test(firstName)) && /^[a-z ,.'-]+$/i.test(lastName)) {
      namesValidation = true;
    } else {
      alert("failed name test: please double check your name");
    }
  } else {
    alert("failed name test: need at least 1 character");
  }
}

function emailChecker(email) {

  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {

    for (var index = 0; index < emailList.length; index++) {
      if (email == emailList[index]) {
        emailValidation = false;
        alert("failed email test: email already exists");
        return;
      } else {
        emailValidation = true;
      }
    }
  } else {
    alert("failed email test: need appropriate email")
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
  emailList = [];
  retrieveEmail();

  document.getElementById("firstName").value="";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
}
