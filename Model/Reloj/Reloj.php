<?php
echo(Reloj::obtenerServerTime());

class Reloj{
	private function __construct(){

	}

	static function obtenerServerTime(){
		$date = date("r");
		return $date;
	}

}

?>