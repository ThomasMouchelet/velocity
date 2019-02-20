<?php
header('Access-Control-Allow-Origin: *');

$user = [];

// Create database in phpMyadmin with user table (id, username, password)
// Connect to database
// fetch user in database with SQL request

if( $_POST["username"] == "admin" && $_POST["password"] == "admin"){
    $user = [
        "username" => "admin"
    ];
}

echo json_encode($user);