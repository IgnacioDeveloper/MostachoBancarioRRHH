<?php

	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaPDO/PersistenciaPDO.php';

	class Puesto{
		private $idPuesto;
		private $codigo;
		private $nombre;
		private $descripcion;
		private $objetivoGeneral;
		private $funcionesEspecificas;
		private $competenciasRequeridas;
		private $conocimientosRequeridos;
		private $idArea;

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

		function _construct1($idPuesto){
			$this->idPuesto=$idPuesto;
		}

		function __construct9($idPuesto,$codigo,$nombre,$descripcion,$objetivoGeneral,$funcionesEspecificas,
			$competenciasRequeridas,$conocimientosRequeridos,$idArea){
			$this->idPuesto=$idPuesto;
			$this->codigo = $codigo;
			$this->nombre = $nombre;
			$this->descripcion = $descripcion;
			$this->objetivoGeneral = $objetivoGeneral;
			$this->funcionesEpecificas = $funcionesEspecificas
			$this->competenciasRequeridas = $competenciasRequeridas;
			$this->conocimientosRequeridos = $conocimientosRequeridos;
			$this->idArea = $idArea;
		}

		function getIdPuesto(){
			return $this->idPuesto;
		}

		function getCodigo(){
			return $this->idCodigo;
		}

		function getNombre(){
			return $this->nombre;
		}

		function getDescripcion(){
			return $this->descripcion;
		}

		function getObjetivoGeneral(){
			return $this->objetivoGeneral;
		}

		function getFuncionesEspecificas(){
			return $this->funcionesEspecificas;
		}

		function getCompetenciasRequeridas(){
			return $this->competenciasRequeridas;
		}

		function getConococimientosRequeridos(){
			return $this->conocimientosRequeridos;
		}

		function getIdArea(){
			return $this->idArea;
		}

		function setIdPuesto($valor){
			$this->idPuesto = $valor;
		}

		function setCodigo($valor){
			$this->codigo = $valor;
		}

		function setNombre($valor){
			$this->nombre = $valor;
		}

		function setDescripcion($valor){
			$this->descripcion = $valor;
		}

		function setObjetivoGeneral($valor){
			$this->objetivoGeneral = $valor;
		}

		function setFuncionesEspecificas($valor){
			$this->funcionesEspecificas = $valor;
		}

		function setCompetenciasRequeridas($valor){
			$this->competenciasRequeridas = $valor;
		}

		function setConocimientosRequerido($valor){
			$this->conocimientosRequeridos = $valor;
		}

		function setIdArea($valor){
			$this->idArea = $valor;
		}

		function autocompletar($condicion){
			$registro = $this->getPersonas($condicion);
			$registro = json_decode($registro);
			$this->idPuesto =$registro[0]->idPuesto;
			$this->codigo =$registro[0]->codigo;
			$this->nombre =$registro[0]->nombre;
			$this->descripcion =$registro[0]->descripcion;
			$this->objetivoGeneral =$registro[0]->objetivoGeneral;
			$this->funcionesEpecificas =$registro[0]->funcionesEspecificas;
			$this->competenciasRequeridas =$registro[0]->competenciasRequeridas;
			$this->conocimientosRequeridos =$registro[0]->conocimientosRequeridos;
			$this->idArea =$registro[0]-> idArea;
			unset($registro);
		}

		function guardar(){
			$valores = "'$this->idPuesto',$this->codigo
			','$this->nombre','$this->descripcion','$this->objetivoGeneral'
			,'$this->funcionesEpecificas','$this->competenciasRequeridas'
			,'$this->conocimientosRequeridos','$this->idArea'";
			$this->persistencia->aniadir('PUESTO',$valores);
		}

		function modificar(){
			$set="IDPUESTO = '$this->idPuesto',CODIGO = '$this->codigo', NOMBRE = '$this->nombre',
			DESCRIPCION =  '$this->descripcion', OBJETIVOGENERAL = '$this->objetivoGeneral',
			FUNCIONESESPECIFICAS = '$this->funcionesEpecificas',
			COMPETENCIASREQUERIDAS = '$this->competenciasRequeridas', 
			CONOCIMIENTOSREQUERIDOS = '$this->conocimientosRequeridos', IDAREA = '$this->idArea'";
			$this->persistencia->modificar('PUESTO',$set);
		}

		function eliminar(){
			$condicion='IDPUESTO ='. $this->idPuesto;
			$this->persistencia->eliminar('PUESTO',$condicion);
		}

		function getPuestos($condicion){
			$registros = $this->persistencia->leer('PUESTO','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}

	}
		
?>