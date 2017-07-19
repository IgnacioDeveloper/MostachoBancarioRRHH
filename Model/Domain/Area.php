<?php

	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaPDO/PersistenciaPDO.php';

	class Area{
		private $idArea;
		private $codigo;
		private $descripcion;
		private $cantidadPersonas;
		private $idTipo;
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

		function _construct1($idArea){
			$this->idArea=$idArea;
		}

		function __construct5($idArea,$codigo,$descripcion,$cantidadPersonas){
			$this->idArea = $idArea,
			$this->codigo = $codigo;
			$this->descripcion = $descripcion;
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

		function getIdTipo(){
			return $this->itTipo;
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

		function setIdTipo($valor){
			$this->idTipo = $valor;
		}

		function autocompletar($condicion){
			$registro = $this->getAreas($condicion);
			$registro = json_decode($registro);
			$this->idArea = $registro[0]->idArea;
			$this->codigo = $registro[0]->codigo;
			$this->descripcion = $registro[0]->descripcion;
			$this->cantidadPersonas = $registro[0]->cantidadPersonas;
			unset($registro);
		}

		function guardar(){
			$valores = "'$this->idArea' , '$this->codigo',
			'$this->descripcion','$this->cantidadPersonas','$this->idTipo'";
			$this->persistencia->aniadir('AREA',$valores);
		}

		function modificar(){
			$set="IDAREA = '$this->idArea', CODIGO = '$this->codigo', DESCRIPCION = '$this->descripcion,
			CANTIDADPERSONAS = '$this->cantidadPersonas', TIPOAREA_IDTIPO = '$this->idTipo'";
			$this->persistencia->modificar('AREA',$set);
		}

		function eliminar(){
			$condicion='IDAREA ='. $this->idArea;
			$this->persistencia->eliminar('AREA',$condicion);
		}

		function getAreas($condicion){
			$registros = $this->persistencia->leer('USUARIO','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}

	}

?>