<?php
$controlador = Controlador::getInstance();
//$resultado = $controlador->executeMethod('saveUsuario',array('{"nombre":"Rene Astorga","username":"rene1234","password":"rene1234","usertype":"J","estado":"H"}'));
$resultado = $controlador->executeMethod('getUsuarios',array('{"condicion":"1"}'));
//metodo=saveUsuario&params={nombre:"Rene Astorga",username:"rene1234",password:"rene1234",usertype:"J"estado:"H"}
//$resultado = $controlador->executeMethod(isset($_POST["metodo"]) ? $_POST["metodo"] : "",isset($_POST["params"]) ? array($_POST["params"]) : "");
if($resultado != "ERROR"){
	echo ($resultado);
}



class Controlador{

	private static $instance = null;

	private function __construct(){
		
	}

	public static function getInstance(){
		if(self::$instance == null){
			self::$instance = new Controlador();
		}
		return self::$instance;
	}

	public function executeMethod($method,$params){
		if($params == "") $params = array();
		if($method!=""){
			if(method_exists($this,$method)){
				return call_user_func_array(array($this,$method),$params);
			}
		}
		else{
			return "ERROR";
		}
	}

	private function startUserSession($params){
		$resultado = $this->getAuthenticationResult($params);
		return $resultado;
	}

	private function getAuthenticationResult($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
	    $usuario=new Usuario($params->username,$params->password);
		$resultado=$usuario->autenticar();
		if($resultado == 1){
			session_start();
			$_SESSION["usuario"] = $usuario->getJSON();
		}
		return $resultado;
	}

	private function getNowUser(){
		session_start();
		if(isset($_SESSION["usuario"])){
			$resultado = $_SESSION["usuario"];
			return $resultado;
		}
		else{
			return "NSS";
		}
	}

	private function destroySession(){
		session_start();
		session_unset();
		session_destroy();
		if(isset($_SESSION["usuario"]))
			return "false";
		else
			return "true";
	}

	private function getUsuarios($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario();
		$registros = $usuario->getUsuarios($params->condicion);
		return $registros;
	}

	private function saveUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->nombre,$params->username,$params->password,$params->usertype,$params->estado);
		$usuario->guardar();
		return true;
	}

	private function modifyUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->idUsuario,$params->nombre,$params->username,$params->password,$params->usertype,$params->estado);
		$usuario->modificar();
		return true;
	}

	private function deleteUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->nombre,$params->username,$password,$params->usertype,$params->estado);
		$usuario->modificar();
		return true;
	}
}

?>