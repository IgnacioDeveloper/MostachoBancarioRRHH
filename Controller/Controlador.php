<?php
$controlador = Controlador::getInstance();
//$resultado = $controlador->executeMethod('saveUsuario',array('{"nombre":"Rene Astorga","username":"rene1234","password":"rene1234","usertype":"J","estado":"H"}'));
//$resultado = $controlador->executeMethod('getUsuarios',array('{"condicion":"1"}'));
//metodo=saveUsuario&params={nombre:"Rene Astorga",username:"rene1234",password:"rene1234",usertype:"J"estado:"H"}
/*require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
$_SESSION['usuarioInteres']=new Usuario('15','Gian Pierre Moroe','gian1234','1234','E','H');*/
//$usuario = $_SESSION['usuarioInteres'];
//echo($usuario->getIdUsuario());
//$usuario->setNombre('Phamtom');
//echo($usuario->getNombre());
//$resultado = $controlador->executeMethod('modifyUsuario',array('{"nombre":"Ian Matamajala","username":"matamajala12","password":"1234","usertype":"J","estado":"H"}'));
//$resultado = $controlador->executeMethod();
//$resultado = $controlador->executeMethod('startUserSession',array('{"username":"ignaciodeveloper","password":"ignacio1234"}'));
$resultado = $controlador->executeMethod(isset($_POST["metodo"]) ? $_POST["metodo"] : "",isset($_POST["params"]) ? array($_POST["params"]) : "");
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

	private function saveUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->nombre,$params->username,$params->password,$params->usertype,$params->estado);
		$usuario->guardar();
		return true;
	}

	private function getUsuarios($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario();
		$registros = $usuario->getUsuarios($params);
		return $registros;
	}

	private function getUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		if(isset($_SESSION['usuarioInteres'])){
			$_SESSION['usuarioInteres']=new Usuario;
		}
		$usuario = new Usuario();
		$usuario->autocompletar($params);
		$registro=$usuario->getJSON();
		$_SESSION['usuarioInteres'] = $usuario;
		return $registro;
	}

	private function modifyUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = $_SESSION['usuarioInteres'];
		$usuario->setNombre($params->nombre);
		$usuario->setUsername($params->username);
		$usuario->setPassword($params->password);
		$usuario->setUsertype($params->usertype);
		$usuario->setEstado($params->estado);
		$usuario->modificar();
		return true;
	}

	private function deleteUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->idUsuario); 
		$usuario->eliminar();
		return true;
	}
}

?>