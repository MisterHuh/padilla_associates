<?php

require_once("functions.php");
set_exception_handler("error_handler");
startup();
require_once("db_connection.php");

$query = "SELECT `email` FROM `registration_list` ORDER BY date ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query: " . mysqli_error($conn));
}

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row["email"];
}

print(json_encode($output));

?>
