<?php

	class ConexionPDO{

		private $db_host = 'localhost';
		private $db_name = 'mostachorrhh';
		private $db_usuario = 'root';
		private $db_password = '';
		private $nombreUsuario = '';
		private $passwordUsuario = '';
		private $conexionDB;

		function __construct(){
			$this->conectar();
		}
		
		function conectar(){
			try{
				$this->conexionDB = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,
				$this->db_usuario,$this->db_password);
				$this->conexionDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				}catch(PDOException $e){
					die('Error! '.$e->getMessage() . '<br/>');
				}
		}

		public function getConexionDB(){
			return $this->conexionDB;
		}
	}		
?>