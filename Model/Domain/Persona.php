<?php
	
	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaDB/PersistenciaPDO.php';

	class Persona{
		private $idPersona;
		private $legajo;
		private $cuil;
		private $nombre;
		private $apellido;
		private $fechaNacimiento;
		private $mail;
		private $domicilio;
		private $localidad;
		private $provincia;
		private $cv;
		private $idUsuario;
		private $idPuesto;

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

		function __construct1($idPersona){
			$this->idPersona=$idPersona;
		}

		function __construct10($legajo,$cuil,$nombre,$apellido,$fechaNacimiento,$mail,$telefono,
			$domicilio,$localidad,$provincia){
			$this->legajo = $legajo;
			$this->cuil = $cuil;
			$this->nombre = $nombre;
			$this->apellido = $apellido;
			$this->fechaNacimiento = $fechaNacimiento;
			$this->mail = $mail;
			$this->telefono = $telefono;
			$this->domicilio = $domicilio;
			$this->localidad = $localidad;
			$this->provincia = $provincia;

		}

		function __construct11($idPersona,$legajo,$cuil,$nombre,$apellido,$fechaNacimiento,$mail,$telefono,$domicilio,$localidad,$provincia){
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
			return $this->cv;
		}

		function getIdUsuario(){
			return $this->idUsuario;
		}

		function getMail(){
        	return $this->mail;
    	}

    	function getCv(){
    		return $this->cv;
    	}

		function setIdPersona($valor){
			$this->idPersona = $valor;
		}

		function setLegajo($valor){
			$this->legajo = $valor;
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

		function setFechaNacimiento($valor){
			$this->fechaNacimiento = $valor;
		}

		function setMail($valor){
			$this->mail = $valor;
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

		function setProvincia($valor){
			$this->provincia = $valor;
		}

		function setCv($valor){
			$this->cv = $valor;
		}

		function setIdUsuario($valor){
			$this->idUsuario = $valor;
		}

    	function autocompletar($registro){
			$this->idPersona = $registro[0]->idPersona;
			$this->legajo = $registro[0]->legajo;
			$this->cuil = $registro[0]->cuil;
			$this->nombre = $registro[0]->nombre;
			$this->apellido = $registro[0]->apellido;
			$this->fechaNacimiento = $registro[0]->fechaNac;
			$this->telefono = $registro[0]->telefono;
			$this->domicilio = $registro[0]->domicilio;
			$this->localidad = $registro[0]->localidad;
			$this->provincia = $registro[0]->provincia;
			$this->mail = $registro[0]->mail;
			$this->cv = $registro[0]->cv;
			$this->idUsuario = $registro[0]->Usuario_idUsuario;
			$this->idPuesto = $registro[0]->Puesto_idPuesto;
			unset($registro);
		}

    	function guardar(){
			$valores = "'$this->legajo',
			'$this->cuil','$this->nombre','$this->apellido',
			'$this->fechaNacimiento','$this->mail',
			'$this->telefono','$this->domicilio','$this->localidad','$this->provincia','waiting',0,0";
			$this->persistencia->aniadir('PERSONA',$valores);
			return true;
		}

		function modificar(){
			$set="LEGAJO = '$this->legajo', CUIL = '$this->cuil', 
			NOMBRE =  '$this->nombre', APELLIDO = '$this->apellido', FECHANAC = '$this->fechaNacimiento',
			MAIL = '$this->mail', TELEFONO = '$this->telefono', DOMICILIO = '$this->domicilio', 
			LOCALIDAD = '$this->localidad', PROVINCIA = '$this->provincia',CV = '$this->cv'";
			$condicion = "IDPERSONA = '$this->idPersona'";
			$this->persistencia->modificar('PERSONA',$set,$condicion);
		}

		function eliminar(){
			$condicion="IDPERSONA = '$this->idPersona'";
			$this->persistencia->eliminar('PERSONA',$condicion);
		}

		function getPersona($condicion){
			$registro = $this->getPersonas($condicion);
			$registro = json_decode($registro);
			$this->autocompletar($registro);
		}

		function getPersonas($condicion){
			$registros = $this->persistencia->leer('PERSONA','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}

		function asignarArchivo($name){
			$set="CV = '$name'";
			$condicion = "IDPERSONA = '$this->idPersona'";
			$this->persistencia->modificar('PERSONA',$set,$condicion);
		}

		function getJSON(){
			return '{"idPersona":"'.$this->idPersona.'","legajo":"'.$this->legajo.'","cuil":"'.$this->cuil.
			'","nombre":"'.$this->nombre.'","apellido":"'.$this->apellido.'","fechaNacimiento":"'.$this->fechaNacimiento.'","mail":"'.$this->mail.'","telefono":"'.$this->telefono.'","domicilio":"'.$this->domicilio.'","localidad":"'.$this->localidad.'","provincia":"'.$this->provincia.'","cv":"'.$this->cv.'"}';
		}

	}

	/*$persona = new Persona();
	$persona->getPersona('IDPERSONA = 50');
	$registro=$persona->getJSON();
	$persona->setNombre('Gustavo Baltazar Bariloche');
	$registro = $persona->getJSON();
	$persona->modificar();
	echo($registro);*/
?>