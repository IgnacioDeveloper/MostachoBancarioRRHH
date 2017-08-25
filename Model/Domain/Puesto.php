<?php

	require $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/PersistenciaDB/PersistenciaPDO.php';

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

		function __construct1($idPuesto){
			$this->idPuesto=$idPuesto;
		}

		function __construct8($codigo,$nombre,$descripcion,$objetivoGeneral,$funcionesEspecificas,
			$competenciasRequeridas,$conocimientosRequeridos,$idArea){
			$this->codigo = $codigo;
			$this->nombre = $nombre;
			$this->descripcion = $descripcion;
			$this->objetivoGeneral = $objetivoGeneral;
			$this->funcionesEpecificas = $funcionesEspecificas;
			$this->competenciasRequeridas = $competenciasRequeridas;
			$this->conocimientosRequeridos = $conocimientosRequeridos;
			$this->idArea = $idArea;
		}

		function __construct9($idPuesto,$codigo,$nombre,$descripcion,$objetivoGeneral,$funcionesEspecificas,
			$competenciasRequeridas,$conocimientosRequeridos,$idArea){
			$this->idPuesto=$idPuesto;
			$this->codigo = $codigo;
			$this->nombre = $nombre;
			$this->descripcion = $descripcion;
			$this->objetivoGeneral = $objetivoGeneral;
			$this->funcionesEpecificas = $funcionesEspecificas;
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

		function setConocimientosRequeridos($valor){
			$this->conocimientosRequeridos = $valor;
		}

		function setIdArea($valor){
			$this->idArea = $valor;
		}

		function autocompletar($registro){
			$this->idPuesto =$registro[0]->idPuesto;
			$this->codigo =$registro[0]->codigo;
			$this->nombre =$registro[0]->nombrePuesto;
			$this->descripcion =$registro[0]->descripcion;
			$this->objetivoGeneral =$registro[0]->objetivoGeneral;
			$this->funcionesEspecificas =$registro[0]->funcionesEspecificas;
			$this->competenciasRequeridas =$registro[0]->competenciasRequeridas;
			$this->conocimientosRequeridos =$registro[0]->conocimientosRequeridos;
			$this->idArea =$registro[0]->Area_idArea;
			unset($registro);
		}

		function guardar(){
			$valores = "'$this->codigo
			','$this->nombre','$this->descripcion','$this->objetivoGeneral'
			,'$this->funcionesEspecificas','$this->competenciasRequeridas'
			,'$this->conocimientosRequeridos','$this->idArea'";
			$this->persistencia->aniadir('PUESTO',$valores);
		}

		function modificar(){
			$set="CODIGO = '$this->codigo', NOMBREPUESTO = '$this->nombre',
			DESCRIPCION =  '$this->descripcion', OBJETIVOGENERAL = '$this->objetivoGeneral',
			FUNCIONESESPECIFICAS = '$this->funcionesEspecificas',
			COMPETENCIASREQUERIDAS = '$this->competenciasRequeridas', 
			CONOCIMIENTOSREQUERIDOS = '$this->conocimientosRequeridos', AREA_IDAREA = '$this->idArea'";
			$condicion = "IDPUESTO = '$this->idPuesto'";
			$this->persistencia->modificar('PUESTO',$set,$condicion);
		}

		function eliminar(){
			$condicion="IDPUESTO ='$this->idPuesto'";
			$this->persistencia->eliminar('PUESTO',$condicion);
		}

		function getPuesto($condicion){
			$registro = $this->getPuestos($condicion);
			$registro = json_decode($registro);
			$this->autocompletar($registro);
		}

		function getPuestos($condicion){
			$registros = $this->persistencia->leer('PUESTO','*','',$condicion);
			$registros = json_encode($registros);
			return $registros;
		}

		function getJSON(){
			return '{"idPuesto":"'.$this->idPuesto.'","codigo":"'.$this->codigo.'","nombrePuesto":"'.$this->nombre.'","descripcion":"'.$this->descripcion.'","objetivoGeneral":"'.$this->objetivoGeneral.'","funcionesEspecificas":"'.$this->funcionesEspecificas.'","competenciasRequeridas":"'.$this->competenciasRequeridas.'","conocimientosRequeridos":"'.$this->conocimientosRequeridos.'","idArea":"'.$this->idArea.'"}';
		}

	}
		
?>