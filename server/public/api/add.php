<?php

require_once("functions.php");
set_exception_handler("error_handler");
require_once("db_connection.php");

$bodyData = getBodyData();

if ($bodyData["firstName"]) {
  $firstName = $bodyData["firstName"];
  if (gettype($firstName) !== "string") {
    throw new Exception("firstName cannot contain a number");
  };
} else {
  throw new Exception("firstName required");
}

if ($bodyData["lastName"]) {
  $lastName = $bodyData["lastName"];
  if (gettype($lastName) !== "string") {
    throw new Exception("lastName cannot contain a number");
  };
} else {
  throw new Exception("firstName required");
}

if ($bodyData["email"]) {
  $email = $bodyData["email"];
  if (gettype($email) !== "string") {
    throw new Exception("email cannot contain a number");
  };
} else {
  throw new Exception("email required");
}

$date = gmdate("Y/m/d H:i:s");

$query = "INSERT INTO `registration_list`
          SET `firstName` = '$firstName',
              `lastName` = '$lastName',
              `email` = '$email',
              `date` = '$date'";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}

?>
