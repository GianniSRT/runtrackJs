<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nom = trim($_POST["nom"]);
    $prenom = trim($_POST["prenom"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $password_confirmation = $_POST["password_confirmation"];

    $errors = [];

    if (strlen($nom) < 3) $errors[] = "Nom trop court";
    if (strlen($prenom) < 3) $errors[] = "Prénom trop court";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Email invalide";
    if ($password !== $password_confirmation) $errors[] = "Les mots de passe ne correspondent pas";

    if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/", $password)) {
        $errors[] = "Mot de passe trop faible";
    }

    if (empty($errors)) {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nom, $prenom, $email, $passwordHash]);

        header("Location: connexion.html");
        exit();
    } else {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
}
?>
