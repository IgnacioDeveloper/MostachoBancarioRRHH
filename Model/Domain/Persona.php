<?php
	
	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaPDO/PersistenciaPDO.php';

	class Persona{
		private $idPersona;
		private $legajo;
		private $cuil;
		private $nombre;
		private $apellido;
		private $fechaNacimiento;
		private $domicilio;
		private $localidad;
		private $telefono;
		private $mail;
		private $urlCV;
		private $idUsuario;

		function __construct(){
			$params = func_get_args();
			$numParams = func_num_args();
			$fConstructor = '__construct'.$numParams;
			if(method_exists($this,$fConstructor)){
				call_user_func_array(array($this,$fConstructor),$params);
				$this->persistencia = new PersistenciaPDO();
			}
		}

		function __construct0(){
		
		}

		function _construct1($idPersona){
			$this->idPersona=$idPersona;
		}

		function __construct13($idPersona,$legajo,$cuil,$nombre,$apellido,$fechaNacimiento,
			$domicilio,$localidad,$telefono,$mail,$urlCV,$sueldoBrutoAcordado,$idUsuario){
			$this->idPersona = $idPersona;
			$this->legajo = $legajo;
			$this->cuil = $cuil;
			$this->nombre = $nombre;
			$this->apellido = $apellido;
			$this->fechaNacimiento = $fechaNacimiento;
			$this->telefono = $telefono;
			$this->domicilio = $domicilio;
			$this->localidad = $localidad;
			$this->mail = $mail;
			$this->$urlCV = $urlCV;
			$this->$idUsuario = $idUsuario;
		}

		function getIdPersona(){
			return $this->idPersona;
		}

		function getLegajo(){
			return $this->legajo;
		}

		function getCuil(){
			return $this->cuil;
		}

		function getNombre(){
			return $this->nombre;
		}

		function getApellido(){
			return $this->apellido;
		}

		function getFechaNacimiento(){
			return $this->fechaNacimiento;
		}

		function getDomicilio(){
			return $this->domicilio;
		}

		function getLocalidad(){
			return $this->localidad;
		}

		function getTelefono(){
			return $this->telefono;
		}

		function getUrlCV(){
			return $this->urlCV;
		}

		function getIdUsuario(){
			return $this->idUsuario;
		}

		function getMail(){
        	return $this->mail;
    	}
		function setIdPersona($valor){
			$this->idPersona = $valor;
		}

		function setLegajo($valor){
			$this->Legajo = $valor;
		}

		function setCuil($valor){
			$this->cuil = $valor;
		}

		function setNombre($valor){
			$this->nombre = $valor;
		}

		function setApellido($valor){
			$this->apellido = $valor;
		}

		function setTelefono($valor){
			$this->telefono = $valor;
		}

		function setDomicilio($valor){
			$this->domicilio = $valor;
		}

		function setLocalidad($valor){
			$this->localidad = $valor;
		}

		function setFechaNacimiento($valor){
			$this->fechaNacimiento = $valor;
		}

		function setUrlCV($valor){
			$this->urlCV = $valor;
		}

		function setIdUsuario($valor){
			$this->idUsuario = $valor;
		}

		function _setMail($valor){
        	$this->mail = $valor;
    	}

    	function autocompletar($condicion){
			$registro = $this->getPersonas($condicion);
			$registro = json_decode($registro);
			$this->idPersona = $registro[0]->idPersona;
			$this->legajo = $registro[0]->legajo;
			$this->cuil = $registro[0]->cuil;
			$this->nombre = $registro[0]->nombre;
			$this->apellido = $registro[0]->apellido;
			$this->fechaNacimiento = $registro[0]->fechaNacimiento;
			$this->telefono = $registro[0]->telefono;
			$this->domicilio = $registro[0]->domicilio;
			$this->localidad = $registro[0]->localidad;
			$this->mail = $registro[0]->mail;
			$this->urlCV = $registro[0]->urlCV;
			$this->idUsuario = $registro[0]->idUsuario;
			unset($registro);
		}

    	function guardar(){
			$valores = "'$this->idPersona',$this->legajo
			','$this->cuil','$this->nombre','$this->apellido'
			,'$this->fechaNacimiento','$this->domicilio','$this->localidad'
			,'$this->telefono','$this->mail','$this->urlCV','$this->idUsuario'";
			$this->persistencia->aniadir('PERSONA',$valores);
		}

		function modificar(){
			$set="IDPERSONA = '$this->idPersona',LEGAJO = '$this->legajo', CUIL = '$this->cuil',
			NOMBRE =  '$this->nombre', APELLIDO = '$this->apellido', FECHANACIMIENTO = '$this->fechaNacimiento\,
			DOMICILIO = '$this->domicilio', LOCALIDAD = '$this->localidad', TELEFONO = '$this->telefono',
			MAIL = '$this->mail', URLCV = '$this->urlCV', USUARIO_IDUSUARIO = '$this->idUsuario'";
			$this->persistencia->modificar('PERSONA',$set);
		}

		function eliminar(){
			$condicion='IDPERSONA = '.$idPersona;
			$this->persistencia->eliminar('PERSONA',$condicion);
		}

		function getPersonas($condicion){
			$registros = $this->persistencia->leer('PERSONA','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}
	}
?>