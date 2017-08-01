<?php
	if(!isset($_FILES['file'])){die();}
	$temp_name = $_FILES['file']['tmp_name'];
	$name = $_POST['nombreArchivo'].'.'.end(explode(".",$_FILES['file']['name']));
	move_uploaded_file($temp_name,'archivo/'.$name);
	echo('SETO');
?>