<?php

	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaDB/PersistenciaPDO.php';

	class Area{
		private $idArea;
		private $codigo;
		private $descripcion;
		private $idAreaSuperior;
		private $cantidadPersonas;
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

		function __construct1($idArea){
			$this->idArea=$idArea;
		}

		function __construct3($codigo,$descripcion,$idAreaSuperior){
			$this->codigo = $codigo;
			$this->descripcion = $descripcion;
			$this->cantidadPersonas = 0;
			$this->idAreaSuperior = $idAreaSuperior;
		}

		function __construct4($codigo,$descripcion,$idAreaSuperior,$cantidadPersonas){
			$this->codigo = $codigo;
			$this->descripcion = $descripcion;
			$this->idAreaSuperior = $idAreaSuperior;
			$this->cantidadPersonas = $cantidadPersonas;
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

		function getIdAreaSuperior(){
			return $this->idAreaSuperior;
		}

		function setIdArea($valor){
			$this->idArea = $valor;
		}

		function setCodigo($valor){
			$this->codigo=$valor;
		}

		function setDescripcion($valor){
			$this->descripcion = $valor;
		}

		function setCantidadPersonas($valor){
			$this->cantidadPersonas = $valor;
		}

		function setIdAreaSuperior($valor){
			$this->idAreaSuperior = $valor;
		}

		function autocompletar($registro){
			$this->idArea = $registro[0]->idArea;
			$this->codigo = $registro[0]->codigo;
			$this->descripcion = $registro[0]->descripcion;
			$this->idAreaSuperior=$registro[0]->Area_idAreaSuperior;
			$this->cantidadPersonas = $registro[0]->cantidadPersonas;
			unset($registro);
		}

		function guardar(){
			$valores = "'$this->codigo',
			'$this->descripcion','$this->idAreaSuperior','$this->cantidadPersonas'";
			$this->persistencia->aniadir('AREA',$valores);
		}

		function modificar(){
			$set="CODIGO = '$this->codigo',
			 DESCRIPCION = '$this->descripcion', AREA_IDAREASUPERIOR='$this->idAreaSuperior'";
			$condicion = "IDAREA = '$this->idArea'";
			$this->persistencia->modificar('AREA',$set,$condicion);
		}

		function eliminar(){
			$condicion = "IDAREA = '$this->idArea'";
			$this->persistencia->eliminar('AREA',$condicion);
		}

		function getArea($condicion){
			$registro = $this->getAreas($condicion);
			$registro = json_decode($registro);
			$this->autocompletar($registro);
		}

		function getAreas($condicion){
			$registros = $this->persistencia->leer('AREA','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}

		function getJSON(){
			return '{"idArea":"'.$this->idArea.'","codigo":"'.$this->codigo.'","descripcion":"'.$this->descripcion.'","idAreaSuperior":"'.$this->idAreaSuperior.'","cantidadPersonas":"'.$this->cantidadPersonas.'"}';
		}

	}

?>