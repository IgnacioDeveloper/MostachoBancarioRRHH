<?php

require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaDB/PersistenciaPDO.php';

class Usuario{
	private $idUsuario;
	private $nombre;
	private $username;
	private $password;
	private $usertype;
	private $estado;
	private $persistencia;

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

	function __construct2($username,$password){
		$this->username=$username;
		$this->password=$password;
	}

	function __construct5($nombre,$username,$password,$usertype,$estado){
		$this->idUsuario=-1;
		$this->nombre=$nombre;
		$this->username=$username;
		$this->password=md5($password);
		$this->usertype=$usertype;
		$this->estado=$estado;
	}

	function __construct6($idUsuario,$nombre,$username,$password,$usertype,$estado){
		$this->idUsuario=$idUsuario;
		$this->nombre=$nombre;
		$this->username=$username;
		$this->password=md5($password);
		$this->usertype=$usertype;
		$this->estado=$estado;
	}

	function getIdUsuario(){
		return $this->idUsuario;		
	}

	function getNombre(){
		return $this->nombre;		
	}

	function getUsername(){
		return $this->username;		
	}

	function getPassword(){
		return $this->password;		
	}

	function getUsertype(){
		return $this->usertype;		
	}

	function getEstado(){
		return $this->estado;
	}

	function setIdUsuario($valor){
		$this->idUsuario=$valor;
	}

	function setNombre($valor){
		$this->nombre=$valor;
	}

	function setUsername($valor){
		$this->username=$valor;
	}

	function setPassword($valor){
		$this->password=md5($valor);
	}

	function setUsertype($valor){
		$this->usertype=$valor;
	}

	function setEstado($valor){
		$this->estado=$valor;
	}

	function autenticar(){
		$funcion = "FX_USEROK('$this->username','$this->password')";
		$resultado = $this->persistencia->ejecutarFuncion($funcion);
		if($resultado == 1) $this->autocompletar();
		return $resultado;
	}

	function autocompletar(){
		$registro = $this->obtenerUsuarios("USERNAME = '$this->username'");
		$this->idUsuario = $registro[0]["idUsuario"];
		$this->nombre = $registro[0]["nombre"];
		$this->usertype = $registro[0]["usertype"];
		$this->estado = $registro[0]["estado"];
		unset($registro);
	}

	function guardar(){
		$valores = "'$this->nombre','$this->username','$this->password','$this->usertype','$this->estado','0'";
		echo($valores."<br/>");
		$this->persistencia->aniadir('USUARIO',$valores);
	}

	function modificar(){
		$set='IDUSUARIO = \'$this->idUsuario\',NOMBRE = \'$this->nombre\', USERNAME = \'$this->username\',
		PASSWORD =  \'$this->password\', USERTYPE = \'$this->usertype\'';
		$this->persistencia->modificar('USUARIO',$set);
		}

	function eliminar(){
		$condicion='IDUSUARIO = '.$this->idUsuario;
		$this->persistencia->eliminar('USUARIO',$condicion);
	}

	function obtenerUsuarios($condicion){
		$registros = $this->persistencia->leer('USUARIO','*','',$condicion);
		return $registros;
	}

	function getJSON(){
		return '{"idUsuario":"'.$this->idUsuario.'","nombre":"'.$this->nombre.'","username":"'.$this->username.'","password":"'.$this->password.'","usertype":"'.$this->usertype.'","estado":"'.$this->estado.'"}';
	}
}

?>