<?php
$controlador = Controlador::getInstance();
$resultado = $controlador->executeMethod(isset($_POST["metodo"]) ? $_POST["metodo"] : "",isset($_POST["params"]) ? array($_POST["params"]) : "");
if($resultado !== "ERROR"){
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
		$registros = $usuario->getUsuarios($params->condicion);
		return $registros;
	}

	private function getUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario();
		$usuario->autocompletar('IDUSUARIO = '.$params);
		$registro=$usuario->getJSON();
		return $registro;
	}

	private function modifyUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario= new Usuario($params->idUsuario);
		$usuario->setNombre($params->nombre);
		$usuario->setUsername($params->username);
		if(isset($params->password))$usuario->setPassword($params->password);
		$usuario->setUsertype($params->usertype);
		$usuario->setEstado($params->estado);
		$usuario->modificar();
		return true;
	}

	private function setUsuarioPermit($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->idUsuario);
		if($params->permit === 1) $usuario->habilitarUsuario();
		else $usuario->deshabilitarUsuario();
		return true;
	}

	//METODO ORIENTATIVO, NO SE ENCUENTRA EN USO TODAVIA

	private function deleteUsuario($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->idUsuario); 
		$usuario->eliminar();
		return true;
	}

	//

	private function savePersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Persona($params->legajo,$params->cuil,$params->nombre,$params->apellido,$params->fechaNacimiento,$params->mail,$params->telefono,$params->domicilio,$params->localidad,$params->provincia,$params->cv);
		//$usuario->guardar();
		return true;
	}

	private function getPersonas($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario();
		$registros = $usuario->getUsuarios($params->condicion);
		return $registros;
	}

	private function getPersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario();
		$usuario->autocompletar('IDUSUARIO = '.$params);
		$registro=$usuario->getJSON();
		return $registro;
	}

	private function modifyPersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario= new Usuario($params->idUsuario);
		$usuario->setNombre($params->nombre);
		$usuario->setUsername($params->username);
		if(isset($params->password))$usuario->setPassword($params->password);
		$usuario->setUsertype($params->usertype);
		$usuario->setEstado($params->estado);
		$usuario->modificar();
		return true;
	}

	private function deletePersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Usuario.php';
		$params = json_decode($params);
		$usuario = new Usuario($params->idUsuario); 
		$usuario->eliminar();
		return true;
	}


	private function saveArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$usuario = new Area($params->idArea,$params->codigo,$params->descripcion,$params->cantidadPersonas);
		$usuario->guardar();
		return true;
	}

	private function modifyArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = $_SESSION['areaInteres'];
		$area->setCodigo($params->codigo);
		$area->setDescripcion($params->descripcion);
		$area->setCantidadPersonas($params->username);
		$registros = $area->getAreas($params);
		return $registros;
	}

	private function getAreas($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$areas = new Area();
		$registros = $area->getAreas($params);
		return $registros;
	}

	private function getArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		if(isset($_SESSION['areaInteres'])){
			$_SESSION['areaInteres']=new Area();
		}
		//$area = new Area();
		$area->autocompletar('IDAREA = '.$params);
		$registro=$area->getJSON();
		$_SESSION['usuarioInteres'] = $area;
		return $registro;
	}

	private function deleteArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area($params->idArea); 
		$area->eliminar();
		return true;
	}
}

?>