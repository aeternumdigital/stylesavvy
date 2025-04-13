<?php

// SETUP --------------------------
$file = 'orders.txt';
$redirect = 'thankyou.html';
// --------------------------------

$params = array();

// GET DATA

foreach ($_POST as $name => $value) {
  $params[$name] = $value;
}

// SAVE DATA TO FILE

$message = "NEW LEAD ------------------\n";
foreach ($params as $name => $value) {
  $message .= "$name: $value\n";
}
$message .= "---------------------------\n\n";

$result = file_put_contents($file, $message, FILE_APPEND);

// REDIRECT

if($result) {
    header('Location: '. $redirect);
    exit();
}

echo "Error. Filed to save file.";

?>
