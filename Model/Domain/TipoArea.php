<?php

	class TipoArea{
		private $idTipoArea;
		private $descripcion;
		private $nivel;

		function __construct(){

		}

		function __construct($idTipoArea,$descripcion,$nivel){
			$this->idTipoArea=-$idTipoArea;
			$this->descripcion=$descripcion;
			$this->nivel=$nivel;
		}

		function getIdTipoArea(){
			return $this->idTipoArea;
		}

		function getDescripcion(){
			return $this->idDescripcion;
		}

		function getNivel(){
			return $this->nivel;
		}

		function setIdTipoArea($valor){
			$this->IdTipoArea = $valor;
		}

		function setDescripcion($valor){
			$this->descripcion = $valor;
		}

		function setNivel($valor){
			$this->nivel = $valor;
		}

		function guardar(){
			$valores = '\'$this->idTipoArea\',$this->descripcion\',\'$this->nivel\'';
			$persistencia->aniadir('TÌPOAREA',$valores);
		}

		function modificar(){
			$set='IDTIPO = \'$this->idTipoArea\',DESCRIPCION = \'$this->descripcion\', NIVEL = \'$this->nivel\'';
			$persistencia->modificar('TIPOAREA',$set);
		}

		function eliminar(){
			$condicion='IDTIPO = $idTipoArea';
			$persistencia->eliminar('TIPOAREA',$condicion);
		}

		static function obtenerTipos($condicion){
			$registros = $persistencia->leer('TIPOAREA','*','',$condicion);
			$tipos = array();
			$i=0;
			foreach($registros as $registro){
				$tipos[$i]=new TipoArea($registro[0],$registro[1],$registro[2]);
			}
			unset($registros);
			return $tipos;
		}

	}

?>