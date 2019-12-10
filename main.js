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
}
