<?php

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

		}

		function __construct($idPersona,$legajo,$cuil,$nombre,$apellido,$fechaNacimiento,
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
			require_once $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaDB/PersistenciaPDO.php'
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

    	function guardar(){
			$valores = '\'$this->idPersona\',$this->legajo
			\',\'$this->cuil\',\'$this->nombre\',\'$this->apellido\'
			,\'$this->fechaNacimiento\',\'$this->domicilio\',\'$this->localidad\'
			,\'$this->telefono\',\'$this->mail\',\'$this->urlCV\',\'$this->idUsuario\'';
			$persistencia->aniadir('PERSONA',$valores);
		}

		function modificar(){
			$set='IDPERSONA = \'$this->idPersona\',LEGAJO = \'$this->legajo\', CUIL = \'$this->cuil\',
			NOMBRE =  \'$this->nombre\', APELLIDO = \'$this->apellido\', FECHANACIMIENTO = \'$this->fechaNacimiento\,
			DOMICILIO = \'$this->domicilio\', LOCALIDAD = \'$this->localidad\', TELEFONO = \'$this->telefono\',
			MAIL = \'$this->mail\', URLCV = \'$this->urlCV\', USUARIO_IDUSUARIO = \'$this->idUsuario\'';
			$persistencia->modificar('PERSONA',$set);
		}

		function eliminar(){
			$condicion='IDPERSONA = $idPersona';
			$persistencia->eliminar('PERSONA',$condicion);
		}

		static function obtenerPersonas($condicion){
			$registros = $persistencia->leer('PERSONA','*','',$condicion);
			$personas = array();
			$i=0;
			foreach($registros as $registro){
				$personas[$i]=new Persona($registro[0],$registro[1],$registro[2],$registro[3],$registro[4]
					,$registro[5],$registro[6],$registro[7],$registro[8],$registro[9],$registro[10],
					$registro[11],$registro[12]);
			}
			unset($registros);
			return $personas;
		}
	}
?>