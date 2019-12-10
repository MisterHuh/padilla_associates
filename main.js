$(document).ready(initializeApp);

var firstName, lastName, email;
var emailList = [];

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
      var cleanUp = response.split('\n')
      console.log("cleanUp is: ", cleanUp);

      var cleanUp2 = [];
      cleanUp2.push(cleanUp[3]);
      console.log("cleanUp2 is: ", cleanUp2);

      var lastIndex = cleanUp2.length - 1
      var cleanUp3 = cleanUp2.substr( 1,lastIndex )
      console.log("cleanUp3 is: ", cleanUp3);

    }
  };
  $.ajax(retrieveConfig);
}

function sanitizeData() {

  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  if (emailChecker(email)) && (nameChecker(firstName, lastName)) ) {
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
  /* run through the retrieved emailList and check for match */
  /* If no match, run registerNewUser, else, throw alert */
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
}
