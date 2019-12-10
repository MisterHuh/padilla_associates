$(document).ready(initializeApp);

var emailList;

function initializeApp() {
  console.log("rock and roll");
  testWord();
  retrieveEmail();
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
