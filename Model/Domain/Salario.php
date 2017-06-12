<?php

	class Salario{
		private $idSalario;
		private $salarioBruto;
		private $salarioNeto;
		private $desde;
		private $hasta;

		function __construct(){

		}

		function __construct($idSalario, $salarioBruto, $salarioNeto, $desde, $hasta){
			$this->idSalario = $idSalario;
			$this->salarioBruto = $salarioBruto;
			$this->salarioNeto = $salarioNeto;
			$this->desde = $desde;
			$this->hasta = $hasta;
		}

		function getIdSalario(){
			return $this->idSalario;
		}

		function getSalarioBruto(){
			return $this->salarioBruto;
		}

		function getSalarioNeto(){
			return $this->salarioNeto;
		}

		function getDesde(){
			return $this->desde;
		}

		function getHasta(){
			return $this->hasta;
		}

		function setIdSalario($valor){
			$this->idSalario = $valor;
		}


		function setSalarioBruto($valor){
			$this->salarioBruto = $valor;
		}


		function setSalarioNeto($valor){
			$this->salarioNeto = $valor;
		}


		function setDesde($valor){
			$this->desde = $valor;
		}


		function setHasta($valor){
			$this->hasta = $valor;
		}

		function guardar(){
			$valores = '\'$this->idSalario\',$this->salarioBruto
			\',\'$this->salarioNeto\',\'$this->desde\',\'$this->hasta\'';
			$persistencia->aniadir('SALARIO',$valores);
		}

		function modificar(){
			$set='IDSALARIO = \'$this->idSalario\',SALARIOBRUTO = \'$this->salarioBruto\', 
			SALARIONETO = \'$this->salarioNeto\',DESDE =  \'$this->desde\', 
			HASTA = \'$this->hasta\'';
			$persistencia->modificar('SALARIO',$set);
		}

		function eliminar(){
			$condicion='IDSALARIO = $idSalario';
			$persistencia->eliminar('SALARIO',$condicion);
		}

		static function obtenerSalarios($condicion){
			$registros = $persistencia->leer('SALARIO','*','',$condicion);
			$salarios = array();
			$i=0;
			foreach($registros as $registro){
				$salarios[$i]=new Salario($registro[0],$registro[1],$registro[2],$registro[3],$registro[4]);
			}
			unset($registros);
			return $personas;
		}

	}


?>