$(document).ready(initializeApp);

var firstName, lastName, email;
var emailList = [];
var testList = [];

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
      // var emailList = response.split('"');

      console.log("response is: ", response);
      console.log("response.length is: ", response.length);
      // console.log("emailList is: ", emailList);

      // console.log("emailList length is: ", emailList.length);
      // console.log("emailList[0]: ", emailList[0]);
      // console.log("emailList[1]: ", emailList[1]);
      // console.log("emailList[2]: ", emailList[2]);


    }
  };
  $.ajax(retrieveConfig);
}

function sanitizeData() {

  console.log("emailList from sanitizeData() is: ", emailList);

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
