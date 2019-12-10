$(document).ready(initializeApp);

var firstName, lastName, email;
var emailList = [];
var test = [];

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
      var emailList = response;
      console.log("response is: ", response)
      console.log("emailList is: ", emailList)
      console.log("email length is:", response.length)

      // if (response) {
        // for (var index = 0; index < response.length; index++) {
          // console.log("test is: ", response[index]["email"])
          // test.push(response[index]["email"]);
        // }
        // console.log("cleaned up email is: ", test);
      // }

    }
  };
  $.ajax(retrieveConfig);
}

// function pushToEmailList(response) {
//   if (emailList) {
//     for (var index = 0; index < emailList.length; index++) {
//       test.push(response[index]["email"]);
//     }
//     console.log("cleaned up email is: ", email);
//   }
// }

function sanitizeData() {

  console.log("email list is: ", emailList);

  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  email = $("#email").val();

  emailChecker(email);
  nameChecker(firstName, lastName);

  if (emailChecker(email) && nameChecker(firstName, lastName)) {
    alert("both passed test");

  } else {
    alert ("need correct name or email")
  }

  // var emailRegex = "/[^@]+@[^\.]+\..+/";
  // var emailChecker = emailRegex.test(email);
  // console.log("emailChecker is: ", emailChecker);
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
  console.log("passed email test")
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
}
