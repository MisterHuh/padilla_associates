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
      var cleanUp = response.split("\n");
      var cleanUp2 = [];
      cleanUp2.push(cleanUp[3]);
      console.log("cleanUp2 is: ", cleanUp2);

      // for (var index = 3; index < cleanUp.length; index++) {
      //   if (cleanUp[index] !== "") {
      //     emailList.push(cleanUp[index]);
      //   }
      // }

      console.log("response is: ", response);
      // console.log("emailList is: ", emailList);

    }
  };
  $.ajax(retrieveConfig);
}

function sanitizeData() {

  // console.log("email list is: ", emailList);

  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  emailChecker(email);
  // nameChecker(firstName, lastName);

  if (emailChecker(email)) {
    registerNewUser(firstName, lastName, email)
  }

}

function nameChecker(firstName, lastName) {
  if (firstName.length > 1 && lastName.length > 1) {
    if ((/^\S*$/.test(firstName)) && /^[a-z ,.'-]+$/i.test(lastName)) {
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
  if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    // for (var index = 0; index < emailList.length; index++) {
      // if (email == emailList[index]) {
        // alert("User with same email already exists");
      // }
    // }
    alert("passed regex test. ready to add")
    registerNewUser(firstName, lastName, email)
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

  console.log("newUserInfo is: ", newUserInfo)
  var addConfig = {
    type: "post",
    datatype: "json",
    url: "server/public/api/add.php",
    data: newUserInfo
  };
  $.ajax(addConfig)
}
