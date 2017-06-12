<?php
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

		function Puesto(){

		}


		function Puesto($idPuesto,$codigo,$nombre,$descripcion,$objetivoGeneral,$funcionesEspecificas,
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

		function guardar(){
			$valores = '\'$this->idPuesto\',$this->codigo
			\',\'$this->nombre\',\'$this->descripcion\',\'$this->objetivoGeneral\'
			,\'$this->funcionesEpecificas\',\'$this->competenciasRequeridas\'
			,\'$this->conocimientosRequeridos\',\'$this->idArea\'';
			$persistencia->aniadir('PUESTO',$valores);
		}

		function modificar(){
			$set='IDPUESTO = \'$this->idPuesto\',CODIGO = \'$this->codigo\', NOMBRE = \'$this->nombre\',
			DESCRIPCION =  \'$this->descripcion\', OBJETIVOGENERAL = \'$this->objetivoGeneral\',
			FUNCIONESESPECIFICAS = \'$this->funcionesEpecificas\',
			COMPETENCIASREQUERIDAS = \'$this->competenciasRequeridas\', 
			CONOCIMIENTOSREQUERIDOS = \'$this->conocimientosRequeridos\', IDAREA = \'$this->idArea\'';
			$persistencia->modificar('PUESTO',$set);
		}

		function eliminar(){
			$condicion='IDPUESTO = $idPuesto';
			$persistencia->eliminar('PUESTO',$condicion);
		}

		static function obtenerPuestos($condicion){
			$registros = $persistencia->leer('PUESTO','*','',$condicion);
			$puestos = array();
			$i=0;
			foreach($registros as $registro){
				$puestos[$i]=new Puesto($registro[0],$registro[1],$registro[2],$registro[3],$registro[4]
					,$registro[5],$registro[6],$registro[7],$registro[8]);
			}
			unset($registros);
			return $puestos;
		}

	}
		
?>