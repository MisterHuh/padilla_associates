$(document).ready(initializeApp);

var emailList, firstName, lastName, email;

function initializeApp() {
  console.log("rock and roll");
  testWord();
  retrieveEmail();
  $("#button").on("click", addUser);

}

function testWord() {
  $("#word").text("rock and roll")
}

function retrieveEmail() {
  var retrieveConfig = {
    datatype: "json",
    url: "server/public/api/retrieve.php",
    success: function (response) {
      console.log("response is: ", response)
      var emailList = response;
    }
  };
  $.ajax(retrieveConfig);
}

function addUser() {
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  console.log("firstName is: ", firstName);
  console.log("lastName is: ", lastName);
  console.log("email is: ", email);

  emailChecker(email);
  nameChecker(firstName, lastName);

  // var emailRegex = "/[^@]+@[^\.]+\..+/";
  // var emailChecker = emailRegex.test(email);
  // console.log("emailChecker is: ", emailChecker);
}

function nameChecker(firstName, lastName) {
  if (firstName.length > 1 && lastName.length > 1) {
    if ((/^[a-z ,.'-]+$/i.test(firstName)) && /^[a-z ,.'-]+$/i.test(lastName)) {
      console.log("passed name test");
      return true;
    } else {
      console.log("failed name test");
    }
  } else {
    console.log("failed name test: need at least 1 character");
  }
}

function emailChecker(email) {
  // if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
  //   console.log("passed");
  // } else {
  //   console.log("failed")
  // }
  console.log("passed email test")
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
}
