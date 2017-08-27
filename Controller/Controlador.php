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

	//USUARIOS

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
		$usuario->getUsuario('IDUSUARIO = '.$params);
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

	//PERSONAS

	private function savePersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		$params = json_decode($params);
		$persona = new Persona($params->legajo,$params->cuil,$params->nombre,$params->apellido,$params->fechaNacimiento,$params->mail,$params->telefono,$params->domicilio,$params->localidad,$params->provincia);
		$persona->guardar();
		$persona->getPersona("LEGAJO = '$params->legajo' AND CUIL = '$params->cuil'");
		return $persona->getIdPersona();
	}

	private function getPersonas($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		$params = json_decode($params);
		$persona = new Persona();
		$registros = $persona->getPersonas($params->condicion);
		return $registros;
	}

	private function getPersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		$params = json_decode($params);
		$persona = new Persona();
		$persona->getPersona('IDPERSONA = '.$params);
		$registro=$persona->getJSON();
		return $registro;
	}

	private function modifyPersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		$params = json_decode($params);
		$persona= new Persona($params->idPersona);
		$persona->setLegajo($params->legajo);
		$persona->setCuil($params->cuil);
		$persona->setNombre($params->nombre);
		$persona->setApellido($params->apellido);
		$persona->setFechaNacimiento($params->fechaNacimiento);
		$persona->setMail($params->mail);
		$persona->setTelefono($params->telefono);
		$persona->setDomicilio($params->domicilio);
		$persona->setLocalidad($params->localidad);
		$persona->setProvincia($params->provincia);
		$persona->modificar();
		return $persona->getIdPersona();
	}

	private function deletePersona($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		$params = json_decode($params);
		$persona = new Persona($params->idPersona); 
		$persona->eliminar();
		return true;
	}

	private function saveFile($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/FileHandler/FileHandler.php';
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Persona.php';
		if(isset($_FILES['cvFile'])){
			$fileHandler = FileHandler::getInstance();
			$params=json_decode($params);
			$name = $fileHandler->saveFile($_FILES['cvFile'],$params->idPersona);
			$persona = new Persona($params->idPersona);
			$persona->asignarArchivo($name);
			return true;
		}
		else{
			return false;
		}
	}
	
	private function deleteFile($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/FileHandler/FileHandler.php';
		$fileHandler = FileHandler::getInstance();
		$params=json_decode($params);
		return $fileHandler->deleteFile('CV_'.$params->idPersona.'.pdf');
	}

	//AREAS

	private function saveArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area($params->codigo,$params->descripcion,$params->idAreaSuperior);
		$area->guardar();
		return true;
	}

	private function getAreas($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area();
		$registros = $area->getAreas($params->condicion);
		return $registros;
	}

	private function getArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area();
		$area->getArea('IDAREA = '.$params);
		$registro = $area->getJSON();
		return $registro;
	}

	private function modifyArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area($params->idArea);
		$area->setCodigo($params->codigo);
		$area->setDescripcion($params->descripcion);
		$area->setIdAreaSuperior($params->idAreaSuperior);
		$area->modificar();
		return true;
	}

	private function deleteArea($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Area.php';
		$params = json_decode($params);
		$area = new Area($params->idArea); 
		$area->eliminar();
		return true;
	}

//PUESTOS

	private function savePuesto($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Puesto.php';
		$params = json_decode($params);
		$puesto = new Puesto($params->codigo,$params->nombre,$params->descripcion,$params->objetivoGeneral,$params->funcionesEspecificas,
			$params->competenciasRequeridas,$params->conocimientosRequeridos,$params->idArea);
		$puesto->guardar();
		return true;
	}

	private function getPuestos($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Puesto.php';
		$params = json_decode($params);
		$puesto = new Puesto();
		$registros = $puesto->getPuestos($params->condicion);
		return $registros;
	}

	private function getPuesto($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Puesto.php';
		$params = json_decode($params);
		$puesto = new Puesto();
		$puesto->getPuesto('IDPUESTO = '.$params);
		$registro = $puesto->getJSON();
		return $registro;
	}

	private function modifyPuesto($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Puesto.php';
		$params = json_decode($params);
		$puesto = new Puesto($params->idPuesto);
		$puesto->setCodigo($params->codigo);
		$puesto->setNombre($params->nombre);
		$puesto->setDescripcion($params->descripcion);
		$puesto->setObjetivoGeneral($params->objetivoGeneral);
		$puesto->setFuncionesEspecificas($params->funcionesEspecificas);
		$puesto->setCompetenciasRequeridas($params->competenciasRequeridas);
		$puesto->setConocimientosRequeridos($params->conocimientosRequeridos);
		$puesto->setIdArea($params->idArea);
		$puesto->modificar();
		return true;
	}

	private function deletePuesto($params){
		require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Domain/Puesto.php';
		$params = json_decode($params);
		$puesto = new Puesto($params->idPuesto); 
		$puesto->eliminar();
		return true;
	}


}

?>