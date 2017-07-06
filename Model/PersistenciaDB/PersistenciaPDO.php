<?php

	include_once $_SERVER['DOCUMENT_ROOT'].'/MostachoRRHH/Model/Conexion/ConexionPDO.php';

	class PersistenciaPDO{
		
		private $connectionDB;

		function __construct(){
			$this->connectionDB = (new ConexionPDO())->getConexionDB();
		}

		function ejecutarFuncion($funcion){
			$sql_query = 'SELECT '.$funcion;
			//echo $sql_query.'<br/>';
			try{
				$statement = $this->connectionDB->prepare($sql_query);
				$statement->execute();
				$recordSet = $statement->fetch(PDO::FETCH_COLUMN,0);
				$statement->closeCursor();
			}catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
			return $recordSet;
		}

		function leer($tablas, $columnas = '*', $join = '', $condicion = '1'){
			$sql_query = 'SELECT '.$columnas.' FROM '.$tablas.' '.$join.' WHERE '.$condicion;
			//echo $sql_query.'<br/>';
			try{
				$statement = $this->connectionDB->prepare($sql_query);
				$statement->execute(); //AHORA STATEMENT ES UN CONJUNTO DE RESULTADOS ASOCIADOS
				$recordSet=$statement->fetchAll(PDO::FETCH_ASSOC);
				$statement->closeCursor();
			}
			catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
			return $recordSet;
		}

		function nombreColumnas($tabla){
			$arrayNombres = array();
			$sql_query = 'SHOW COLUMNS FROM '.$tabla;
			try{
				$statement = $this->connectionDB->prepare($sql_query);
				$statement->execute();
				$i=0;
				while($registro = $statement->fetch(PDO::FETCH_COLUMN,0)){
					$arrayNombres[$i] = $registro;
					$i++;
				}
			}
			catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
			return $arrayNombres;
		}

		function aniadir($tabla,$values){
			$arrayColumnas = $this->nombreColumnas($tabla);
			unset($arrayColumnas[0]);
			var_dump($arrayColumnas);
			$columnNames = implode(",",$arrayColumnas);
			$sql_query = 'INSERT INTO '.$tabla.' ('.$columnNames.') VALUES ('.$values.')';
			echo("<br/>".$sql_query);
			//echo $sql_query.'<br/>';
			try{
				$this->connectionDB->exec($sql_query);
			}
			catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
		}

		function modificar($tabla,$set,$condicion){
			$sql_query = 'UPDATE '.$tabla.' SET '.$set.' WHERE '.$condicion;
			//echo $sql_query.'<br/>';
			try{
				$this->connectionDB->exec($sql_query);
			}
			catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
		}

		function eliminar($tabla,$condicion){
			$sql_query = 'DELETE FROM '.$tabla.' WHERE '.$condicion;
			//echo $sql_query.'<br/>';
			try{
				$this->connectionDB->exec($sql_query);
			}
			catch(PDO_Exception $e){
				die('Error PDO: ' . $e->getMessage());
			}
			catch(Exception $e){
				die('Error: ' . $e->getMessage());
			}
		}

	}
	
?>