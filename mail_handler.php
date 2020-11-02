
<?php
require_once('functions.php');
require_once('email_config.php');
require_once('config.php');
require_once('./phpmailer/src/Exception.php');
require_once('./phpmailer/src/PHPMailer.php');
require_once('./phpmailer/src/SMTP.php');

foreach($_POST as $key => $value){
    $_POST[$key] = htmlentities(addslashes($value));

    $_POST[$key] = ltrim($_POST[$key]);
    if (strlen($_POST[$key]) === 0) {
        echo 'Message could not be sent.';
        exit();
    }
}

$mail = new PHPMailer\PHPMailer\PHPMailer;
$mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = 'salisburypsforward@gmail.com';   // SMTP username
$mail->Password = 'salisburyPS1!';   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = $_POST['email'];  // sender's email address (shows in "From" field)
$mail->FromName = $_POST['name'];   // sender's name (shows in "From" field)
$mail->addAddress('salisburypsforward@gmail.com');  // Add a recipient (name is optional)
$mail->addAddress('mds@salisburyps.com');   // Add a second recipient
$mail->addReplyTo($_POST['email']);             // Add a reply-to address
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

// $mail->Subject = isset($_POST['inputState']) ? $_POST['inputState'] : '';
$mail->Subject = "Online Website Inquiry from " . $_POST['name'];

// $mail->Body    = isset($_POST['formMessage']) ? $_POST['formMessage'] : '';
$mail->Body = "Name : " . $_POST['name'] . "<br>" . " Email : " . $_POST['email'] . "<br>" . 
            "Service Selected : " . $_POST['inputState'] . "<br>" .
            "Message : " . $_POST['message'];
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    $output = [
        'success' => false
    ];
    $json_output = json_encode($output);
    echo($json_output);
} else {
    $output = [
        'success' => true
    ];
    $json_output = json_encode($output);
    echo($json_output);
}
?>
