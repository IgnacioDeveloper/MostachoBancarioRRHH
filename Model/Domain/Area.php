<?php

	include_once $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaPDO/PersistenciaPDO.php';

	class Area{
		private $idArea;
		private $codigo;
		private $descripcion;
		private $cantidadPersonas;
		private $idTipo;
		private $persistencia = new PersistenciaPDO;

		function __construct(){

		}


		function __construct($idArea,$codigo,$descripcion,$cantidadPersonas,$idTipo){
			$this->idArea = $idArea,
			$this->codigo = $codigo;
			$this->descripcion = $descripcion;
			$this->cantidadPersonas = $cantidadPersonas;
			$this->idTipo;
		}

		function getIdArea(){
			return $this->idArea;
		}

		function getCodigo(){
			return $this->codigo;
		}

		function getDescripcion(){
			return $this->descripcion;
		}

		function getCantidadPersonas(){
			return $this->cantidadPersonas;
		}

		function getIdTipo(){
			return $this->itTipo;
		}

		function setIdArea($valor){
			$this->idArea = $valor;
		}

		function setDescripcion($valor){
			$this->descripcion = $valor;
		}

		function setCantidadPersonas($valor){
			$this->cantidadPersonas = $valor;
		}

		function setIdTipo($valor){
			$this->idTipo = $valor;
		}

		function guardar(){
			$valores = '\'$this->idArea\',\'$this->codigo
			\',\'$this->descripcion\',\'$this->cantidadPersonas\',\'$this->idTipo'\'';
			$persistencia->aniadir('AREA',$valores);
		}

		function modificar(){
			$set='IDAREA = \'$this->idArea\', CODIGO = \'$this->codigo\', DESCRIPCION = \'$this->descripcion\',
			CANTIDADPERSONAS = \'$this->cantidadPersonas\', TIPOAREA_IDTIPO = \'$this->idTipo\'';
			$persistencia->modificar('AREA',$set);
		}

		function eliminar(){
			$condicion='IDAREA = $idArea';
			$persistencia->eliminar('AREA',$condicion);
		}

		static function obtenerAreas($condicion){
			$registros = $persistencia->leer('AREA','*','',$condicion);
			$areas = array();
			$i=0;
			foreach($registros as $registro){
				$areas[$i]=new Area($registro[0],$registro[1],$registro[2],$registro[3],$registro[4]);
			}
			unset($registros);
			return $areas;
		}

	}

?>